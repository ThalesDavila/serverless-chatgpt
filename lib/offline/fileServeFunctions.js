import {serveImageFile} from "./generateFileServeHandler";
import {FileTypeEnum} from "../utils/enums/FileTypeEnum";
import path from "path";
import fs from "fs";
import os from "os";

function generateTemporaryHandlers(handlerFunction, servicePath) {
    const handlerString = `module.exports.handler = async () => (${handlerFunction.toString()})`
   const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'serverless-chatgpt-offline'));
    const handlerFile = path.join(tmpDir, 'fileServeFunctions.js');
    fs.writeFileSync(handlerFile, handlerString);

    return `${path.relative(servicePath, handlerFile.replace('.js', ''))}.handler`
}

function generateEvents(path) {
    return [
        {
          httpApi: {
            path,
            method: 'GET',
          },
        },
    ]
}

// function reduceEvents(events) {
//     return events.reduce((acc, event) => {
//         if (!event.httpApi) return acc
//
//         return {
//             ...acc,
//             [event.httpApi.method.toLowerCase()]: event.httpApi.serverlessChatgptApi
//         }
//     }, {})
// }

// function transformFunctionsToOpenapi(functions, title, description) {
//     return Object.keys(functions).reduce((acc, key) => ({
//         ...acc,
//         paths: {
//             ...acc.paths,
//             ...{
//                 [functions[key].events[0].httpApi.path]: {
//                     ...reduceEvents(functions[key].events),
//                 }
//             }
//         }
//     }), {
//         openapi: '3.0.1',
//         info: {
//             title,
//             description,
//             version: 'v1',
//         },
//         servers: [{url: 'http://localhost:3000'}],
//         paths: {}
//     })
// }

// function generateManifestReturn(gptConfig, host='localhost', httpPort='3000') {
//     const baseUrl = `http://${host}:${httpPort}`
//     gptConfig.logo_url = `${baseUrl}${LOGO_PATH}`
//     gptConfig.api.url = `${baseUrl}${API_PATH}`
//
//     return gptConfig
// }

export const fileServeFunctions = (
    servicePath,
    serverlessChatgptFiles,
    manifestPath
) => {
    return {
    logo: {
        handler: generateTemporaryHandlers(
            serveImageFile({
                filename: LOGO_PATH,
                contentType: FileTypeEnum.PNG,
                servicePath: servicePath
            }),
            servicePath
        ),
        events: generateEvents(LOGO_PATH),
    },
    // manifest: {
    //   handler: generateTemporaryHandlers(
    //       buildHandlerResponse({
    //               contentType: FileTypeEnum.JSON,
    //               fileContent: serverlessChatgptFiles.manifest
    //
    //       }),
    //       servicePath
    //   ),
    //   events: generateEvents(MANIFEST_PATH),
    // },
    // openapi: {
    //   handler: generateTemporaryHandlers(
    //         buildHandlerResponse({
    //               contentType: FileTypeEnum.YAML,
    //               fileContent: jsYaml.dump(
    //                   transformFunctionsToOpenapi(functions, gptConfig.name_for_model, gptConfig.description_for_model)
    //               ),
    //       }),
    //       servicePath
    //   ),
    //   events: generateEvents(API_PATH),
    // },
}
}