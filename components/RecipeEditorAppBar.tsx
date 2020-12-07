import React, { Dispatch } from "react"
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
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
  useUpdateRecipeLogMutation,
  useCreateRecipeLogMutation,
  useDeleteRecipeLogMutation,
} from "../generated/graphql"
import { Recipe, RecipeAction, defaultNewRecipe } from "../src/recipe"

type Props = {
  drawerIsOpen: boolean
  setDrawerIsOpen(drawerIsOpen: boolean): any
  drawerWidth: number
  currentRecipeID: string
  setCurrentRecipeID(currentRecipeID: string): any
  editMode: boolean
  setEditMode(editMode: boolean): any
  editedRecipe: Recipe
  editedRecipeDispatch: Dispatch<RecipeAction>
  currentRecipe: Recipe
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
  const [updateRecipeLogResults, updateRecipeLog] = useUpdateRecipeLogMutation()
  const [createRecipeLogResults, createRecipeLog] = useCreateRecipeLogMutation()
  const [deleteRecipeLogResults, deleteRecipeLog] = useDeleteRecipeLogMutation()
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
              createRecipeLog({
                title: defaultNewRecipe().title,
                body: JSON.stringify({ steps: defaultNewRecipe().steps }),
              }) //.then((results) => { <switch display to new recipe> })
            }}
          >
            New Recipe
          </Button>
        </div>
        <Typography>
          {props.currentRecipeID && props.currentRecipe
            ? props.currentRecipe.title
            : ""}
        </Typography>
        <div className={!props.currentRecipe ? classes.hide : undefined}>
          <div className={props.editMode ? classes.hide : undefined}>
            <IconButton color="inherit">
              <Info />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                props.editedRecipeDispatch({
                  type: "setRecipe",
                  newRecipe: props.currentRecipe,
                })
                props.setEditMode(true)
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                deleteRecipeLog({ id: props.currentRecipeID }).then(() => {
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
                updateRecipeLog({
                  id: props.currentRecipeID,
                  title: props.editedRecipe.title,
                  body: JSON.stringify({ steps: props.editedRecipe.steps }),
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
