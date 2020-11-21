import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Arches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          - Arches -
        </h1>

        <div className={styles.grid}>
          <Link href="/recipeLog"><a>
            <h3 className={styles.card}>
            Recipe Log
            </h3>
          </a></Link>
          <Link href="/"><a>
            <h3 className={styles.card}>
            Flavor Combinator
            </h3>
          </a></Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="/"><a className={styles.card}>Login</a></Link>
      </footer>
    </div>
  )
}
