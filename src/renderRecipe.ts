import latex from "node-latex"
import { Recipe } from "./recipe"

function generateLatex(recipe: Recipe): string {
  return `
    \\documentclass{article}
    \\usepackage[nonumber]{cuisine}
    \\usepackage[margin=0.5in]{geometry}
    \\RecipeWidths{\\textwidth}{0cm}{1cm}{4cm}{1cm}{1cm}

    \\begin{document}
    \\begin{recipe}{${recipe.title}}{}{}
    ${recipe.steps
      .map((step) =>
        step.ingredients
          .map(
            (ingredient) =>
              `\\ing[${ingredient.quantity}]{${ingredient.unit}}{${ingredient.name}}`
          )
          .concat(step.ingredients.length ? [] : ["\\newstep"])
          .concat([step.description])
          .join("\n")
      )
      .join("\n")}
    \\end{recipe}
    \\end{document}
    `
}

function toBase64(stream: any): Promise<string> {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: any) => chunks.push(chunk))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")))
  })
}

export default async function renderRecipe(recipe: Recipe): Promise<string> {
  return toBase64(latex(generateLatex(recipe)))
}
