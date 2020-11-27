import gql from "graphql-tag"

const RecipeSearchQuery = gql`
  query recipeSearch($contains: String!) {
    recipes(
      where: { title: { contains: $contains } }
      orderBy: { updatedAt: desc }
    ) {
      id
      title
    }
  }
`

const RecipeInfoQuery = gql`
  query recipeInfo($id: String!) {
    recipe(where: { id: $id }) {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
`
