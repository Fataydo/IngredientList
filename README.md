# Project Installation Guide Backend

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Database](#database)
  - [Prerequisites](#prerequisites-1)
  - [Briefing](#briefing)
  - [Steps](#steps)
- [API Routes](#api-routes)
  - [Recipe Routes](#recipe-routes)
  - [Category Routes](#category-routes)
  - [Ingredient Routes](#ingredient-routes)
- [Test-backend](#test-backend)
- [Frontend](#frontend)

## Introduction

Welcome to the installation guide for our project! Follow these steps to set up the environment and run the necessary scripts.

## Prerequisites

Before you begin, ensure that you have Node.js and npm (Node Package Manager) installed on your machine.

### Installation Steps

1. Navigate to the project directory:
   - `cd recipes-api`

2. Install dependencies using npm:
   - `npm install`

### Available Scripts

The project comes with several useful scripts defined in the `package.json` file under the "scripts" key. These scripts automate common development tasks.

- **start**: This script is used to start the project in development mode. It utilizes nodemon to watch TypeScript files in the `src` directory and automatically restart the server on changes.
    - `npm start`

## Database

### Prerequisites
Ensure that you have PostgreSQL installed on your machine before setting up pgAdmin.


### Briefing: 
The Database is based on postgressql

You need to create the database manually.

The Database's schema and table is automatically created and migrated if the Script: `npx ts-node create-tables.ts` has been run.

You need to create a env file after the database has been created.

for example:
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=recipes_db
E_PORT=5432

### Steps

It only needs to be done once

1. **Download and Install PostgreSQL:**
   - Visit the [official PostgreSQL website](https://www.postgresql.org/download/) to download the installer.
   - Follow the installation instructions for your operating system.

2. **Install pgAdmin:**
   - Visit the [official pgAdmin download page](https://www.pgadmin.org/download/) to download the installer.
   - Follow the installation instructions for your operating system.

3. **Launch pgAdmin:**
   - After installing pgAdmin, launch the application.

4. **Login to pgAdmin:**
   - Upon launching, you'll be prompted to log in.
   - Enter the username and password you set during the installation of PostgreSQL.

5. **Add a Server:**
   - In pgAdmin, navigate to the 'Servers' tab in the left sidebar.
   - Right-click on 'Servers' and choose 'Create' > 'Server...'.

6. **Fill in Server Details:**
   - In the 'General' tab, provide a name for your server.
   - Switch to the 'Connection' tab and enter the following details:
     - **Host name/address:** `localhost`
     - **Port:** `5432` (default PostgreSQL port)
     - **Maintenance database:** `postgres`
     - **Username:** Your PostgreSQL username (default: `postgres`)
     - **Password:** Your PostgreSQL password (default: `postgres`)

7. **Save Server Connection:**
   - Click on the 'Save' button to save the server connection.

8. **Connect to the Server:**
   - Double-click on the server you just added to connect to it.

9. **Explore Databases:**
   - You can now explore your PostgreSQL databases through the pgAdmin interface.

10. **Create a New Database:**
    - Right-click on 'Databases' in the left sidebar.
    - Choose 'Create' > 'Database...' (default: `postgres`)
    - Provide a name for your new database and click 'Save'. 

11. **Close and Exit:**
    - When you're finished, you can close pgAdmin.
   
## API Routes 
In this Section you see all the Routes the has been used for the project, for more information 
### Recipe Routes

### Get All Recipes
- **Route**: `/getAllRecipes`
- **HTTP Method**: GET
- **Controller Method**: `recipeController.getAllRecipes`
- **Description**: Retrieves a list of all recipes.

### Get Recipe by ID
- **Route**: `/getRecipeById/:id`
- **HTTP Method**: GET
- **Controller Method**: `recipeController.getRecipeById`
- **Description**: Retrieves a specific recipe based on the provided `id`.

### Create Recipe
- **Route**: `/createRecipe`
- **HTTP Method**: POST
- **Controller Method**: `recipeController.createRecipe`
- **Description**: Creates a new recipe. Requires data in the request body.

### Update Recipe by ID
- **Route**: `/updateRecipe/:id`
- **HTTP Method**: PUT
- **Controller Method**: `recipeController.updateRecipe`
- **Description**: Updates an existing recipe based on the provided `id`. Requires data in the request body.

### Delete Recipe by ID
- **Route**: `/deleteRecipe/:id`
- **HTTP Method**: DELETE
- **Controller Method**: `recipeController.deleteRecipe`
- **Description**: Deletes a specific recipe based on the provided `id`.

# API Routes Documentation

## Category Routes

### Get All Categories
- **Route**: `/getAllCategories`
- **HTTP Method**: GET
- **Controller Method**: `categoryController.getAllCategories`
- **Description**: Retrieves a list of all categories.

### Get Category by ID
- **Route**: `/getCategoryById/:id`
- **HTTP Method**: GET
- **Controller Method**: `categoryController.getCategoryById`
- **Description**: Retrieves a specific category based on the provided `id`.

### Create Category
- **Route**: `/createCategory`
- **HTTP Method**: POST
- **Controller Method**: `categoryController.createCategory`
- **Description**: Creates a new category. Requires data in the request body.

### Update Category by ID
- **Route**: `/updateCategory/:id`
- **HTTP Method**: PUT
- **Controller Method**: `categoryController.updateCategory`
- **Description**: Updates an existing category based on the provided `id`. Requires data in the request body.

### Delete Category by ID
- **Route**: `/deleteCategory/:id`
- **HTTP Method**: DELETE
- **Controller Method**: `categoryController.deleteCategory`
- **Description**: Deletes a specific category based on the provided `id`.

## Ingredient Routes

### Get All Ingredients
- **Route**: `/getAllIngredients`
- **HTTP Method**: GET
- **Controller Method**: `ingredientController.getAllIngredients`
- **Description**: Retrieves a list of all ingredients.

### Get Ingredient by ID
- **Route**: `/getIngredientById/:id`
- **HTTP Method**: GET
- **Controller Method**: `ingredientController.getIngredientById`
- **Description**: Retrieves a specific ingredient based on the provided `id`.

### Create Ingredient
- **Route**: `/createIngredient`
- **HTTP Method**: POST
- **Controller Method**: `ingredientController.createIngredient`
- **Description**: Creates a new ingredient. Requires data in the request body.

### Update Ingredient by ID
- **Route**: `/updateIngredient/:id`
- **HTTP Method**: PUT
- **Controller Method**: `ingredientController.updateIngredient`
- **Description**: Updates an existing ingredient based on the provided `id`. Requires data in the request body.

### Delete Ingredient by ID
- **Route**: `/deleteIngredient/:id`
- **HTTP Method**: DELETE
- **Controller Method**: `ingredientController.deleteIngredient`
- **Description**: Deletes a specific ingredient based on the provided `id`.
##Test-backend

# Postman Testing

## Using Postman to Test API Routes

We recommend using [Postman](https://www.postman.com/) to interact with and test the API routes. Follow the steps below to import the provided Postman collection and start testing.

### 1. Install Postman

If you don't have Postman installed, download and install it from the [Postman website](https://www.postman.com/downloads/).

### 2. Import Postman Collection

Click on the link below to join the Postman team and access the shared collection:

[Postman Team Invite Link](https://app.getpostman.com/join-team?invite_code=9bf7a746d2467424d377b93ee6f9e58b&target_code=820fb6f79babd4382550137e4eedcf26)

Once you're part of the team, you'll have access to the shared collection.


##Frontend

1. Navigate to the project directory: `cd recipes-frontend`
2. Install dependencies:: `npm install`
3. To run the project in development mode, use the following command:`npm run dev`

This will start the development server, and you can view your application at `http://localhost:5173/`.





