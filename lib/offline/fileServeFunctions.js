import {serveFileHandler} from "./generateFileServeHandler";
import {FileTypeEnum} from "../utils/enums/FileTypeEnum";
import path from "path";
import fs from "fs";
import os from "os";

function generateTemporaryHandlers(handlerFunction, servicePath) {
    const handlerString = `module.exports.handler = ${handlerFunction.toString()};`;
   const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'serverless-chatgpt-offline'));
    const handlerFile = path.join(tmpDir, 'fileServeFunctions.js');
    fs.writeFileSync(handlerFile, handlerString);

    return path.relative(servicePath, handlerFile.replace('.js', '')) + '.handler'
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

export const fileServeFunctions = (servicePath) => ({
    logo: {
        handler: generateTemporaryHandlers(
            serveFileHandler(
                'logo.png',
                FileTypeEnum.PNG,
                servicePath
            ),
            servicePath
        ),
        events: generateEvents('logo.png'),
    },
    manifest: {
      handler: generateTemporaryHandlers(
          serveFileHandler(
    'manifest.json',
            FileTypeEnum.JSON,
            servicePath
        ),
          servicePath
      ),
      events: generateEvents('/.well-known/ai-plugin.json'),
    },
    openapi: {
      handler: generateTemporaryHandlers(
          serveFileHandler(
    'openapi.yaml',
            FileTypeEnum.YAML,
            servicePath
        ),
          servicePath
      ),
      events: generateEvents('openapi.yaml'),
    },
})