This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone this repository using the following command:

```
git clone https://github.com/frank-byx/arche.git
```

Navigate to the project directory and run `make help` to view commands.

## Demo

Run `make up` to spin up the project. Wait until the console output prints

```
arche_app | ℹ Watching for changes...
```

This may take a few minutes. Then, run `make demo` in a new terminal to seed the database with demo recipes.

Navigate to [http://localhost:3000](http://localhost:3000) in your browser and click on **Recipe Logger**. This page may take a while to load.

![Recipe Viewer](./screenshots/recipe_viewer.png?raw=true "Recipe Viewer")

Click on recipe names in the search drawer (on the left side of the screen) to view recipes. You can also type in the search bar to search for specific recipes.
Click the 'New Recipe' button (to the right of the search bar) to create a new recipe.
Click the delete button (trash icon in the top right corner) to delete the currently viewed recipe.
Click the edit button (pencil icon in the top right corner) to edit the current recipe.

![Recipe Editor](./screenshots/recipe_editor.png?raw=true "Recipe Editor")

From the recipe editor view, click "Add Step", "Delete Step", "Add Ingredient", or the trash icons beside each ingredient to change the number of steps and ingredients in the recipe respectively. Once you're done editing, click the 'save' icon in the top right corner to save your changes, or click the 'close' icon to discard your changes.

At any time, you can click the chevron icon to the right of the search bar to minimize the search drawer, after which you can click the search icon to the left to restore it.

## Demo - Insights

WIP
