export const graphqlTypeDefinitions = `

interface Node {
  id: ID!
}

type Store implements Node @key(fields: "id") {
  id: ID!
  name: String!
}

extend type Purchase @key(fields: "id") {
  id: ID! @external
  store: Store!
}
`
