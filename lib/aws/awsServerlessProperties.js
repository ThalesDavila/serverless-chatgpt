export const AWS_PROVIDER_PROPERTIES = {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                    stage: {
                        type: 'string',
                    },
                    compiledCloudFormationTemplate: {
                        type: 'object',
                        properties: {
                            Resources: {
                                type: 'object',
                            }
                        }
                    }
            }
        }