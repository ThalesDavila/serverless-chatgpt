import Ajv from 'ajv';

import {CUSTOM_PROPERTIES, FUNCTION_PROPERTIES} from "./serverless/serverlessProperties";
import {providerFactory} from "./providerFactory";
import {ServerlessGptOffline} from "./ServerlessGptOffline";
import {ServerlessGptFiles} from "./ServerlessGptFiles";
import {ServerlessGptFunction} from "./ServerlessGptFunction";

class ServerlessGpt {
    constructor(serverless) {
        this.serverless = serverless;
        const providerName = this.serverless.service.provider.name;
        // Add new serverless file parameters
        this.serverless.configSchemaHandler.defineCustomProperties(CUSTOM_PROPERTIES);
        this.serverless.configSchemaHandler.defineFunctionProperties(
            providerName,
            FUNCTION_PROPERTIES
        );
        const ajv = new Ajv();
        this.serverlessGptFiles = new ServerlessGptFiles(
            this.serverless.service.functions,
            this.serverless.service.custom.serverlessChatgpt,
            this.serverless.config.servicePath,
        )

        this.files = this.serverlessGptFiles.generateFilesData()
        this.providerHandler = providerFactory(this.serverless, this.files, ajv)

        // Call the deployment hook to add the custom resources based on the provider
        this.hooks = {
            'before:package:initialize': this.beforePackageInitialize.bind(this),
            [`${providerName}:deploy:finalize:cleanup`]: this.deployFinalizeCleanup.bind(this),
            'before:offline:start': this.beforeOfflineStart.bind(this),
        };
    }

    beforeOfflineStart() {
        const serverlessGptFunction = new ServerlessGptFunction(
            this.files,
            this.serverless.config.servicePath,
            this.serverless.service.custom['serverless-offline'] ||
            {
                host: 'localhost',
                httpPort: '3000'
            }
        )
        const serverlessGptOffline = new ServerlessGptOffline(
            this.files,
            this.serverless.config.servicePath,
            this.serverless.service.custom['serverless-offline'] ?
                this.serverless.service.custom['serverless-offline'].host :
                'http://localhost',
            this.serverless.service.custom['serverless-offline'] ?
                this.serverless.service.custom['serverless-offline'].httpPort :
                '3000',
        )

        const urls = serverlessGptOffline.generateUrls()

        const functions = serverlessGptFunction.generate(
            urls
        )

        Object.keys(functions).forEach((key) => {
            this.serverless.service.functions[key] = functions[key]
        })
    }

    beforePackageInitialize() {
        this.providerHandler.beforePackageInitialize()
    }

    async deployFinalizeCleanup() {
        await this.providerHandler.deployFinalizeCleanup()
    }
}

module.exports = ServerlessGpt