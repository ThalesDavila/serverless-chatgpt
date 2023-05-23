export function getChatgptPaths(functions) {
    return Object.keys(functions)
        .filter((key) => functions[key].serverlessChatgptApi)
        .map((key) => ({
            [key]: {
                ...functions[key].serverlessChatgptApi,
                operation_id: functions[key].serverlessChatgptApi.operationId

            }
        }))
}