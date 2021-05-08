import { Button, Grid, Typography } from "@material-ui/core"
import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Arches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Link href="/recipeLogger">
              <Button
                variant="contained"
                color="primary"
                style={{ minWidth: "30vw" }}
              >
                <h3>Recipe Logger</h3>
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/">
              <Button
                variant="contained"
                color="primary"
                style={{ minWidth: "30vw" }}
              >
                <h3>Insights</h3>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
