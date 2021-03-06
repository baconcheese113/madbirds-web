import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'

new ApolloServer({ schema, context: createContext }).listen({ port: 4000 }, () =>
  console.log(`Server running at: https://localhost:4000`),
)
