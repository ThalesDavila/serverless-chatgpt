import {buildChatgptPublicUpload} from "../aws/buildChatgptPublicUpload";

export function buildCustomResources(bucketName) {
    return buildChatgptPublicUpload(
        bucketName,
    )
}