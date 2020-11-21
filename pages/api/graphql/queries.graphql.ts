import gql from "graphql-tag"

const RecipesQuery = gql`
    query allRecipes {
        recipes {
            id
            title
            body
        }
    }
`