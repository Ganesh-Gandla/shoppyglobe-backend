import Product from "../models/Product.js";

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
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });

    } catch (error) {
        res.status(500).json({ success: false, message: "Invalid ID", error });
    }
};
