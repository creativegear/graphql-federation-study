import { LocalGraphQLDataSource } from "@apollo/gateway"
import { buildSubgraphSchema } from "@apollo/subgraph"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { typeDefs as scalarsTypeDefs } from "graphql-scalars"
import { resolvers as scalarResolvers } from "graphql-scalars"
import { graphqlTypeDefinitions } from "./schema.graphql"

const resolvers = {
  ScalarName: scalarResolvers,
  Node: {
    __resolveType: (node: { id: string }) => {
      const [prefix] = node.id.split(":")
      if (prefix === "cus") {
        return "Customer"
      }
      if (prefix === "addr") {
        return "Address"
      }
      if (prefix === "dv") {
        return "Delivery"
      }
      if (prefix === "pr") {
        return "Product"
      }
      if (prefix === "pc") {
        return "Purchase"
      }
      if (prefix === "st") {
        return "Store"
      }
      return null
    },
  },
  Query: {
    node: (_parent: unknown, args: { id: string | null }) => {
      if (!args.id) {
        return null
      }
      return { id: args.id }
    },
  },
}

const rawSchema = {
  resolvers: Object.assign({}, resolvers, scalarResolvers),
  typeDefs: mergeTypeDefs([graphqlTypeDefinitions, scalarsTypeDefs]),
}

export const schema = buildSubgraphSchema([rawSchema])

export const localGraphDataSource = new LocalGraphQLDataSource(schema)
