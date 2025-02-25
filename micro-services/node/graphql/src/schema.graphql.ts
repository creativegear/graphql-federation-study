export const graphqlTypeDefinitions = `

type Query {
  node(id: ID): Node
}

interface Node {
  id: ID!
}

type Customer implements Node @key(fields: "id") {
  id: ID!
}

type Address implements Node @key(fields: "id") {
  id: ID!
}

type Purchase implements Node @key(fields: "id") {
  id: ID!
}

type Delivery implements Node @key(fields: "id") {
  id: ID!
}

type Product implements Node @key(fields: "id") {
  id: ID!
}

type Store implements Node @key(fields: "id") {
  id: ID!
}
`
