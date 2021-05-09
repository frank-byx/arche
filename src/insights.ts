import { useAllRecipeBodiesQuery } from "../generated/graphql"
import { Recipe, Step } from "./recipe"

function setUnion<T>(A: Set<T>, B: Set<T>) {
  let union = new Set(A)
  B.forEach((e) => {
    union.add(e)
  })
  return union
}

function setMinus<T>(A: Set<T>, e: T) {
  let diff = new Set(A)
  diff.delete(e)
  return diff
}

function setDiff<T>(A: Set<T>, B: Set<T>) {
  let diff = new Set(A)
  B.forEach((e) => {
    diff.delete(e)
  })
  return diff
}

function useIngredientGraph(): Map<string, Set<string>> {
  const ingredientGraph = new Map<string, Set<string>>()
  const [allRecipeBodiesQueryResults] = useAllRecipeBodiesQuery()
  const recipeBodies = allRecipeBodiesQueryResults.data
    ? allRecipeBodiesQueryResults.data?.recipeLogs
    : []
  for (let recipeBody of recipeBodies) {
    const steps: Step[] = recipeBody.body
      ? JSON.parse(recipeBody.body).steps
      : []
    const recipeIngredients = new Set<string>()
    for (let step of steps) {
      for (let ing of step.ingredients) {
        if (ing.name != "") {
          recipeIngredients.add(ing.name)
        }
      }
    }
    recipeIngredients.forEach((ing) => {
      ingredientGraph.set(
        ing,
        setUnion(ingredientGraph.get(ing), setMinus(recipeIngredients, ing))
      )
    })
  }
  return ingredientGraph
}

export function useSuggestedIngredients(recipe: Recipe): string[] {
  const ingredientGraph = useIngredientGraph()
  const recipeIngredients = new Set<string>()
  for (let step of recipe.steps) {
    for (let ing of step.ingredients) {
      if (ing.name != "") {
        recipeIngredients.add(ing.name)
      }
    }
  }
  var suggestedIngredients = new Set<string>()
  recipeIngredients.forEach((ing) => {
    suggestedIngredients = setUnion(
      suggestedIngredients,
      ingredientGraph.get(ing) ? ingredientGraph.get(ing) : new Set<string>()
    )
  })
  suggestedIngredients = setDiff(suggestedIngredients, recipeIngredients)
  return Array.from(suggestedIngredients)
}

export function ingredientsIn(recipe: Recipe): string[] {
  const recipeIngredients = new Set<string>()
  for (let step of recipe.steps) {
    for (let ing of step.ingredients) {
      if (ing.name != "") {
        recipeIngredients.add(ing.name)
      }
    }
  }
  return Array.from(recipeIngredients)
}

export function useIngredientFrequencies(): Map<string, number> {
  const ingredientFrequencies = new Map<string, number>()
  const [allRecipeBodiesQueryResults] = useAllRecipeBodiesQuery()
  const recipeBodies = allRecipeBodiesQueryResults.data
    ? allRecipeBodiesQueryResults.data?.recipeLogs
    : []
  for (let recipeBody of recipeBodies) {
    const steps: Step[] = recipeBody.body
      ? JSON.parse(recipeBody.body).steps
      : []

    for (let step of steps) {
      for (let ing of step.ingredients) {
        if (ing.name != "") {
          ingredientFrequencies.set(
            ing.name,
            ingredientFrequencies.get(ing.name)
              ? ingredientFrequencies.get(ing.name) + 1
              : 1
          )
        }
      }
    }
  }
  return ingredientFrequencies
}
