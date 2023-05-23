export async function uploadFileData(
    s3,
    bucketName,
    fileName,
    contentType,
    data
) {
    return s3.upload({
        Bucket: bucketName,
        Key: fileName,
        ContentType: contentType,
        Body: data,
    })
        .promise();
}