import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Add food route
router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove",removeFood);

export default router;
