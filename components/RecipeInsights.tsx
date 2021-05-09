import { useRecipeLogQuery } from "../generated/graphql"
import React from "react"
import { parseRecipeLogQueryResults, Recipe } from "../src/recipe"
import {
  ingredientsIn,
  useIngredientFrequencies,
  useSuggestedIngredients,
} from "../src/insights"
import {
  Card,
  CardContent,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core"

type Props = {
  currentRecipeID: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      marginBottom: theme.spacing(5),
    },
  })
)

export default function RecipeInsights(props: Props) {
  const classes = useStyles()
  const currentRecipe: Recipe = parseRecipeLogQueryResults(
    useRecipeLogQuery({
      variables: { id: props.currentRecipeID },
    })
  )
  const ingredientFrequencies: Map<string, number> = useIngredientFrequencies()
  const suggestedIngredients: string[] = useSuggestedIngredients(currentRecipe)
  const ingredients: string[] = ingredientsIn(currentRecipe)

  return props.currentRecipeID ? (
    <List>
      <ListItem className={classes.listItem}>
        <Typography variant="h5">Ingredients used in this recipe:</Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Grid container spacing={3}>
          {ingredients.map((ing) => (
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5">{ing}</Typography>
                  <Typography color="textSecondary">
                    Used in{" "}
                    {ingredientFrequencies.get(ing) != 1
                      ? ingredientFrequencies.get(ing) - 1
                      : "no"}{" "}
                    other recipe{ingredientFrequencies.get(ing) != 2 ? "s" : ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h5">
          Have you considered adding the following ingredients to this recipe?:
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Grid container spacing={3}>
          {suggestedIngredients.map((ing) => (
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5">{ing}</Typography>
                  <Typography color="textSecondary">
                    Used in {ingredientFrequencies.get(ing)} recipe
                    {ingredientFrequencies.get(ing) != 1 ? "s" : ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ListItem>
    </List>
  ) : (
    <div />
  )
}
