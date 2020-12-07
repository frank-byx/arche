import { Button, Grid } from "@material-ui/core"
import React, { Dispatch } from "react"
import TitleInput from "./TitleInput"
import StepInput from "./StepInput"
import { Recipe, RecipeAction, Step } from "../src/recipe"

type Props = {
  editedRecipe: Recipe
  editedRecipeDispatch: Dispatch<RecipeAction>
}

export default function RecipeInput(props: Props) {
  const titleInputProps = {
    editedTitle: props.editedRecipe.title,
    editedRecipeDispatch: props.editedRecipeDispatch,
  }

  const stepInputProps = (step: Step, index: number) => {
    return {
      stepIndex: index,
      editedStep: step,
      editedRecipeDispatch: props.editedRecipeDispatch,
    }
  }

  const handleAddStep = () => {
    props.editedRecipeDispatch({
      type: "createStep",
    })
  }

  return (
    <Grid container direction="column" spacing={2}>
      <TitleInput {...titleInputProps} />
      {props.editedRecipe.steps.map((step: Step, index: number) => (
        <StepInput key={index} {...stepInputProps(step, index)} />
      ))}
      <Grid item>
        <Button variant="outlined" onClick={handleAddStep}>
          Add Step
        </Button>
      </Grid>
    </Grid>
  )
}
