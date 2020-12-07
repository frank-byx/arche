import { makeSchema, mutationType, objectType, queryType } from "@nexus/schema"
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
import path from "path"

const RecipeLog = objectType({
  name: "RecipeLog",
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

const Query = queryType({
  definition(t) {
    t.crud.recipeLog()
    t.crud.recipeLogs({ filtering: true, ordering: true })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneRecipeLog()
    t.crud.deleteOneRecipeLog()
    t.crud.updateOneRecipeLog()
  },
})

export const schema = makeSchema({
  types: {
    RecipeLog,
    Query,
    Mutation,
  },
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), "schema.graphql"),
    typegen: path.join(process.cwd(), "nexus.ts"),
  },
  typegenAutoConfig: {
    contextType: "contextSource.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "contextSource",
      },
    ],
  },
})
