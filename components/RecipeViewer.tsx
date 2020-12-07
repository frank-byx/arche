import { useRenderRecipeLogQuery } from "../generated/graphql"
import React from "react"
import dynamic from "next/dynamic"

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false })

type Props = {
  currentRecipeID: string
}

export default function RecipeViewer(props: Props) {
  const currentRecipeRender: string = useRenderRecipeLogQuery({
    variables: { id: props.currentRecipeID },
  })[0].data?.recipeLog?.render

  return (
    <PdfViewer url={`data:application/pdf;base64,${currentRecipeRender}`} />
  )
}
