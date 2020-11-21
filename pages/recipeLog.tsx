import Head from "next/head"
import Link from "next/link"
import AllRecipes from "../components/Recipes"
import styles from "../styles/Home.module.css"

export default function RecipeLog() {
    return (
        <div className={styles.container}>
          <Head>
            <title>Recipe Log</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className={styles.main}>
            <h1 className={styles.title}>
              - Recipe Log -
            </h1>
            <AllRecipes/>
          </main>
    
          <footer className={styles.footer}>
            <Link href="/"><a className={styles.card}>Login</a></Link>
          </footer>
        </div>
      )
}