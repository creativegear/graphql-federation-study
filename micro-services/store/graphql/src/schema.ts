import { LocalGraphQLDataSource } from "@apollo/gateway"
import { buildSubgraphSchema } from "@apollo/subgraph"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { typeDefs as scalarsTypeDefs } from "graphql-scalars"
import { resolvers as scalarResolvers } from "graphql-scalars"
import { graphqlTypeDefinitions } from "./schema.graphql"

const dummyStore = {
  id: "st:1",
  name: "品川店",
}

const dummyStore2 = {
  id: "st:2",
  name: "渋谷店",
}

const dummyStore3 = {
  id: "st:3",
  name: "新宿店",
}

const resolvers = {
  ScalarName: scalarResolvers,
  Store: {
    __resolveReference: async (_ref: { id: string }, _context: unknown) => {
      return dummyStore
    },
  },
  Purchase: {
    store: async (_purchase: { id: string }, _args: unknown, _context: unknown) => {
      return dummyStore
    },
  },
  Query: {
    Store: async (_parent: unknown, _args: { id: string }, _context: unknown) => {
      return dummyStore
    },
  },
}

const rawSchema = {
  resolvers: Object.assign({}, resolvers, scalarResolvers),
  typeDefs: mergeTypeDefs([graphqlTypeDefinitions, scalarsTypeDefs]),
}

export const schema = buildSubgraphSchema([rawSchema])

export const localGraphDataSource = new LocalGraphQLDataSource(schema)
