import { LocalGraphQLDataSource } from "@apollo/gateway"
import { buildSubgraphSchema } from "@apollo/subgraph"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { typeDefs as scalarsTypeDefs } from "graphql-scalars"
import { resolvers as scalarResolvers } from "graphql-scalars"
import { graphqlTypeDefinitions } from "./schema.graphql"

const dummyProduct = {
  id: "pr:1",
  name: "牛乳",
  price: 100,
  stock: 10,
}

const dummyProduct2 = {
  id: "pr:2",
  name: "卵",
  price: 200,
  stock: 20,
}

const dummyProduct3 = {
  id: "pr:3",
  name: "パン",
  price: 300,
  stock: 30,
}


const resolvers = {
  ScalarName: scalarResolvers,
  Product: {
    __resolveReference: async (_ref: { id: string }, _context: unknown) => {
      return dummyProduct
    },
  },
  Purchase: {
    products: async (_purchase: { id: string }, _args: unknown, _context: unknown) => {
      return [dummyProduct, dummyProduct2, dummyProduct3]
    },
  },
  Query: {
    Product: async (_parent: unknown, _args: { id: string }, _context: unknown) => {
      return dummyProduct
    },
  },
}

const rawSchema = {
  resolvers: Object.assign({}, resolvers, scalarResolvers),
  typeDefs: mergeTypeDefs([graphqlTypeDefinitions, scalarsTypeDefs]),
}

export const schema = buildSubgraphSchema([rawSchema])

export const localGraphDataSource = new LocalGraphQLDataSource(schema)
