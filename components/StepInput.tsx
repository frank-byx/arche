import React, { Dispatch } from "react"
import { Button, createStyles, Grid, makeStyles } from "@material-ui/core"
import { Ingredient, Step, RecipeAction } from "../src/recipe"
import IngredientInput from "./IngredientInput"
import StepDescriptionInput from "./StepDescriptionInput"

type Props = {
  stepIndex: number
  editedStep: Step
  editedRecipeDispatch: Dispatch<RecipeAction>
}

const useStyles = makeStyles((theme) =>
  createStyles({
    stepInput: {
      marginBottom: theme.spacing(5),
    },
  })
)

export default function StepInput(props: Props) {
  const stepDescriptionInputProps = {
    stepIndex: props.stepIndex,
    editedStepDescription: props.editedStep.description,
    editedRecipeDispatch: props.editedRecipeDispatch,
  }

  const ingredientInputProps = (ingredient: Ingredient, index: number) => {
    return {
      stepIndex: props.stepIndex,
      ingredientIndex: index,
      editedIngredient: ingredient,
      editedRecipeDispatch: props.editedRecipeDispatch,
    }
  }

  const handleAddIngredient = () => {
    props.editedRecipeDispatch({
      type: "createIngredient",
      stepIndex: props.stepIndex,
    })
  }

  const handleDeleteStep = () => {
    props.editedRecipeDispatch({
      type: "deleteStep",
      stepIndex: props.stepIndex,
    })
  }

  const classes = useStyles(props)
  return (
    <Grid
      item
      container
      direction="column"
      spacing={2}
      className={classes.stepInput}
    >
      {props.editedStep.ingredients.map(
        (ingredient: Ingredient, index: number) => (
          <IngredientInput
            key={index}
            {...ingredientInputProps(ingredient, index)}
          />
        )
      )}
      <Grid item>
        <Button variant="outlined" onClick={handleAddIngredient}>
          Add Ingredient
        </Button>
      </Grid>
      <StepDescriptionInput {...stepDescriptionInputProps} />
      <Grid item>
        <Button variant="outlined" onClick={handleDeleteStep}>
          Delete Step
        </Button>
      </Grid>
    </Grid>
  )
}
