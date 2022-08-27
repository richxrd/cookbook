import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    cuisine: { type: String },
    date: { type: Date },
    description: { type: String, required: true },
    diets: { type: [String], default: [] },
    directions: { type: [String], default: [] },
    image: { type: String },
    imageUrl: { type: String },
    ingredients: { type: Object },
    nutrition: { type: Object },
    servings: { type: String },
    tags: { type: [String], default: [] },
    time: { type: Object },
    title: { type: String, required: true },
    likes: { type: [String], default: [] },
    reviews: [
        {
            authorId: { type: String },
            date: { type: Date },
            rate: { type: Number },
            comment: { type: String },
            likes: { type: [String], default: [] },
        },
    ],
});

export default mongoose.model("Post", postSchema);
