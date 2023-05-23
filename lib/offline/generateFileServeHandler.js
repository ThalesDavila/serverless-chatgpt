const {FileTypeEnum} = require("../utils/enums/FileTypeEnum");

export const buildHandlerResponse =({fileContent, contentType, customReturn}) => {
    return JSON.stringify({
        ...customReturn,
        statusCode: 200,
        headers: {
          'Content-Type': contentType,
        },
        body: fileContent,
    });
};

export const serveImageFile = ({filename, contentType=FileTypeEnum.PNG, servicePath}) => {
    const path = require("path");
    const fs = require("fs");

    const filePath = path.join(servicePath, filename);
    const fileContent = fs.readFileSync(filePath).toString('base64');

    return buildHandlerResponse({fileContent, contentType, customReturn: {isBase64Encoded: true}});
}