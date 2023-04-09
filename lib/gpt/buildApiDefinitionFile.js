export function buildApiDefinitionFile({
    openapiVersion,
    title,
    description,
    apiVersion,
    url,
    paths,
}) {
    return {
        openapi: openapiVersion,
        info: {
          title,
          description,
          version: apiVersion,
        },
        servers: [url],
        paths,
    }
}