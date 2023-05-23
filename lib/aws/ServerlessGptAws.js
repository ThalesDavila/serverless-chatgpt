import {AWS_PROVIDER_PROPERTIES} from "./awsServerlessProperties";
import {ServerlessGptFunction} from "../ServerlessGptFunction";

export class ServerlessGptAws {
    BUCKET_NAME = 'chatgpt-public'
    BUCKET_URL = `https://${this.BUCKET_NAME}.s3.amazonaws.com`

    constructor(serverless, files, ajv) {
        this.serverless = serverless;
        this.files = files;

        // validates data before deploy resources
        ajv.validate(
            AWS_PROVIDER_PROPERTIES,
            this.serverless.service.provider
        )

        this.s3 = new this.serverless.providers.aws.sdk.S3();
    }

    async beforePackageInitialize() {
        const serverlessGptFunction = new ServerlessGptFunction(
            this.files,
            this.serverless.config.servicePath
        )

        const functions = serverlessGptFunction.generate()

        Object.keys(functions).forEach((key) => {
            this.serverless.service.functions[key] = functions[key]
        })
    }

    async deployFinalizeCleanup() {
        this.generatedFilesUrls = {
            logo: this.generateFileUrl(this.BUCKET_URL, this.files.logo.path),
            manifest: this.generateFileUrl(this.BUCKET_URL, this.files.manifest.path),
            api: this.generateFileUrl(this.BUCKET_URL, this.files.apiDefinition.path),
        }

        // : ${this.formatGeneratedFilesLog()}
        this.serverless.cli.log(
            `The serverless-chatgpt files deploy were generated successfully`
        );
    }

    generateFileUrl(base, path) {
        return `${base}/${path}`
    }

    formatGeneratedFilesLog() {
        return JSON.stringify(
            this.generatedFilesUrls,
            null,
            2
        )
        .replace(/[{},]/g, function(match) {
            if ([
                '"',
                ',',
                '{',
                '}'
            ].includes(match)) return ''
        });
    }
}