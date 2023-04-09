import {ServerlessGptAws} from "./aws/ServerlessGptAws";

export function providerFactory(serverless) {
    if (!serverless) return {}
    const providerName = serverless.service.provider.name;
    switch (providerName) {
        case 'aws':
            return new ServerlessGptAws(serverless)
        default:
            throw new Error(`Provider ${providerName} is not available`)
    }
}