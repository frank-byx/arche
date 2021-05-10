# Arche

Arche is a productivity web app for home cooks that aims to encourage improv cooking. Whenever you cook, record what you're doing as you're cooking, using Arche's step-by-step form-based editor. Arche will then automatically typeset your recipe using LaTeX and output it in PDF.

Arche's recipe insights feature will then give you feedback on your recipe based on your cooking history, such as suggesting additional ingredients based on past ingredient combinations. Use this feature to help you reflect on your cooking, brainstorm new recipes, and spark your creativity.

## Getting Started

Ensure that you have [Docker](https://docs.docker.com/get-started/), [`docker-compose`](https://docs.docker.com/compose/install/), and [`make`](https://www.gnu.org/software/make/) installed.

Clone this repository using the following command:

```
git clone https://github.com/frank-byx/arche.git
```

Navigate to the project directory and run `make help` to view commands.

## Demo

Ensure that you have a stable internet connection. Then, run `make up` to spin up the project, or `sudo make up` if your Docker daemon must be run as a root user. Wait until the console output prints

```
arche_app | ℹ Watching for changes...
```

This may take several minutes to complete the first time. Then, run `make demo` (or `sudo make demo`) in a new terminal to seed the database with demo recipes.

Navigate to [http://localhost:3000](http://localhost:3000) in your browser and click on **Recipe Logger**. This page may take a while to load.

### Recipe Viewer

![Recipe Viewer](./screenshots/recipe_viewer.png?raw=true "Recipe Viewer")

Click on recipe names in the search drawer (on the left side of the screen) to view recipes. You can also type in the search bar to search for specific recipes.
Click the 'New Recipe' button (to the right of the search bar) to create a new recipe.
Click the delete button (trash icon in the top right corner) to delete the currently viewed recipe.

### Recipe Editor

Click the edit button (pencil icon in the top right corner) to edit the current recipe.

![Recipe Editor](./screenshots/recipe_editor.png?raw=true "Recipe Editor")

From the recipe editor view, click "Add Step", "Delete Step", "Add Ingredient", or the trash icons beside each ingredient to change the number of steps and ingredients in the recipe. Once you're done editing, click the 'save' icon in the top right corner to save your changes, or click the 'close' icon to discard your changes.

At any time, you can click the chevron icon to the right of the search bar to minimize the search drawer, after which you can click the search icon to the left to restore it.

### Recipe Insights

From the recipe viewer view, click on the insights button ('i' icon in the top right corner to the left of the edit button) to view additional information and generated suggestions based on past recipe logs.

![Recipe Insights](./screenshots/recipe_insights.png?raw=true "Recipe Insights")

Clicking on the insights button again will return you to the recipe viewer.

Run `make down` (or `sudo make down`) to stop the application.

## Design

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The front-end is built with the [React](https://reactjs.org/) framework [Material-UI](https://material-ui.com/). The [GraphQL](https://graphql.org/) back-end is built with [Apollo Server](https://github.com/apollographql/apollo-server), [Nexus](https://nexusjs.org/), and [Prisma](https://www.prisma.io/) ORM. The application is containerized using [Docker](https://www.docker.com/).
