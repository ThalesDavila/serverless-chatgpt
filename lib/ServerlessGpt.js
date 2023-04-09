const jsYaml = require('js-yaml');

const {buildChatgptPublicUpload} = require("./aws/buildChatgptPublicUpload");
const {buildApiDefinitionFile} = require("./openAi/buildApiDefinitionFile");
const {buildManifestFile} = require("./openAi/buildManifestFile");
const {getChatgptEndpoints} = require("./aws/getChatgptEndpoints");
const {customFunctionProperties, CUSTOM_PROPERTIES, FUNCTION_PROPERTIES} = require("./serverless/serverlessProperties");
const {getGptConfig} = require("./getGptConfig");
const {buildCustomResources} = require("./serverless/buildCustomResources");
const {getApiGatewayUrl} = require("./serverless/apiGateway");

class ServerlessGpt {
   constructor(serverless) {
    this.serverless = serverless;
    this.provider = this.serverless.getProvider('aws');
    serverless.configSchemaHandler.defineCustomProperties(CUSTOM_PROPERTIES);

    serverless.configSchemaHandler.defineFunctionProperties('aws', FUNCTION_PROPERTIES);
    this.hooks = {
      // initialize: () => this.init(),
      'before:deploy:deploy': this.modifyStack.bind(this),
    };
  }

  init() {
     console.log(this.serverless.service.functions)
     const chatgptEndpoints = getChatgptEndpoints(this.serverless.service.functions)
    console.log('Serverless instance: ', chatgptEndpoints, buildManifestFile(getGptConfig(this.serverless.service.custom)))
        // this.serverless);
    // console.log('---------------------------------------', this.getApiGatewayUrl())
    // `serverless.service` contains the (resolved) serverless.yml config
    const service = this.serverless.service;
    // console.log('Provider name: ', service.provider.name);
    // console.log('Functions: ', service.functions);
  }

    async modifyStack() {
      const template = this.serverless.service.provider.compiledCloudFormationTemplate;
      template.Resources = {
        ...template.Resources,
        ...buildCustomResources(
            this.serverless.service.custom,
            this.serverless.service.functions,
            getApiGatewayUrl(
               this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
               this.provider.getRegion(),
               this.provider.getStage()
            ))
      }
      const a = this.serverless.providers.aws.naming.getStackName()
      console.log(template, getChatgptEndpoints(this.serverless.service.functions))
        console.log(getApiGatewayUrl(
           this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
           this.provider.getRegion(),
           this.provider.getStage()
       ))
      throw new Error();
  }

}

module.exports = ServerlessGpt