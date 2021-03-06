import {
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import React, { Dispatch } from "react"
import { Ingredient, RecipeAction } from "../src/recipe"

type Props = {
  stepIndex: number
  ingredientIndex: number
  editedIngredient: Ingredient
  editedRecipeDispatch: Dispatch<RecipeAction>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quantityTextField: {
      width: theme.spacing(15),
    },
    unitTextField: {
      width: theme.spacing(20),
    },
    nameTextField: {
      width: theme.spacing(50),
    },
  })
)

export default function IngredientInput(props: Props) {
  const classes = useStyles(props)

  const handleChangeQuantity = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    props.editedRecipeDispatch({
      type: "setIngredientQuantity",
      stepIndex: props.stepIndex,
      ingredientIndex: props.ingredientIndex,
      newQuantity: event.target.value as number,
    })
  }

  const handleChangeUnit = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.editedRecipeDispatch({
      type: "setIngredientUnit",
      stepIndex: props.stepIndex,
      ingredientIndex: props.ingredientIndex,
      newUnit: event.target.value as string,
    })
  }

  const handleChangeName = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.editedRecipeDispatch({
      type: "setIngredientName",
      stepIndex: props.stepIndex,
      ingredientIndex: props.ingredientIndex,
      newName: event.target.value as string,
    })
  }

  const handleDeleteIngredient = () => {
    props.editedRecipeDispatch({
      type: "deleteIngredient",
      stepIndex: props.stepIndex,
      ingredientIndex: props.ingredientIndex,
    })
  }

  return (
    <Grid item container spacing={2}>
      <Grid item>
        <TextField
          className={classes.quantityTextField}
          variant="outlined"
          type="number"
          label="Quantity"
          value={props.editedIngredient.quantity}
          onChange={handleChangeQuantity}
        />
      </Grid>

      <Grid item>
        <TextField
          className={classes.unitTextField}
          variant="outlined"
          label="Unit"
          value={props.editedIngredient.unit}
          onChange={handleChangeUnit}
        />
      </Grid>

      <Grid item>
        <TextField
          className={classes.nameTextField}
          variant="outlined"
          label="Name"
          value={props.editedIngredient.name}
          onChange={handleChangeName}
        />
      </Grid>

      <Grid item>
        <IconButton onClick={handleDeleteIngredient}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}
