import gql from "graphql-tag"

const AllRecipeBodiesQuery = gql`
  query allRecipeBodies {
    recipeLogs {
      body
    }
  }
`

const RecipeLogSearchQuery = gql`
  query recipeLogSearch($contains: String!) {
    recipeLogs(
      where: { title: { contains: $contains } }
      orderBy: { updatedAt: desc }
    ) {
      id
      title
    }
  }
`

const RecipeLogQuery = gql`
  query recipeLog($id: String!) {
    recipeLog(where: { id: $id }) {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
`

const RenderRecipeLogQuery = gql`
  query renderRecipeLog($id: String!) {
    recipeLog(where: { id: $id }) {
      id
      render
    }
  }
`

const UpdateRecipeLogMutation = gql`
  mutation updateRecipeLog($id: String!, $title: String!, $body: Json!) {
    updateOneRecipeLog(
      where: { id: $id }
      data: { title: { set: $title }, body: $body }
    ) {
      id
      updatedAt
    }
  }
`

const CreateRecipeLogMutation = gql`
  mutation createRecipeLog($title: String!, $body: Json!) {
    createOneRecipeLog(data: { title: $title, body: $body }) {
      id
      createdAt
    }
  }
`

const DeleteRecipeLogMutation = gql`
  mutation deleteRecipeLog($id: String!) {
    deleteOneRecipeLog(where: { id: $id }) {
      id
    }
  }
`
