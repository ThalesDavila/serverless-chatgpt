export function fulfillManifestUrl(logoUrl, apiUrl, manifest) {
    return {
        ...manifest,
        logo_url: logoUrl,
        api: {
            ...manifest.api,
            url: apiUrl,
        }
    }
}

export function fulfillApiDefinitionUrl(url, apiDefinition) {
    return {
        ...apiDefinition,
        servers: [{url}]
    }
}