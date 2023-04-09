export function getChatgptPaths(functions) {
    return Object.keys(functions)
        .filter((key) => functions[key].serverlessChatgptFunction)
        .map((key) => ({
            [key]: {
                ...functions[key].serverlessChatgptFunction,
                operation_id: functions[key].serverlessChatgptFunction.operationId

            }
        }))
}