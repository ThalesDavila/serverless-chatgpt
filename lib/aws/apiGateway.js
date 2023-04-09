const versions = [
    'ApiGatewayRestApi',
    'HttpApi'
]

export function getApiGatewayUrl(resources, region, stage) {
    console.log(getApiGatewayType(resources), region, stage);
    if (!(resources && region && stage)) throw new Error('Missing')

    return `https://${resources[getApiGatewayType(resources)].Properties.Name}.execute-api.${region}.amazonaws.com/${stage}`;
}

function getApiGatewayType(resources) {
    return Object.keys(resources)
        .find((key) => versions.includes(key))
}