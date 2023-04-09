export function getGptConfig(custom) {
    if (!custom.serverlessChatgpt) throw Error()
    return {
        schema_version: custom.serverlessChatgpt.schemaVersion,
        name_for_human: custom.serverlessChatgpt.nameForHuman,
        name_for_model: custom.serverlessChatgpt.nameForModel,
        description_forHuman: custom.serverlessChatgpt.descriptionForHuman,
        description_for_model: custom.serverlessChatgpt.descriptionForModel,
        contact_email: custom.serverlessChatgpt.contactEmail,
        legal_info_url: custom.serverlessChatgpt.legalInfoUrl,
    }
}