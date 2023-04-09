import {buildChatgptPublicUpload} from "../aws/buildChatgptPublicUpload";
import jsYaml from "js-yaml";
import {buildApiDefinitionFile} from "../openAi/buildApiDefinitionFile";
import {buildManifestFile} from "../openAi/buildManifestFile";
import {getGptConfig} from "../getGptConfig";
import {getChatgptPaths} from "../aws/getChatgptEndpoints";

export function buildCustomResources(custom, functions, apiGetewayUrl) {
    const apiUrl = `${apiGetewayUrl}/openapi.yaml`;
    const gptConfig = getGptConfig(custom)
    return buildChatgptPublicUpload([
      {
        name: 'apiDefinition',
        contentType: 'application/yaml',
        data: jsYaml.dump(buildApiDefinitionFile({
            ...gptConfig,
            url: apiGetewayUrl,
            paths: getChatgptPaths(functions)
        }))
      },
      {
        name: 'manifest',
        contentType: 'application/json',
        data: JSON.stringify(buildManifestFile({
            ...gptConfig,
            api_url: apiUrl
        }))
      }
    ]
    )
}