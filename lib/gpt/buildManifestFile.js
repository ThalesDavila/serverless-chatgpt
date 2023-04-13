export function buildManifestFile({
                                      schema_version = 'v1',
                                      name_for_human,
                                      name_for_model,
                                      description_for_human,
                                      description_for_model,
                                      auth = {
                                          type: 'none'
                                      },
                                      api_url,
                                      logo_url,
                                      contact_email,
                                      legal_info_url
                                  }) {
    return {
        schema_version,
        name_for_human,
        name_for_model,
        description_for_human,
        description_for_model,
        auth,
        api: {
            type: 'openapi',
            url: api_url,
            is_user_authenticated: auth.type !== 'none'
        },
        logo_url,
        contact_email,
        legal_info_url
    }
}