import Ajv from 'ajv';

import {CUSTOM_PROPERTIES, FUNCTION_PROPERTIES} from "./serverless/serverlessProperties";
import {providerFactory} from "./providerFactory";
import {fileServeFunctions} from "./offline/fileServeFunctions";

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

        //Get the provider hooks handler based on the serverless object
        this.providerHandler = providerFactory(this.serverless, ajv)

        // Call the deployment hook to add the custom resources based on the provider
        this.hooks = {
            'before:deploy:deploy': this.beforeDeployDeploy.bind(this),
            [`${providerName}:deploy:finalize:cleanup`]: this.deployFinalizeCleanup.bind(this),
            'before:offline:start': this.beforeOfflineStart.bind(this),
        };
    }

    beforeOfflineStart() {
        const newFuncs = fileServeFunctions(this.serverless.config.servicePath);
        Object.keys(newFuncs).forEach((key) => {
            this.serverless.service.functions[key] = newFuncs[key]
        })
    }

    beforeDeployDeploy() {
        this.providerHandler.beforeDeployDeploy()
    }

    async deployFinalizeCleanup() {
        await this.providerHandler.deployFinalizeCleanup()
    }
}

module.exports = ServerlessGpt