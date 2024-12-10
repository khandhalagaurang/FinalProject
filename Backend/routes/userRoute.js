import express from "express";
import { loginUser, registeruser } from "../controllers/userController.js";

const userRouter = express.Router();

// Correct the route definitions to use `userRouter`
userRouter.post("/register", registeruser);
userRouter.post("/login", loginUser);

export default userRouter;
