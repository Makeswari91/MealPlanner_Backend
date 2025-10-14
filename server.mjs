// Imports
import express from 'express';
import dotenv from 'dotenv';
import {globalErr, log} from './middleware/middleware.mjs';
import connectDB from './db/conn.mjs';
import userRoute from './routes/userRoute.mjs';
import RecipeRoute from './routes/recipeRoute.mjs';
import MealPlanRoute from './routes/mealplanRoute.mjs';
import GrocerylistRoute from './routes/grocerylistRoute.mjs';

//setups
dotenv.config();
const app = express();  
const PORT = process.env.PORT || 3001;

//DBconnection
connectDB();

//middleware
 app.use(express.json());
 app.use(log);

// Routes
app.use("/api/users", userRoute);
app.use("/api/recipe", RecipeRoute);
app.use("/api/mealplan", MealPlanRoute);
app.use("/api/grocerylist", GrocerylistRoute);

//Err Handling
 app.use(globalErr);
 
 //Server Listener
 app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`); 
 })