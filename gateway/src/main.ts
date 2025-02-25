import http from "node:http"
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { localGraphDataSource as customerSchema } from "@gql-federation-study/customer-graphql"
import { localGraphDataSource as storeSchema } from "@gql-federation-study/store-graphql"
import { localGraphDataSource as productSchema } from "@gql-federation-study/product-graphql"
import { localGraphDataSource as purchaseSchema } from "@gql-federation-study/purchase-graphql"
import { localGraphDataSource as deliverySchema } from "@gql-federation-study/delivery-graphql"
import { localGraphDataSource as nodeSchema } from "@gql-federation-study/node-graphql"
import cors from "cors"
import express from "express"
import { graphqlSchema } from "./supergraph.graphqls"

const localSubgraphGateway = new ApolloGateway({
  supergraphSdl: graphqlSchema,
  buildService: ({ url }) => {
    if (url === "http://customer") {
      return customerSchema
    }
    if (url === "http://store") {
      return storeSchema
    }
    if (url === "http://product") {
      return productSchema
    }
    if (url === "http://purchase") {
      return purchaseSchema
    }
    if (url === "http://delivery") {
      return deliverySchema
    }
    if (url === "http://node") {
      return nodeSchema
    }
    return new RemoteGraphQLDataSource({ url })
  },
})

const gateway = localSubgraphGateway

const createServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  app.use("/graphql", cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {}))

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log("🚀 Server ready at http://localhost:4000/graphql")
}

createServer()
