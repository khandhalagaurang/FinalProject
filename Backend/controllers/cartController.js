import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { [`cartData.${itemId}`]: 1 } },
            { new: true, upsert: false }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//remove items from user ca
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { [`cartData.${itemId}`]: -1 } },
            { new: true } // Return updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (updatedUser.cartData[itemId] <= 0) {
            await userModel.findByIdAndUpdate(
                userId,
                { $unset: { [`cartData.${itemId}`]: "" } },
                { new: true }
            );
        }

        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" });
    }
};

export { addToCart, removeFromCart, getCart }