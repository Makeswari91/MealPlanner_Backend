## Meal Planner ##

 MealMap helps users plan their weekly meals, organize recipes, and generate grocery lists. It’s designed for busy individuals and families who want to eat healthier, save time, and reduce food waste.  Meal planning is a common struggle. This app simplifies the process, promotes better nutrition, and supports budgeting by streamlining grocery shopping.

## Dependencies ##

- `$npm init -y`
- `npm i express mongoose dotenv`
- `npm install --save-dev nodemon`

## CRUD Routes ##
- User - Stores user credentials, preferences, and saved data
- Recipe - Contains recipe details: ingredients, instructions, tags, nutrition info
- Meal Plan - Weekly plan linking recipes to specific days and meals
- Grocery List - Auto-generated list of ingredients based on selected meal plan