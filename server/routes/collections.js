import express from "express";
import {
    addCollection,
    deleteCollection,
    fetchCollection,
    fetchAllCollections,
    addToCollection,
} from "../controllers/collections.js";

const collectionRoutes = express.Router();

collectionRoutes.post("/new", addCollection);
collectionRoutes.get("/:id", fetchCollection);
collectionRoutes.get("/getall/:id", fetchAllCollections);
collectionRoutes.delete("/delete/:id", deleteCollection);
collectionRoutes.patch("/add", addToCollection);
// Delete From

export default collectionRoutes;
