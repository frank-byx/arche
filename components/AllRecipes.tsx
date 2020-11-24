import { Container, List, ListItem, Typography } from "@material-ui/core"
import React, { useReducer } from "react"
import { useAllRecipesQuery } from "../generated/graphql"

type RecipesData = {
  recipes: {
    id: string
    title: string
    body: string
  }[]
}

const AllRecipes: React.FC = () => {
  const [{ data, fetching, error }] = useAllRecipesQuery()

  if (fetching) {
    return <p>Fetching</p>
  }
  if (error) {
    return <p>Error: {error.message}</p>
  }
  return (
    <List>
      {data?.recipes.map((recipe) => (
        <ListItem>
          <Typography>
            {recipe.id} - {recipe.title} - {recipe.body}
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}

export default AllRecipes
