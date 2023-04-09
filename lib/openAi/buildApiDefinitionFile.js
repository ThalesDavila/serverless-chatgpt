export function buildApiDefinitionFile({
    openapiVersion,
    title,
    description,
    apiVersion,
    url,
    paths,
}) {
    return {
        openapi: openapiVersion,
        info: {
          title,
          description,
          version: apiVersion,
        },
        servers: {
            url
        },
        paths,
// : {
            // '/todos': {
                // get:
                  // operationId: getTodos
                  // summary: Get the list of todos
                  // responses:
                  //   "200":
                  //     description: OK
                  //     content:
                  //       application/json:
                  //         schema:
                  //           $ref: '#/components/schemas/getTodosResponse'

            // }
        // }

        // components:
        //   schemas:
        //     getTodosResponse:
        //       type: object
        //       properties:
        //         todos:
        //           type: array
        //           items:
        //             type: string
        //           description: The list of todos.
    }
}