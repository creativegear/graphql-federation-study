import { LocalGraphQLDataSource } from "@apollo/gateway"
import { buildSubgraphSchema } from "@apollo/subgraph"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { typeDefs as scalarsTypeDefs } from "graphql-scalars"
import { resolvers as scalarResolvers } from "graphql-scalars"
import { graphqlTypeDefinitions } from "./schema.graphql"

const dummyDelivery = {
  id: "dv:1",
  deliveryDate: "2021-01-01",
}

const resolvers = {
  ScalarName: scalarResolvers,
  Delivery: {
    __resolveReference: async (_ref: { id: string }, _context: unknown) => {
      return dummyDelivery
    },
  },
  Purchase: {
    delivery: async (_purchase: { id: string }, _args: unknown, _context: unknown) => {
      return dummyDelivery
    },
  },
}

const rawSchema = {
  resolvers: Object.assign({}, resolvers, scalarResolvers),
  typeDefs: mergeTypeDefs([graphqlTypeDefinitions, scalarsTypeDefs]),
}

export const schema = buildSubgraphSchema([rawSchema])

export const localGraphDataSource = new LocalGraphQLDataSource(schema)
