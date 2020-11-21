// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ApolloServer } from "apollo-server-micro"
import { schema } from "./graphql/schema"
import { createContext } from "./graphql/context"

const server = new ApolloServer({
  schema,
  context: createContext,
})

const handler = server.createHandler({
  path: "/api/app",
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
