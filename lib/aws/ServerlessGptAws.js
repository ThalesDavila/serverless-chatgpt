import {uploadFileData} from "./s3Upload";
import jsYaml from "js-yaml";
import {buildApiDefinitionFile} from "../gpt/buildApiDefinitionFile";
import {getChatgptPaths} from "./getChatgptEndpoints";
import {buildManifestFile} from "../gpt/buildManifestFile";
import {getGptConfig} from "../getGptConfig";
import {FileTypeEnum} from "../utils/enums/FileTypeEnum";
import {AWS_PROVIDER_PROPERTIES} from "./awsServerlessProperties";

import {buildCustomResources} from "../serverless/buildCustomResources";
import {getApiGatewayUrl} from "./apiGateway";

export class ServerlessGptAws {
    BUCKET_NAME = 'chatgpt-public'
    BUCKET_URL = `https://${this.BUCKET_NAME}.s3.amazonaws.com`
    GPT_API_DEFINITION_NAME = 'gptApiDefinition'

    constructor(serverless, ajv) {
        this.serverless = serverless;

        // validates data before deploy resources
        ajv.validate(
            AWS_PROVIDER_PROPERTIES,
            this.serverless.service.provider
        )

        this.s3 = new this.serverless.providers.aws.sdk.S3();
    }

    beforeDeployDeploy() {
        this.serverless.service.provider.compiledCloudFormationTemplate.Resources = {
            ...this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
            ...buildCustomResources(
                this.BUCKET_NAME,
            )
        }
    }

    async deployFinalizeCleanup() {
        const gptConfig = getGptConfig(this.serverless.service.custom.serverlessChatgpt)
        const apiGatewayUrl = getApiGatewayUrl(
            this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
            this.serverless.service.provider.name,
            this.serverless.service.provider.stage
        )

        return Promise.all([
            uploadFileData(
                this.s3,
                this.BUCKET_NAME,
                'gptManifest',
                FileTypeEnum.JSON,
                JSON.stringify(buildManifestFile({
                    ...gptConfig,
                    api_url:  `${this.BUCKET_URL}/${this.GPT_API_DEFINITION_NAME}.${FileTypeEnum.YAML}`
                }))
            ),
            uploadFileData(
                this.s3,
                this.BUCKET_NAME,
                'gptApiDefinition',
                FileTypeEnum.YAML,
                jsYaml.dump(buildApiDefinitionFile({
                    ...gptConfig,
                    url: apiGatewayUrl,
                    paths: getChatgptPaths(this.serverless.service.functions)
                }))
            )
        ])
    }
}