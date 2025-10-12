// Imports
import express from 'express';
import dotenv from 'dotenv';
import {globalErr, log} from './middleware/middleware.mjs';
import connectDB from './db/conn.mjs';
import userRoute from './routes/userRoute.mjs';

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

//Err Handling
 app.use(globalErr);
 
 //Server Listener
 app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`); 
 })