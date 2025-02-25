export const graphqlTypeDefinitions = `

interface Node {
  id: ID!
}

type Product implements Node @key(fields: "id") {
  id: ID!
  name: String!
  price: Int!
  stock: Int!
}

extend type Purchase @key(fields: "id") {
  id: ID! @external
  products: [Product!]!
}
`
