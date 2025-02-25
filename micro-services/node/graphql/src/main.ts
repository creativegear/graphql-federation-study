import { writeFileSync } from "node:fs"
import http from "node:http"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { printSchemaWithDirectives } from "@graphql-tools/utils"
import express from "express"
import { schema } from "./schema"

const createServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    plugins: [
      {
        // GQLサーバー起動時にスキーマファイルを出力する
        async serverWillStart() {
          const schemaSDL = printSchemaWithDirectives(schema)
          await writeFileSync("generated-schema.graphql", schemaSDL)
          console.log("Schema written to generated-schema.graphql🎉")
        },
      },
    ],
  })
  await server.start()
  app.use("/graphql", express.json(), expressMiddleware(server, {}))

  await new Promise<void>((resolve) => httpServer.listen({ port: 4005 }, resolve))
  console.log("🚀 Server ready at http://localhost:4005/graphql")
}

createServer()
