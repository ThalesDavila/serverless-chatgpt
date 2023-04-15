export const CUSTOM_PROPERTIES = {
    type: 'object',
    properties: {
        serverlessChatgpt: {
            type: 'object',
            properties: {
                schemaVersion: { type: 'string'},
                nameForHuman: { type: 'string', maxLength: 50 },
                nameForModel: { type: 'string', maxLength: 50 },
                descriptionForHuman: { type: 'string', maxLength: 120 },
                descriptionForModel: { type: 'string', maxLength: 8000 },
                contactEmail: { type: 'string'},
                legalInfoUrl: { type: 'string'},
            }
        },
    },
}

export const FUNCTION_PROPERTIES = {
    properties: {
        serverlessChatgptFunction: {
            type: 'object',
            properties: {
                operationId: {type: 'string'},
                summary: {type: 'string'},
                responses: {type: 'object'}
            }
        },
    },
}