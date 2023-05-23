import path from "path";
import fs from "fs";

export class ServerlessGptFiles {
    BASE_PATH = '.well-known'
    MANIFEST_PATH = `${this.BASE_PATH}/ai-plugin.json`
    API_PATH = `${this.BASE_PATH}/openapi.yaml`
    LOGO_PATH = `${this.BASE_PATH}/logo.png`

    constructor(
        functions,
        serverlessChatgpt,
        servicePath,
    ) {
        this.functions = functions
        this.serverlessChatgpt = serverlessChatgpt
        this.servicePath = servicePath
    }

    generateFilesData() {
        return {
            logo: {
                data: this.serveImageFile(),
                path: this.LOGO_PATH
            },
            apiDefinition: {
                data: this.generateApiDefinition(),
                path: this.API_PATH
            },
            manifest: {
                data: this.generateManifest(),
                path: this.MANIFEST_PATH
            }
        }
    }

    serveImageFile() {
        const filePath = path.join(
            this.servicePath,
            this.LOGO_PATH
        );
        return fs.readFileSync(filePath);
    }

    generateManifest() {
        return {
            ...this.serverlessChatgpt,
            logo_url: null,
            api: {
                type: "openapi",
                is_user_authenticated: false,
                url: null
            }
        }
    }

    generateApiDefinition() {
        return {
            ...Object.keys(this.functions).reduce((acc, key) => ({
                ...acc,
                paths: {
                    ...acc.paths,
                    ...{
                        [this.functions[key].events[0].httpApi.path.replace('/', '')]: {
                            ...this.reduceEvents(this.functions[key].events),
                        }
                    }
                }
            }), {
                openapi: '3.0.1',
                info: {
                    title: this.serverlessChatgpt.name_for_model,
                    description: this.serverlessChatgpt.description_for_model,
                    version: 'v1',
                },
                servers: [{url: null}],
                paths: {}
            }),
            servers: [{url: 'serversUrlVar'}]
        }
    }

    reduceEvents(events) {
        return events.reduce((acc, event) => {
            if (!event.httpApi) return acc

            return {
                ...acc,
                [event.httpApi.method.toLowerCase()]: event.httpApi.serverlessChatgptApi
            }
        }, {})
    }
}