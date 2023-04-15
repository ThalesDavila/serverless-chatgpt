import {ServerlessGptAws} from "./aws/ServerlessGptAws";

export function providerFactory(serverless, ajv) {
    const providerName = serverless.service.provider.name;
    switch (providerName) {
        case 'aws':
            return new ServerlessGptAws(serverless, ajv)
        default:
            throw new Error(`Provider ${providerName} is not available`)
    }
}