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

const UpdateRecipeMutation = gql`
  mutation updateRecipe($id: String!, $title: String!, $body: String!) {
    updateOneRecipe(
      where: { id: $id }
      data: { title: { set: $title }, body: { set: $body } }
    ) {
      id
      updatedAt
    }
  }
`

const CreateRecipeMutation = gql`
  mutation createRecipe($title: String!, $body: String!) {
    createOneRecipe(data: { title: $title, body: $body }) {
      id
      createdAt
    }
  }
`

const DeleteRecipeMutation = gql`
  mutation deleteRecipe($id: String!) {
    deleteOneRecipe(where: { id: $id }) {
      id
    }
  }
`
