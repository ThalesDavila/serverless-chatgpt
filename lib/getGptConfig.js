export function getGptConfig(serverlessChatgpt) {
    return {
        schema_version: serverlessChatgpt.schemaVersion,
        name_for_human: serverlessChatgpt.nameForHuman,
        name_for_model: serverlessChatgpt.nameForModel,
        description_forHuman: serverlessChatgpt.descriptionForHuman,
        description_for_model: serverlessChatgpt.descriptionForModel,
        contact_email: serverlessChatgpt.contactEmail,
        legal_info_url: serverlessChatgpt.legalInfoUrl,
    }
}