export class ServerlessGptOffline {
     constructor(
         files,
         servicePath,
         host,
         httpPort
     ) {
        this.files = files;
        this.servicePath = servicePath;
        this.baseUrl = `${host}:${httpPort}`
     }

     generateUrls() {
         return {
            logo: this.generateHandlerUrl(this.files.logo.path),
            api: this.generateHandlerUrl(this.files.apiDefinition.path),
            base : this.baseUrl
         }
     }

     generateHandlerUrl(path) {
        return `${this.baseUrl}/${path}`
    }
}