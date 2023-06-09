import {ServerlessGptAws} from "./aws/ServerlessGptAws";

export function providerFactory(serverless, files, ajv) {
    const providerName = serverless.service.provider.name;
    switch (providerName) {
        case 'aws':
            return new ServerlessGptAws(serverless, files, ajv)
        default:
            throw new Error(`Provider ${providerName} is not available`)
    }
}