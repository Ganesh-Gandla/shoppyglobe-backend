import Product from "../models/Product.js";
import mongoose from "mongoose";

// ------------------ Get All Products ------------------
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// ------------------ Get Single Product ------------------
export const getProductById = async (req, res) => {
    const { id } = req.params;

    // 🔍 Step 1: Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format"
        });
    }

    try {
        // 🔍 Step 2: Now safely query the DB
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // 🔍 Step 3: Success
        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        // 🔍 Step 4: Handle unexpected server errors
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

