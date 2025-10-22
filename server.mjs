// Imports
import express from 'express';
import dotenv from 'dotenv';
import {globalErr, log} from './middleware/middleware.mjs';
import connectDB from './db/conn.mjs';
import userRoute from './routes/userRoute.mjs';
import RecipeRoute from './routes/recipeRoute.mjs';
import MealPlanRoute from './routes/mealplanRoute.mjs';
import GrocerylistRoute from './routes/grocerylistRoute.mjs';
import loginUser from './routes/loginRoute.mjs';
import registerUser from './routes/registerRoute.mjs';
import cors from "cors";


//setups
dotenv.config();
const app = express();  
const PORT = process.env.PORT || 3001;

//DBconnection
connectDB();

//middleware
 app.use(express.json());
 app.use(log);
 app.use(cors());

// Routes
app.use("/api/users", userRoute);
app.use("/api/recipe", RecipeRoute);
app.use("/api/mealplan", MealPlanRoute);
app.use("/api/grocerylist", GrocerylistRoute);

//Auth Route
app.use('/api/auth/signin', loginUser);
app.use('/api/auth/register', registerUser);

//Err Handling
 app.use(globalErr);
 
 //Server Listener
 app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`); 
 })