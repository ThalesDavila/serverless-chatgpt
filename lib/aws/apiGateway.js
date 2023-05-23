const versions = [
    'ApiGatewayRestApi',
    'HttpApi'
]

export function getApiGatewayUrl(resources, region) {
    return `https://${resources[getApiGatewayType(resources)].Properties.Name}.execute-api.${region}.amazonaws.com`;
}

function getApiGatewayType(resources) {
    return Object.keys(resources)
        .find((key) => versions.includes(key))
}