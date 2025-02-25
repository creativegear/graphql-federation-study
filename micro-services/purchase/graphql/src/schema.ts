import { LocalGraphQLDataSource } from "@apollo/gateway"
import { buildSubgraphSchema } from "@apollo/subgraph"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { typeDefs as scalarsTypeDefs } from "graphql-scalars"
import { resolvers as scalarResolvers } from "graphql-scalars"
import { graphqlTypeDefinitions } from "./schema.graphql"

const dummyPurchase = {
  id: "pc:1",
  purchaseDate: "2021-01-01",
  totalPrice: 600,
}

const dummyPurchase2 = {
  id: "pc:2",
  purchaseDate: "2021-01-02",
  totalPrice: 800,
}

const dummyPurchase3 = {
  id: "pc:3",
  purchaseDate: "2021-01-03",
  totalPrice: 1000,
}

const resolvers = {
  ScalarName: scalarResolvers,
  Purchase: {
    __resolveReference: async (_ref: { id: string }, _context: unknown) => {
      return dummyPurchase
    },
  },
  Customer: {
    purchases: async (_customer: { id: string }, _args: unknown, _context: unknown) => {
      return [dummyPurchase, dummyPurchase2, dummyPurchase3]
    },
  },
  Store: {
    purchases: async (_store: { id: string }, _args: unknown, _context: unknown) => {
      return [dummyPurchase, dummyPurchase2, dummyPurchase3]
    },
  },
  Query: {
    Purchase: async (_parent: unknown, _args: { id: string }, _context: unknown) => {
      return dummyPurchase
    },
  },
}

const rawSchema = {
  resolvers: Object.assign({}, resolvers, scalarResolvers),
  typeDefs: mergeTypeDefs([graphqlTypeDefinitions, scalarsTypeDefs]),
}

export const schema = buildSubgraphSchema([rawSchema])

export const localGraphDataSource = new LocalGraphQLDataSource(schema)
