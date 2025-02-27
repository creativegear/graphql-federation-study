import { LocalGraphQLDataSource } from "@apollo/gateway"
import { buildSubgraphSchema } from "@apollo/subgraph"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { typeDefs as scalarsTypeDefs } from "graphql-scalars"
import { resolvers as scalarResolvers } from "graphql-scalars"
import { graphqlTypeDefinitions } from "./schema.graphql"

const dummyCustomer = {
  id: "cus:1",
  name: "John Doe",
  email: "example@example.jp",
}

const dummyAddress1 = {
  id: "addr:1",
  postalCode: "100-0001",
  prefecture: "Tokyo",
  city: "Chiyoda",
  street: "Chiyoda",
  building: "1-1",
}

const dummyAddress2 = {
  id: "addr:2",
  postalCode: "100-0002",
  prefecture: "Tokyo",
  city: "Chiyoda",
  street: "Chiyoda",
  building: "1-2",
}

const resolvers = {
  ScalarName: scalarResolvers,
  Customer: {
    addresses: async (_customer: { id: string }, _args: unknown, _context: unknown) => {
      return [dummyAddress1, dummyAddress2]
    },
    __resolveReference: async (_ref: { id: string }, _context: unknown) => {
      return dummyCustomer
    },
  },
  Address: {
    __resolveReference: async (_ref: { id: string }, _context: unknown) => {
      return dummyAddress1
    },
  },
  Delivery: {
    address: async (_customer: { id: string }, _args: unknown, _context: unknown) => {
      return dummyAddress1
    },
  },
  Query: {
    viewer: async (_parent: unknown, _args: { id: string }, _context: unknown) => {
      return dummyCustomer
    },
    Customer: async (_parent: unknown, _args: { id: string }, _context: unknown) => {
      return dummyCustomer
    },
    Address: async (_parent: unknown, _args: { id: string }, _context: unknown) => {
      return dummyAddress1
    },
  },
}

const rawSchema = {
  resolvers: Object.assign({}, resolvers, scalarResolvers),
  typeDefs: mergeTypeDefs([graphqlTypeDefinitions, scalarsTypeDefs]),
}

export const schema = buildSubgraphSchema([rawSchema])

export const localGraphDataSource = new LocalGraphQLDataSource(schema)
