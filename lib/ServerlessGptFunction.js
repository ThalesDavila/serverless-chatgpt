import fs from "fs";
import path from "path";

const jsYaml = require('js-yaml');

export class ServerlessGptFunction {
    handlerProxy = new Proxy({}, {
        get: function (target, propKey, receiver) {
            if (propKey === 'handle') {
                return (event, context, callback) => {
                    const api = data.OFFLINE_URL || `https://${event.requestContext.apiId}.execute-api.${process.env.AWS_REGION}.amazonaws.com/`;

                    const filesData = {
                        'logo.png': data.LOGO,
                        'openapi.yaml': data.API_DEFINITION.replace('serversUrlVar', api),
                        'ai-plugin.json': JSON.stringify({
                            ...JSON.parse(data.MANIFEST),
                            logo_url: `${api}.well-known/logo.png`,
                            api: {
                                ...JSON.parse(data.MANIFEST).api,
                                url: `${api}.well-known/openapi.yaml`,
                            }
                        })
                    }

                    const getContentType = () => {
                        return (
                            (event.pathParameters.name.endsWith('.png') && 'image/png') ||
                            (event.pathParameters.name.endsWith('.yaml') && 'application/yaml') ||
                            'application/json'
                        )
                    }

                    callback(null, {
                        statusCode: 200,
                        body: filesData[event.pathParameters.name],
                        headers: {
                            'Content-Type': getContentType(),
                        },
                        isBase64Encoded: event.pathParameters.name.endsWith('.png'),
                    });
                };
            }
            return Reflect.get(target, propKey, receiver);
        },
    });

    constructor(
        files,
        servicePath,
        serverlessOffline
    ) {
        this.files = files;
        this.servicePath = servicePath;
        this.serverlessOffline = serverlessOffline;
    }

    generate(urls) {
        const dataPath = path.join(this.servicePath, 'data.json')
        return {
            files: {
                handler: this.generateTemporaryHandlers(
                    this.servicePath,
                    dataPath,
                    {
                        API_DEFINITION: jsYaml.dump(this.files.apiDefinition.data, null),
                        MANIFEST: JSON.stringify(this.files.manifest.data),
                        LOGO: this.files.logo.data.toString('base64'),
                        OFFLINE_URL: this.serverlessOffline && `http://${this.serverlessOffline.host}:${this.serverlessOffline.httpPort}/`
                    }),
                events: this.generateEvents('/.well-known/{name}'),
                environment: {
                    DATA_PATH: dataPath
                }
            },
        }
    }

    generateTemporaryHandlers(servicePath, x, data) {
        const handlerString = `
            const data = ${JSON.stringify(data)};
            module.exports.handler = ${this.handlerProxy.handle.toString()}
        `
        const tmpDir = path.join(servicePath, '.serverless-chatgpt');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }
        const handlerFile = path.join(tmpDir, 'serveFilesHandler.js');
        fs.writeFileSync(handlerFile, handlerString);
        fs.writeFileSync(handlerFile, handlerString);

        return `${path.relative(servicePath, handlerFile.replace('.js', ''))}.handler`
    }

    generateEvents(path) {
        return [
            {
                httpApi: {
                    path,
                    method: 'GET',
                },
            },
        ]
    }
}