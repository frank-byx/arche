import { PrismaClient } from "@prisma/client"
import { Recipe } from "../../../src/recipe"
import renderRecipe from "../../../src/renderRecipe"

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  renderRecipe(recipe: Recipe): Promise<string>
}

export function createContext(): Context {
  return { prisma, renderRecipe }
}
