const {buildCustomResources} = require("../serverless/buildCustomResources");
const {getApiGatewayUrl} = require("./apiGateway");

export class ServerlessGptAws {
    constructor(serverless) {
        this.serverless = serverless;
    }

    beforeDeployDeploy() {
        this.serverless.service.provider.compiledCloudFormationTemplate.Resources = {
            ...this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
            ...buildCustomResources(
                this.serverless.service.custom,
                this.serverless.service.functions,
                getApiGatewayUrl(
                    this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
                    this.serverless.service.provider.name,
                    this.serverless.service.provider.stage
                )
            )
        }
        console.log(this.serverless.service.provider.compiledCloudFormationTemplate.Resources)
        throw new Error();
    }
}