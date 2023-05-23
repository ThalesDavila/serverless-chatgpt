export const CUSTOM_PROPERTIES = {
    type: 'object',
    properties: {
        serverlessChatgpt: {
            type: 'object',
            properties: {
                schema_version: { type: 'string'},
                name_for_human: { type: 'string', maxLength: 50 },
                name_for_model: { type: 'string', maxLength: 50 },
                description_for_human: { type: 'string', maxLength: 120 },
                description_for_model: { type: 'string', maxLength: 8000 },
                contact_email: { type: 'string'},
                legal_info_url: { type: 'string'},
            },
            required: [
                'schema_version',
                'name_for_human',
                'name_for_model',
                'description_for_human',
                'description_for_model',
                'contact_email',
                'legal_info_url'
            ]
        },
    },
}

export const FUNCTION_PROPERTIES = {
    properties: {
        serverlessChatgptApi: {
            type: 'object',
            properties: {
                operationId: {type: 'string'},
                summary: {type: 'string'},
                responses: {type: 'object'}
            }
        },
    },
}