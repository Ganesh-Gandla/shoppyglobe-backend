import express from "express";
import { addToCart, updateCartItem, deleteCartItem } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// protected routes
router.post("/cart", authMiddleware, addToCart);
router.put("/cart/:id", authMiddleware, updateCartItem);
router.delete("/cart/:id", authMiddleware, deleteCartItem);

export default router; 
