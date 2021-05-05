import React from "react"
import { makeStyles, createStyles, Drawer } from "@material-ui/core"
import SearchBar from "./RecipeSearchBar"
import RecipeList from "./RecipeList"

type Props = {
  drawerWidth: number
  editMode: boolean
  setEditMode(editMode: boolean): any
  currentRecipeID: string
  setCurrentRecipeID(currentRecipeID: string): any
  drawerIsOpen: boolean
  setDrawerIsOpen(drawerIsOpen: boolean): any
  searchString: string
  setSearchString(newSearchString: string): any
}

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: (props: Props) => props.drawerWidth,
    },
    drawerPaper: {
      width: (props: Props) => props.drawerWidth,
      overflow: "hidden",
    },
  })
)

export default function RecipeDrawer(props: Props) {
  const classes = useStyles(props)

  const searchBarProps = {
    searchString: props.searchString,
    setSearchString: props.setSearchString,
    drawerWidth: props.drawerWidth,
  }

  const recipeListProps = {
    editMode: props.editMode,
    setEditMode: props.setEditMode,
    currentRecipeID: props.currentRecipeID,
    setCurrentRecipeID: props.setCurrentRecipeID,
    searchString: props.searchString,
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.drawerIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <SearchBar {...searchBarProps} />
      <RecipeList {...recipeListProps} />
    </Drawer>
  )
}
