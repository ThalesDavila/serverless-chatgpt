import {toUpperCaseFirstChar} from "../utils/str.js";

export function buildChatgptPublicUpload(files) {
    return {
        "ChatgptPublic": {
            "Type": "AWS::S3::Bucket",
            "DeletionPolicy": "Retain",
            "Properties": {
                "BucketName": "chatgpt-public"
            }
        },
        ...files.reduce((acc, file) => {
            acc[toUpperCaseFirstChar(file.name)] = fileUpload(file)
            return acc
        }, {})
    }
}

function fileUpload({name, contentType, data}) {
    return {
        Type: 'AWS::S3::Object',
        Properties: {
            Bucket: {Ref: 'chatgptPublic'},
            Key: name,
            ContentType: contentType,
            Body: {'Fn::Sub': data}
        }
    }
}