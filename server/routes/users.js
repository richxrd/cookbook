import express from "express";
import { fetchUser, signin, updateBio } from "../controllers/users.js";

const userRoutes = express.Router();

userRoutes.post("/signin", signin);
userRoutes.patch("/updatebio", updateBio);
userRoutes.get("/:uniqueId", fetchUser);

export default userRoutes;
