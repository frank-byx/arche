import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core"
import clsx from "clsx"
import { useRecipeLogQuery } from "../generated/graphql"

import RecipeEditorAppBar from "../components/RecipeEditorAppBar"
import useRecipeReducer, {
  parseRecipeLogQueryResults,
  Recipe,
} from "../src/recipe"
import RecipeInput from "./RecipeInput"
import RecipeViewer from "./RecipeViewer"

type Props = {
  drawerIsOpen: boolean
  setDrawerIsOpen(drawerIsOpen: boolean): any
  drawerWidth: number
  currentRecipeID: string
  setCurrentRecipeID(currentRecipeID: string): any
  editMode: boolean
  setEditMode(editMode: boolean): any
  searchString: string
  setSearchString(newSearchString: string): any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: "none",
    },
    appBarPlaceholder: {
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    contentShift: {
      marginLeft: (props: Props) => -props.drawerWidth,
    },
  })
)

export default function RecipeEditor(props: Props) {
  const classes = useStyles(props)

  const currentRecipe: Recipe = parseRecipeLogQueryResults(
    useRecipeLogQuery({
      variables: { id: props.currentRecipeID },
    })
  )

  const [editedRecipe, editedRecipeDispatch] = useRecipeReducer()

  const recipeEditorAppBarProps = {
    drawerIsOpen: props.drawerIsOpen,
    setDrawerIsOpen: props.setDrawerIsOpen,
    drawerWidth: props.drawerWidth,
    currentRecipeID: props.currentRecipeID,
    setCurrentRecipeID: props.setCurrentRecipeID,
    editMode: props.editMode,
    setEditMode: props.setEditMode,
    editedRecipe,
    editedRecipeDispatch,
    currentRecipe,
    searchString: props.searchString,
    setSearchString: props.setSearchString,
  }

  const recipeInputProps = {
    editedRecipe,
    editedRecipeDispatch,
  }

  const recipeViewerProps = {
    currentRecipeID: props.currentRecipeID,
  }

  return (
    <>
      <RecipeEditorAppBar {...recipeEditorAppBarProps} />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: !props.drawerIsOpen,
        })}
      >
        <div className={classes.appBarPlaceholder} />
        <div className={!props.editMode ? classes.hide : undefined}>
          <RecipeInput {...recipeInputProps} />
        </div>
        <div className={props.editMode ? classes.hide : undefined}>
          <RecipeViewer {...recipeViewerProps} />
        </div>
      </div>
    </>
  )
}
