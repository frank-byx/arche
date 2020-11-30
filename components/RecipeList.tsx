import React from "react"
import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { useRecipeSearchQuery } from "../generated/graphql"

type Props = {
  setEditMode(editMode: boolean): any
  setCurrentRecipeID(currentRecipe: string): any
  searchString: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recipeList: {
      overflowY: "auto",
      paddingLeft: theme.spacing(1),
    },
  })
)

export default function RecipeList(props: Props) {
  const classes = useStyles(props)
  const [recipeSearchResults] = useRecipeSearchQuery({
    variables: { contains: props.searchString },
  })
  const handleItemClick = (recipeID: string) => {
    props.setEditMode(false)
    props.setCurrentRecipeID(recipeID)
  }

  return (
    <div className={classes.recipeList}>
      <List>
        {recipeSearchResults.data?.recipes.map((recipe) => (
          <ListItem
            button
            key={recipe.id}
            onClick={() => {
              handleItemClick(recipe.id)
            }}
          >
            <ListItemText primary={recipe.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
