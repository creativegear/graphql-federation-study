export const graphqlTypeDefinitions = `

interface Node {
  id: ID!
}

type Customer implements Node @key(fields: "id") {
  id: ID!
  name: String!
  email: String!
  addressess: [Address!]!
}

type Address implements Node @key(fields: "id") {
  id: ID!
  postalCode: String!
  prefecture: String!
  city: String!
  street: String!
  building: String
}

extend type Delivery @key(fields: "id") {
  id: ID! @external
  address: Address!
}

type Query {
  viewer: Customer
}
`
