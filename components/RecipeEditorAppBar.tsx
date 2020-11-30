import React from "react"
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  InputBase,
  Button,
} from "@material-ui/core"
import {
  ChevronLeft,
  Search,
  Edit,
  Save,
  Close,
  Delete,
  Info,
  Cancel,
} from "@material-ui/icons"
import clsx from "clsx"
import {
  useUpdateRecipeMutation,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
} from "../generated/graphql"
import { Recipe } from "@prisma/client"

type Props = {
  drawerIsOpen: boolean
  setDrawerIsOpen(drawerIsOpen: boolean): any
  drawerWidth: number
  currentRecipeID: string
  setCurrentRecipeID(currentRecipeID: string): any
  editMode: boolean
  setEditMode(editMode: boolean): any
  editedTitle: string
  setEditedTitle(editedTitle: string): any
  editedBody: string
  setEditedBody(editedBody: string): any
  currentRecipeInfo: Recipe
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: "none",
    },
    appBar: {
      backgroundColor: theme.palette.primary.dark,
    },
    appBarShift: {
      width: (props: Props) => `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: (props: Props) => props.drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
)

export default function RecipeEditorAppBar(props: Props) {
  const classes = useStyles(props)
  const [updateRecipeResults, updateRecipe] = useUpdateRecipeMutation()
  const [createRecipeResults, createRecipe] = useCreateRecipeMutation()
  const [deleteRecipeResults, deleteRecipe] = useDeleteRecipeMutation()
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.drawerIsOpen,
      })}
      elevation={0}
    >
      <Toolbar className={classes.toolbar}>
        <div>
          <IconButton
            onClick={() => {
              props.setDrawerIsOpen(true)
            }}
            className={clsx(
              classes.menuButton,
              props.drawerIsOpen && classes.hide
            )}
            edge="start"
            color="inherit"
          >
            <Search />
          </IconButton>
          <IconButton
            onClick={() => {
              props.setDrawerIsOpen(false)
            }}
            className={clsx(
              classes.menuButton,
              !props.drawerIsOpen ? classes.hide : undefined
            )}
            edge="start"
            color="inherit"
          >
            <ChevronLeft />
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              createRecipe({
                title: "New Recipe",
                body: "",
              }).then((results) => {})
            }}
          >
            New Recipe
          </Button>
        </div>
        <Typography className={props.editMode ? classes.hide : undefined}>
          {props.currentRecipeID && props.currentRecipeInfo
            ? props.currentRecipeInfo.title
            : ""}
        </Typography>
        <InputBase
          value={props.editedTitle}
          onChange={(event) => {
            props.setEditedTitle(event.target.value)
          }}
          className={!props.editMode ? classes.hide : undefined}
          inputProps={{ style: { color: "white" } }}
        />
        <div className={!props.currentRecipeInfo ? classes.hide : undefined}>
          <div className={props.editMode ? classes.hide : undefined}>
            <IconButton color="inherit">
              <Info />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                props.setEditedTitle(props.currentRecipeInfo.title)
                props.setEditedBody(props.currentRecipeInfo.body)
                props.setEditMode(true)
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                deleteRecipe({ id: props.currentRecipeID }).then(() => {
                  props.setCurrentRecipeID("")
                })
              }}
            >
              <Delete />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                props.setCurrentRecipeID("")
              }}
            >
              <Close />
            </IconButton>
          </div>
          <div className={!props.editMode ? classes.hide : undefined}>
            <IconButton
              color="inherit"
              onClick={() => {
                updateRecipe({
                  id: props.currentRecipeID,
                  title: props.editedTitle,
                  body: props.editedBody,
                })
                props.setEditMode(false)
              }}
            >
              <Save />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                props.setEditMode(false)
              }}
            >
              <Cancel />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}
