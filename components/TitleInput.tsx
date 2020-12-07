import {
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core"
import { Dispatch } from "react"
import { RecipeAction } from "../src/recipe"

type Props = {
  editedTitle: string
  editedRecipeDispatch: Dispatch<RecipeAction>
}

function handleEditTitle(props: Props) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    props.editedRecipeDispatch({
      type: "setTitle",
      newTitle: event.target.value,
    })
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleInput: {
      marginBottom: theme.spacing(4),
    },
  })
)

export default function TitleInput(props: Props) {
  const classes = useStyles()
  return (
    <Grid item container alignItems="stretch" direction="column">
      <TextField
        className={classes.titleInput}
        variant="outlined"
        label="Title"
        value={props.editedTitle}
        onChange={handleEditTitle(props)}
      />
    </Grid>
  )
}
