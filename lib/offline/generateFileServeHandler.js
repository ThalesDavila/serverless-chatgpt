const {FileTypeEnum} = require("../utils/enums/FileTypeEnum");

export const serveFileHandler =(filename, contentType, servicePath, relativePath = '.well-known') => {
    const handlerStr = `
        async function (event) {
            const path = require("path");
            const fs = require("fs");
            
            const filePath = path.join('${servicePath}', '${relativePath}', '${filename}');
            const fileContent = fs.readFileSync(filePath);
            return {
                statusCode: 200,
                headers: {
                  'Content-Type': '${contentType}',
                },
                body: '${contentType}' === '${FileTypeEnum.PNG}' ? fileContent.toString('base64') : fileContent,
                isBase64Encoded: true,
            };
        }
    `

    return `module.exports.handler = ${handlerStr};`;
};