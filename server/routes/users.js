import express from "express";
import { signin, updateBio } from "../controllers/users.js";

const userRoutes = express.Router();

userRoutes.post("/signin", signin);
userRoutes.patch("/updatebio", updateBio);

export default userRoutes;
