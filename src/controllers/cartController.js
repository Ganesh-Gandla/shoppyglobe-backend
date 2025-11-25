import mongoose from "mongoose";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

// -------------------- ADD TO CART --------------------
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validation: productId required
        if (!productId) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }

        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid productId format" });
        }

        // If quantity provided, validate it's a positive integer
        if (quantity !== undefined) {
            const qty = Number(quantity);
            if (!Number.isInteger(qty) || qty < 1) {
                return res.status(400).json({ success: false, message: "quantity must be an integer >= 1" });
            }
        }

        // Product validation
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if already in cart
        let cartItem = await CartItem.findOne({
            userId: req.user._id,
            productId
        });

        if (cartItem) {
            // Update quantity (use provided quantity or increment by 1)
            cartItem.quantity += (quantity !== undefined ? Number(quantity) : 1);
            await cartItem.save();
        } else {
            // Create new cart item
            cartItem = new CartItem({
                userId: req.user._id,
                productId,
                quantity: (quantity !== undefined ? Number(quantity) : 1)
            });
            await cartItem.save();
        }

        res.status(201).json({ success: true, cartItem });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// -------------------- UPDATE CART ITEM --------------------
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;

        // Validate id param
        if (!id) {
            return res.status(400).json({ success: false, message: "cart item id is required in params" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid cart item id format" });
        }

        // Validate quantity presence
        if (quantity === undefined) {
            return res.status(400).json({ success: false, message: "quantity is required" });
        }

        // Validate quantity value
        const qty = Number(quantity);
        if (!Number.isInteger(qty) || qty < 1) {
            return res.status(400).json({ success: false, message: "quantity must be an integer >= 1" });
        }

        const cartItem = await CartItem.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        cartItem.quantity = qty;
        await cartItem.save();

        res.status(200).json({ success: true, cartItem });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// -------------------- DELETE CART ITEM --------------------
export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate id param
        if (!id) {
            return res.status(400).json({ success: false, message: "cart item id is required in params" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid cart item id format" });
        }

        const cartItem = await CartItem.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        res.status(200).json({ success: true, message: "Item removed from cart" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
