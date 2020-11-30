import React from "react"
import Head from "next/head"
import { makeStyles, Theme, createStyles } from "@material-ui/core"

import RecipeDrawer from "../components/RecipeDrawer"
import RecipeEditor from "../components/RecipeEditor"

const DRAWER_WIDTH = 512

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      overflow: "hidden",
      flexgrow: 1,
    },
  })
)

export default function RecipeLog() {
  const classes = useStyles()

  const [drawerIsOpen, setDrawerIsOpen] = React.useState(true)
  const [editMode, setEditMode] = React.useState(false)
  const [currentRecipeID, setCurrentRecipeID] = React.useState("")

  const recipeDrawerProps = {
    drawerWidth: DRAWER_WIDTH,
    editMode: editMode,
    setEditMode: setEditMode,
    currentRecipeID: currentRecipeID,
    setCurrentRecipeID: setCurrentRecipeID,
    drawerIsOpen: drawerIsOpen,
    setDrawerIsOpen: setDrawerIsOpen,
  }

  const recipeEditorProps = {
    drawerIsOpen,
    setDrawerIsOpen,
    drawerWidth: DRAWER_WIDTH,
    currentRecipeID,
    setCurrentRecipeID,
    editMode,
    setEditMode,
  }

  return (
    <div>
      <Head>
        <title>Recipe Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.root}>
        <RecipeDrawer {...recipeDrawerProps} />
        <RecipeEditor {...recipeEditorProps} />
      </div>
    </div>
  )
}
