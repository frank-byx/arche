import { Recipe } from "../src/recipe"
import { PrismaClient } from "@prisma/client"

const tomato_sauce: Recipe = {
  title: "Tomato Sauce",
  steps: [
    {
      ingredients: [
        {
          quantity: 2,
          unit: "tbsp",
          name: "olive oil",
        },
        {
          quantity: 1,
          unit: "medium",
          name: "onion",
        },
        {
          quantity: 1,
          unit: "small",
          name: "carrot",
        },
        {
          quantity: 1,
          unit: "small stalk",
          name: "celery",
        },
      ],
      description:
        "Heat olive oil in a large wide skillet on medium heat. Add the chopped onion, carrot, celery and parsley. Stir to coat. Reduce the heat to low, cover the skillet and cook for 15 to 20 minutes, stirring occasionally until the vegetables are softened and cooked through.",
    },
    {
      ingredients: [
        {
          quantity: 2,
          unit: "cloves",
          name: "garlic",
        },
      ],
      description:
        "Remove cover and add the minced garlic. Increase the heat to medium high. Cook for garlic for 30 seconds.",
    },
    {
      ingredients: [
        {
          quantity: 2,
          unit: "lbs",
          name: "tomato",
        },
        {
          quantity: 1,
          unit: "tsp",
          name: "salt",
        },
        {
          quantity: 2,
          unit: "tsp",
          name: "black pepper",
        },
      ],
      description:
        "Add the tomatoes, including the juice and shredding them with your fingers if you are using canned whole tomatoes. Season with salt and pepper. Bring to a low simmer, reduce the heat to low and cook, uncovered until thickened, about 15 minutes.",
    },
    {
      ingredients: [],
      description:
        "If you want you can push the sauce through a food mill, or puree it in a blender or with an immersion blender, to give it a smooth consistency.",
    },
  ],
}

const sofrito: Recipe = {
  title: "Sofrito",
  steps: [
    {
      ingredients: [
        {
          quantity: 3,
          unit: "large",
          name: "red bell pepper",
        },
        {
          quantity: 1,
          unit: "",
          name: "habanero pepper",
        },
        {
          quantity: 3,
          unit: "medium",
          name: "tomato",
        },
        {
          quantity: 4,
          unit: "medium",
          name: "onion",
        },
        {
          quantity: 3,
          unit: "heads",
          name: "garlic",
        },
        {
          quantity: 25,
          unit: "stems",
          name: "cilantro",
        },
        {
          quantity: 1,
          unit: "tbsp",
          name: "salt",
        },
        {
          quantity: 1,
          unit: "tbsp",
          name: "black pepper",
        },
      ],
      description:
        "In a food processor, red peppers, habanero peppers, tomatoes, onions, and garlic. Add cilantro, salt, and pepper. Process to the consistency of semi-chunky salsa (not watery). Place in a resealable plastic freezer bag, and use as needed, or freeze in portions.",
    },
  ],
}

const curry_sauce: Recipe = {
  title: "Curry Sauce",
  steps: [
    {
      ingredients: [
        {
          quantity: 2,
          unit: "tbsp",
          name: "olive oil",
        },
        {
          quantity: 1,
          unit: "medium",
          name: "onion",
        },
        {
          quantity: 3,
          unit: "cloves",
          name: "garlic",
        },
        {
          quantity: 20,
          unit: "g",
          name: "ginger",
        },
      ],
      description:
        "In a large pot over medium-high heat, heat oil. Add onion and cook until soft, 5 minutes. Stir in garlic and ginger and cook until fragrant, 1 minute.",
    },
    {
      ingredients: [
        {
          quantity: 2,
          unit: "tbsp",
          name: "garam masala",
        },
        {
          quantity: 1,
          unit: "can",
          name: "tomato",
        },
        {
          quantity: 1,
          unit: "cup",
          name: "chicken broth",
        },
      ],
      description:
        "Add garam masala and cook until very fragrant, 1 minute. Add tomatoes and broth and bring to a simmer.",
    },
    {
      ingredients: [
        {
          quantity: 8,
          unit: "tbsp",
          name: "heavy cream",
        },
        {
          quantity: 1,
          unit: "tsp",
          name: "salt",
        },
        {
          quantity: 2,
          unit: "tsp",
          name: "black pepper",
        },
      ],
      description:
        "Remove from heat. Stir in heavy cream, and season with salt and pepper.",
    },
  ],
}

const minestrone_soup: Recipe = {
  title: "Minestrone Soup",
  steps: [
    {
      ingredients: [
        {
          quantity: 3,
          unit: "tbsp",
          name: "olive oil",
        },
        {
          quantity: 1,
          unit: "medium",
          name: "onion",
        },
        {
          quantity: 2,
          unit: "medium",
          name: "carrot",
        },
        {
          quantity: 2,
          unit: "stalks",
          name: "celery",
        },
        {
          quantity: 1,
          unit: "large",
          name: "tomato",
        },
        {
          quantity: 1,
          unit: "pinch",
          name: "salt",
        },
      ],
      description:
        "Warm 3 tablespoons of olive oil in a large Dutch oven or stockpot over medium heat. Once the oil is shimmering, add the chopped onion, carrot, celery, tomato and a pinch of salt. Cook, stirring often, until the vegetables have softened and the onions are turning translucent, about 7 to 10 minutes.",
    },
    {
      ingredients: [
        {
          quantity: 4,
          unit: "cloves",
          name: "garlic",
        },
        {
          quantity: 1,
          unit: "tsp",
          name: "dried oregano",
        },
        {
          quantity: 1,
          unit: "tsp",
          name: "dried thyme",
        },
      ],
      description:
        "Add the garlic, oregano and thyme. Cook until fragrant while stirring frequently, about 2 minutes.",
    },
    {
      ingredients: [
        {
          quantity: 4,
          unit: "cups",
          name: "chicken broth",
        },
      ],
      description:
        "Bring the chicken broth to a boil, then partially cover the pot with the lid, leaving about a 1” gap for steam to escape. Add the vegetables. Continue simmering, uncovered, for 20 minutes or until the vegetables are tender.",
    },
  ],
}

const demoRecipes: Recipe[] = [
  tomato_sauce,
  sofrito,
  curry_sauce,
  minestrone_soup,
]

const prisma = new PrismaClient()

async function main() {
  for (let demoRecipe of demoRecipes) {
    await prisma.recipeLog.create({
      data: {
        title: demoRecipe.title,
        body: JSON.stringify({ steps: demoRecipe.steps }),
      },
    })
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
