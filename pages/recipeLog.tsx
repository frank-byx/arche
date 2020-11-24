import Head from "next/head"
import AllRecipes from "../components/AllRecipes"
import { Typography } from "@material-ui/core"

export default function RecipeLog() {
  return (
    <div>
      <Head>
        <title>Recipe Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography>Recipe Log:</Typography>
        <AllRecipes />
      </main>
    </div>
  )
}
