import { RecipeLogQuery } from "../generated/graphql"
import Urql from "urql"
import { Dispatch, useReducer } from "react"

export type Ingredient = {
  quantity: number
  unit: string
  name: string
}

export type Step = {
  ingredients: Ingredient[]
  description: string
}

export type Recipe = {
  title: string
  steps: Step[]
}

function defaultNewIngredient(): Ingredient {
  return {
    quantity: 1,
    unit: "",
    name: "",
  }
}

function defaultNewStep(): Step {
  return {
    ingredients: [defaultNewIngredient()],
    description: "",
  }
}

export function defaultNewRecipe(): Recipe {
  return {
    title: "New Recipe",
    steps: [defaultNewStep()],
  }
}

export function parseRecipeLogQueryResults([
  recipeLogQueryResults,
]: Urql.UseQueryResponse<RecipeLogQuery, object>): Recipe {
  return {
    title: recipeLogQueryResults.data?.recipeLog?.title,
    steps: recipeLogQueryResults.data?.recipeLog?.body
      ? JSON.parse(recipeLogQueryResults.data?.recipeLog?.body).steps
      : [],
  }
}

export type RecipeAction =
  | {
      type: "setRecipe"
      newRecipe: Recipe
    }
  | {
      type: "initRecipe"
    }
  | {
      type: "setTitle"
      newTitle: string
    }
  | {
      type: "createStep"
    }
  | {
      type: "deleteStep"
      stepIndex: number
    }
  | {
      type: "setStepDescription"
      stepIndex: number
      newDescription: string
    }
  | {
      type: "createIngredient"
      stepIndex: number
    }
  | {
      type: "deleteIngredient"
      stepIndex: number
      ingredientIndex: number
    }
  | {
      type: "setIngredientQuantity"
      stepIndex: number
      ingredientIndex: number
      newQuantity: number
    }
  | {
      type: "setIngredientUnit"
      stepIndex: number
      ingredientIndex: number
      newUnit: string
    }
  | {
      type: "setIngredientName"
      stepIndex: number
      ingredientIndex: number
      newName: string
    }

function reducer(state: Recipe, action: RecipeAction): Recipe {
  switch (action.type) {
    case "setRecipe": {
      return JSON.parse(JSON.stringify(action.newRecipe))
    }
    case "initRecipe": {
      return defaultNewRecipe()
    }
    case "setTitle": {
      return { ...state, title: action.newTitle }
    }
    case "createStep": {
      return { ...state, steps: state.steps.concat([defaultNewStep()]) }
    }
    case "deleteStep": {
      const newSteps = [...state.steps]
      newSteps.splice(action.stepIndex, 1)
      return { ...state, steps: newSteps }
    }
    case "setStepDescription": {
      const newSteps = [...state.steps]
      newSteps.splice(action.stepIndex, 1, {
        ...state.steps[action.stepIndex],
        description: action.newDescription,
      })
      return { ...state, steps: newSteps }
    }
    case "createIngredient": {
      const newIngredients = state.steps[action.stepIndex].ingredients.concat([
        defaultNewIngredient(),
      ])
      const newSteps = [...state.steps]
      newSteps.splice(action.stepIndex, 1, {
        ...state.steps[action.stepIndex],
        ingredients: newIngredients,
      })
      return { ...state, steps: newSteps }
    }
    case "deleteIngredient": {
      const newIngredients = [...state.steps[action.stepIndex].ingredients]
      newIngredients.splice(action.ingredientIndex, 1)
      const newSteps = [...state.steps]
      newSteps.splice(action.stepIndex, 1, {
        ...state.steps[action.stepIndex],
        ingredients: newIngredients,
      })
      return { ...state, steps: newSteps }
    }
    case "setIngredientQuantity": {
      const newIngredients = [...state.steps[action.stepIndex].ingredients]
      newIngredients.splice(action.ingredientIndex, 1, {
        ...state.steps[action.stepIndex].ingredients[action.ingredientIndex],
        quantity: action.newQuantity,
      })
      const newSteps = [...state.steps]
      newSteps.splice(action.stepIndex, 1, {
        ...state.steps[action.stepIndex],
        ingredients: newIngredients,
      })
      return { ...state, steps: newSteps }
    }
    case "setIngredientUnit": {
      const newIngredients = [...state.steps[action.stepIndex].ingredients]
      newIngredients.splice(action.ingredientIndex, 1, {
        ...state.steps[action.stepIndex].ingredients[action.ingredientIndex],
        unit: action.newUnit,
      })
      const newSteps = [...state.steps]
      newSteps.splice(action.stepIndex, 1, {
        ...state.steps[action.stepIndex],
        ingredients: newIngredients,
      })
      return { ...state, steps: newSteps }
    }
    case "setIngredientName": {
      const newIngredients = [...state.steps[action.stepIndex].ingredients]
      newIngredients.splice(action.ingredientIndex, 1, {
        ...state.steps[action.stepIndex].ingredients[action.ingredientIndex],
        name: action.newName,
      })
      const newSteps = [...state.steps]
      newSteps.splice(action.stepIndex, 1, {
        ...state.steps[action.stepIndex],
        ingredients: newIngredients,
      })
      return { ...state, steps: newSteps }
    }
    default: {
      return state
    }
  }
}

const initialState: Recipe = {
  title: "",
  steps: [],
}

export default function useRecipeReducer(): [Recipe, Dispatch<RecipeAction>] {
  return useReducer(reducer, initialState)
}
