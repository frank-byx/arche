import { makeSchema, mutationType, objectType, queryType } from "@nexus/schema"
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
import path from "path"

const Recipe = objectType({
    name: "Recipe",
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.body()
    },
})

const Query = queryType({
    definition(t) {
        t.crud.recipe()
        t.crud.recipes({ filtering: true, ordering: true })
    },
})

const Mutation = mutationType({
    definition(t) {
        t.crud.createOneRecipe()
        t.crud.deleteOneRecipe()
        t.crud.updateOneRecipe()
    },
})

export const schema = makeSchema({
    types: {
        Recipe,
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

