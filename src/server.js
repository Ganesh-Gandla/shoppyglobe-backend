import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"; 



dotenv.config();  // load .env 

const app = express();

// middleware to parse JSON
app.use(express.json());

// CONNECT TO MONGODB
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", cartRoutes);


