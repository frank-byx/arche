import React from "react"
import Head from "next/head"
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Button,
  ButtonGroup,
  Divider,
} from "@material-ui/core"
import {
  ChevronLeft,
  Search,
  Menu,
  Edit,
  Save,
  Close,
  Delete,
  Info,
  Cancel,
  Add,
} from "@material-ui/icons"
import { fade } from "@material-ui/core/styles"
import clsx from "clsx"
import {
  useRecipeSearchQuery,
  useRecipeInfoQuery,
  useUpdateRecipeMutation,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
} from "../generated/graphql"

const DRAWER_WIDTH = 512

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      overflow: "hidden",
      flexgrow: 1,
    },
    hide: {
      display: "none",
    },
    appBar: {
      backgroundColor: theme.palette.primary.dark,
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      overflow: "hidden",
    },
    headerPlaceholder: {
      ...theme.mixins.toolbar,
    },
    stickyDrawerHeader: {
      display: "flex",
      position: "fixed",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      backgroundColor: theme.palette.primary.main,
      zIndex: 1101,
      color: "white",
      width: DRAWER_WIDTH,
      justifyContent: "left",
    },
    drawerBody: {
      overflowY: "auto",
      paddingLeft: theme.spacing(1),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: -DRAWER_WIDTH,
    },
    contentShift: {
      marginLeft: 0,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: "100%",
      margin: theme.spacing(0, 1),
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1),
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    },
  })
)

export default function RecipeLog() {
  const classes = useStyles()
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(true)
  const [editMode, setEditMode] = React.useState(false)
  const [currentRecipe, setCurrentRecipe] = React.useState("")
  const [editedTitle, setEditedTitle] = React.useState("")
  const [editedBody, setEditedBody] = React.useState("")
  const [searchString, setSearchString] = React.useState("")
  const [searchResults] = useRecipeSearchQuery({
    variables: { contains: searchString },
  })
  if (searchResults.error) {
    return <p>Error: {searchResults.error.message}</p>
  }

  const [recipeInfoResults] = useRecipeInfoQuery({
    variables: { id: currentRecipe },
  })
  if (recipeInfoResults.error) {
    return <p>Error: {recipeInfoResults.error.message}</p>
  }

  const [updateRecipeResults, updateRecipe] = useUpdateRecipeMutation()
  const [createRecipeResults, createRecipe] = useCreateRecipeMutation()
  const [deleteRecipeResults, deleteRecipe] = useDeleteRecipeMutation()

  return (
    <div>
      <Head>
        <title>Recipe Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerIsOpen,
          })}
          elevation={0}
        >
          <Toolbar className={classes.toolbar}>
            <div>
              <IconButton
                onClick={() => {
                  setDrawerIsOpen(true)
                }}
                className={clsx(
                  classes.menuButton,
                  drawerIsOpen && classes.hide
                )}
                edge="start"
                color="inherit"
              >
                <Search />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDrawerIsOpen(false)
                }}
                className={clsx(
                  classes.menuButton,
                  !drawerIsOpen && classes.hide
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
            <Typography className={editMode && classes.hide}>
              {currentRecipe && recipeInfoResults.data?.recipe
                ? recipeInfoResults.data?.recipe.title
                : ""}
            </Typography>
            <InputBase
              value={editedTitle}
              onChange={(event) => {
                setEditedTitle(event.target.value)
              }}
              className={!editMode && classes.hide}
              inputProps={{ style: { color: "white" } }}
            />
            <div className={!recipeInfoResults.data?.recipe && classes.hide}>
              <div className={editMode && classes.hide}>
                <IconButton color="inherit">
                  <Info />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setEditedTitle(recipeInfoResults.data?.recipe.title)
                    setEditedBody(recipeInfoResults.data?.recipe.body)
                    setEditMode(true)
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    deleteRecipe({ id: currentRecipe }).then(() => {
                      setCurrentRecipe("")
                    })
                  }}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setCurrentRecipe("")
                  }}
                >
                  <Close />
                </IconButton>
              </div>
              <div className={!editMode && classes.hide}>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    updateRecipe({
                      id: currentRecipe,
                      title: editedTitle,
                      body: editedBody,
                    })
                    setEditMode(false)
                  }}
                >
                  <Save />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setEditMode(false)
                  }}
                >
                  <Cancel />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerIsOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.headerPlaceholder} />
          <div className={classes.stickyDrawerHeader}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <form>
                <InputBase
                  placeholder="Search Recipes…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={searchString}
                  onChange={(event) => {
                    setSearchString(event.target.value)
                  }}
                />
              </form>
            </div>
          </div>
          <div className={classes.drawerBody}>
            <List>
              {searchResults.data?.recipes.map((recipe) => (
                <ListItem
                  button
                  key={recipe.id}
                  onClick={() => {
                    setEditMode(false)
                    setCurrentRecipe(recipe.id)
                  }}
                >
                  <ListItemText primary={recipe.title} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerIsOpen,
          })}
        >
          <div className={classes.headerPlaceholder} />
          <InputBase
            value={editedBody}
            onChange={(event) => {
              setEditedBody(event.target.value)
            }}
            fullWidth
            multiline
            className={!editMode && classes.hide}
          />
          <Typography className={editMode && classes.hide}>
            {currentRecipe && recipeInfoResults.data?.recipe
              ? recipeInfoResults.data?.recipe.body
              : ""}
          </Typography>
        </main>
      </div>
    </div>
  )
}
