export const CUSTOM_PROPERTIES = {
    type: 'object',
    properties: {
        serverlessChatgpt: {
            type: 'object',
            properties: {
                schemaVersion: {type: 'string'},
                nameForHuman: {type: 'string'},
                nameForModel: {type: 'string'},
                descriptionForHuman: {type: 'string'},
                descriptionForModel: {type: 'string'},
                contactEmail: {type: 'string'},
                legalInfoUrl: {type: 'string'},
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