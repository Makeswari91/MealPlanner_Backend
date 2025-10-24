## Meal Planner ##

 MealMap helps users plan their weekly meals and organize recipes. It’s designed for busy individuals and families who want to eat healthier, save time, and reduce food waste.  Meal planning is a common struggle. This app simplifies the process and promotes better nutrition.

## Dependencies ##

- `$npm init -y`
- `npm i express mongoose dotenv express-validator`
- `npm install --save-dev nodemon`
- `npm i cors`
- `npm i jsonwebtoken bcryptjs`
    
## CRUD Routes ##
- User - Stores user credentials, preferences, and saved data
- Recipe - Contains recipe details: ingredients, instructions, tags, nutrition info
- Meal Plan - Weekly plan linking recipes to specific days and meals

# Users
POST /api/users → Register
POST /api/login → Login
GET /api/users/:id → Get user profile
PUT /api/users/:id → Update profile
DELETE /api/users/:id → Delete account

# Recipes
GET /api/recipes → Get all recipes
GET /api/recipes/:id → Get recipe by ID
POST /api/recipes → Create recipe
PUT /api/recipes/:id → Update recipe
DELETE /api/recipes/:id → Delete recipe

# Meal Plans
GET /api/mealplans/:userId → Get user’s meal plans
POST /api/mealplans → Create meal plan
PUT /api/mealplans/:id → Update meal plan
DELETE /api/mealplans/:id → Delete meal plan

## GitHub Frontend ##

`https://github.com/Makeswari91/MealPlanner_Frontend.git`