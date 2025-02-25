export const graphqlTypeDefinitions = `

interface Node {
  id: ID!
}

type Delivery implements Node @key(fields: "id") {
  id: ID!
  deliveryDate: String!
}

extend type Purchase @key(fields: "id") {
  id: ID! @external
  delivery: Delivery
}
`
