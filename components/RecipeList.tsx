import React from "react"
import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { useRecipeLogSearchQuery } from "../generated/graphql"

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
  const [recipeLogSearchResults] = useRecipeLogSearchQuery({
    variables: { contains: props.searchString },
  })
  const handleItemClick = (recipeID: string) => {
    props.setEditMode(false)
    props.setCurrentRecipeID(recipeID)
  }

  return (
    <div className={classes.recipeList}>
      <List>
        {recipeLogSearchResults.data?.recipeLogs.map((recipe) => (
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
