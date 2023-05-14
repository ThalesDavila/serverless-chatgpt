> :warning: **It's in development**. Please don't use for production yet.

# Serverless ChatGPT Plugin
The Serverless ChatGPT Plugin makes it easy to create ChatGPT-based applications with minimal configuration. The plugin takes care of setting up the necessary configuration files and resources required by OpenAI, allowing you to focus on building engaging conversational experiences.

## Local File Serving
Our Serverless plugin now supports serving local files required by ChatGPT, facilitating quick integration with OpenAI on localhost.

### Usage
First, place the following files in your project's /public directory:
- logo.png: Your service's logo.
- manifest.json: Configuration for the ChatGPT plugin.
- openapi.yaml: Your service's API specification.

Then, add the **serverless-offline** plugin to the **serverless.yaml** file. This is required in order to serve locally your handler functions.
```
plugins:
  - serverless-offline
  - serverless-chatgpt
```

Run your Serverless application in offline mode (```sls offline```). The plugin will automatically serve these files at their respective endpoints.

The endpoints will be:
- /.well-known/ai-plugin.json
- /public/openapi.yaml
- /public/logo.png

> :information_source: This feature is particularly useful for testing your OpenAI integration locally before deploying to a live environment.

## Features
- Automatically generates and configures the necessary resources for ChatGPT integration.
- Easy-to-use with minimal configuration needed.
- Streamlines the deployment process of your ChatGPT-based applications.

## Limitations
- Provider: the plugin only supports AWS as the cloud provider.
- API Gateway custom URLs are not supported.
- No auth configuration for chatgpt.
If you need additional customization or support for other cloud providers, please open an issue, and we'll consider adding it based on the community's interest.

## Installation
First, install the Serverless Framework if you haven't already:

```bash
npm install -g serverless
```

Next, install the Serverless ChatGPT Plugin in your project:
```bash
npm install --save serverless-chatgpt-plugin
```

Configuration
To configure the plugin, add it to your serverless.yml file:

```yaml
service: your-service-name
provider: aws

custom:
  serverlessChatgpt:
    schemaVersion: string
    nameForHuman: string
    nameForModel: string
    descriptionForHuman: string
    descriptionForModel: string
    apiUrl: string
    logoUrl: string
    contactEmail: string
    legalInfoUrl: string

functions:
  hello:
    handler: handler.hello
    events:
      - httpApi:
          method: GET
          path: /hello

    serverlessChatgptFunction:
      operationId: get from some aws id
      summary: go to description
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  todos:
                    type: array
                    items:
                      type: string
                    description: The list of todos.

plugins:
  - serverless-chatgpt
```

Please note at least one function with serverlessChatgptFunction parameters and serverlessChatgpt on custom are needed for this plugin to work. Besides that, many aren't but is suggested to add proper descriptions, email, and logo url.
## Usage
The plugin will automatically set up the necessary resources and configuration files for your ChatGPT-based application. Deploy your service using the serverless command:

```bash
serverless deploy
```
The Serverless Framework will take care of the deployment process, and the ChatGPT integration will be ready to be configured on ChatGPT website. 
For more information about that configuration and ChatGPT plugin rules, see the [ChatGPT Plugins Documentation](https://platform.openai.com/docs/plugins/introduction)

## Contributing
Contributions to the Serverless ChatGPT Plugin are welcome! To contribute, please follow these steps:

- Fork the repository.
- Create a new branch with a descriptive name.
- Make your changes and commit them with a meaningful commit message.
- Submit a pull request, and provide a detailed description of your changes.
- Please make sure your changes follow our coding guidelines and include tests if applicable.

## License
This project is licensed under the LGPL-3.0 License.

## Support
If you encounter any issues or have questions about the Serverless ChatGPT Plugin, please open an issue on our GitHub repository or contact the maintainers.
