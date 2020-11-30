import React from "react"
import { makeStyles, Theme, createStyles, InputBase } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import { fade } from "@material-ui/core/styles"

type Props = {
  searchString: string
  setSearchString(searchString: string): any
  drawerWidth: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBarPlaceholder: {
      ...theme.mixins.toolbar,
    },
    searchBar: {
      display: "flex",
      position: "fixed",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      backgroundColor: theme.palette.primary.main,
      zIndex: 1101,
      color: "white",
      justifyContent: "left",
      width: (props: Props) => props.drawerWidth,
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

export default function SearchBar(props: Props) {
  const classes = useStyles(props)
  const handleSearchStringChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setSearchString(event.target.value)
  }

  return (
    <>
      <div className={classes.searchBarPlaceholder} />
      <div className={classes.searchBar}>
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
            value={props.searchString}
            onChange={handleSearchStringChange}
          />
        </div>
      </div>
    </>
  )
}
