import { Grid, TextField } from "@material-ui/core"
import { Dispatch } from "react"
import { RecipeAction } from "../src/recipe"

type Props = {
  stepIndex: number
  editedStepDescription: string
  editedRecipeDispatch: Dispatch<RecipeAction>
}

function handleEditStepDescription(props: Props) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    props.editedRecipeDispatch({
      type: "setStepDescription",
      stepIndex: props.stepIndex,
      newDescription: event.target.value,
    })
  }
}

export default function StepDescriptionInput(props: Props) {
  return (
    <Grid item container direction="column" alignItems="stretch">
      <TextField
        multiline
        rows={3}
        variant="outlined"
        label={"Step " + (props.stepIndex + 1)}
        value={props.editedStepDescription}
        onChange={handleEditStepDescription(props)}
      />
    </Grid>
  )
}
