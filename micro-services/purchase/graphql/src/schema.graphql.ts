export const graphqlTypeDefinitions = `

interface Node {
  id: ID!
}

type Purchase implements Node @key(fields: "id") {
  id: ID!
  purchaseDate: String!
  totalPrice: Int!
}

extend type Customer @key(fields: "id") {
  id: ID! @external
  purchases: [Purchase!]!
}

extend type Store @key(fields: "id") {
  id: ID! @external
  purchases: [Purchase!]!
}
`
