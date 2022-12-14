import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./api/routes/users.js";
import postsRoutes from "./api/routes/posts.js";
import collectionRoutes from "./api/routes/collections.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/collections", collectionRoutes);

app.get("/", (req, res) => {
    res.send("App is running");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server is running on port: ${PORT}`)
        )
    )
    .catch((error) => console.log(error));
