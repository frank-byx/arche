import React from "react"
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  InputBase,
} from "@material-ui/core"
import clsx from "clsx"
import { useRecipeInfoQuery } from "../generated/graphql"

import RecipeEditorAppBar from "../components/RecipeEditorAppBar"

type Props = {
  drawerIsOpen: boolean
  setDrawerIsOpen(drawerIsOpen: boolean): any
  drawerWidth: number
  currentRecipeID: string
  setCurrentRecipeID(currentRecipeID: string): any
  editMode: boolean
  setEditMode(editMode: boolean): any
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
      marginLeft: (props: Props) => -props.drawerWidth,
    },
    contentShift: {
      marginLeft: 0,
    },
  })
)

export default function RecipeEditor(props: Props) {
  const classes = useStyles()

  const [editedTitle, setEditedTitle] = React.useState("")
  const [editedBody, setEditedBody] = React.useState("")

  const [recipeInfoResults] = useRecipeInfoQuery({
    variables: { id: props.currentRecipeID },
  })
  const currentRecipeInfo = recipeInfoResults.data?.recipe

  const recipeEditorAppBarProps = {
    drawerIsOpen: props.drawerIsOpen,
    setDrawerIsOpen: props.setDrawerIsOpen,
    drawerWidth: props.drawerWidth,
    currentRecipeID: props.currentRecipeID,
    setCurrentRecipeID: props.setCurrentRecipeID,
    editMode: props.editMode,
    setEditMode: props.setEditMode,
    editedTitle,
    setEditedTitle,
    editedBody,
    setEditedBody,
    currentRecipeInfo,
  }

  return (
    <>
      <RecipeEditorAppBar {...recipeEditorAppBarProps} />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: props.drawerIsOpen,
        })}
      >
        <div className={classes.appBarPlaceholder} />
        <InputBase
          value={editedBody}
          onChange={(event) => {
            setEditedBody(event.target.value)
          }}
          fullWidth
          multiline
          className={!props.editMode ? classes.hide : undefined}
        />
        <Typography className={props.editMode ? classes.hide : undefined}>
          {props.currentRecipeID && currentRecipeInfo
            ? currentRecipeInfo.body
            : ""}
        </Typography>
      </div>
    </>
  )
}
