import React, { useReducer } from "react"
import { useAllRecipesQuery } from "../generated/graphql"
import styles from "../styles/Home.module.css"

type RecipesData = {
    recipes: {
        id: string
        title: string
        body: string
    }[]
}

const AllRecipes: React.FC = () => {
    const [result] = useAllRecipesQuery()
    const { data, fetching, error } = result

    if (fetching) {
        return <p>Fetching</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }
    return (
        <div>
            {/*<p>Results Displayed: {data?.recipes.length}</p>*/}
            <ul className={styles.container_list}>
                {data?.recipes.map(recipe => (
                    <li key={recipe.id} className={styles.card}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllRecipes