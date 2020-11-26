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
} from "@material-ui/core"
import { ChevronLeft, Search, Menu } from "@material-ui/icons"
import { fade } from "@material-ui/core/styles"
import clsx from "clsx"
import { useAllRecipesQuery } from "../generated/graphql"

const DRAWER_WIDTH = 300

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      overflow: "hidden",
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
      overflowY: "scroll",
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
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false)
  const [{ data, fetching, error }] = useAllRecipesQuery()

  if (fetching) {
    return <p>Fetching</p>
  }
  if (error) {
    return <p>Error: {error.message}</p>
  }

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
          <Toolbar>
            <IconButton
              onClick={() => {
                setDrawerIsOpen(true)
              }}
              className={clsx(classes.menuButton, drawerIsOpen && classes.hide)}
              edge="start"
              color="inherit"
            >
              <Menu />
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
            <Typography>INSERT RECIPE NAME</Typography>
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
              <InputBase
                placeholder="Search Recipes…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <div className={classes.drawerBody}>
            <List>
              {data?.recipes.map((recipe) => (
                <ListItem button key={recipe.id}>
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
            defaultValue="Lorem ipsum dolor sit amet."
            fullWidth
            multiline
          />
        </main>
      </div>
    </div>
  )
}
