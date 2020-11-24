import gql from "graphql-tag"

const AllRecipesQuery = gql`
    query allRecipes {
        recipes {
            id
            title
            body
        }
    }
`