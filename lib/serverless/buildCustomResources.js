import {buildChatgptPublicUpload} from "../aws/buildChatgptPublicUpload";
import jsYaml from "js-yaml";
import {buildApiDefinitionFile} from "../gpt/buildApiDefinitionFile";
import {buildManifestFile} from "../gpt/buildManifestFile";
import {getGptConfig} from "../getGptConfig";
import {getChatgptPaths} from "../aws/getChatgptEndpoints";

export function buildCustomResources(custom, functions, apiGetewayUrl) {
    const apiUrl = `${apiGetewayUrl}/openapi.yaml`;
    const gptConfig = getGptConfig(custom)
    return buildChatgptPublicUpload([
      {
        name: 'gptApiDefinition',
        contentType: 'application/yaml',
        data: jsYaml.dump(buildApiDefinitionFile({
            ...gptConfig,
            url: apiGetewayUrl,
            paths: getChatgptPaths(functions)
        }))
      },
      {
        name: 'gptManifest',
        contentType: 'application/json',
        data: JSON.stringify(buildManifestFile({
            ...gptConfig,
            api_url: apiUrl
        }))
      }
    ]
    )
}