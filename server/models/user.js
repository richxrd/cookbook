import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    uniqueId: { type: String, required: true },
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    followers: [
        {
            name: { type: String },
            uniqueId: { type: String },
            image: { type: String },
        },
    ],
    following: [
        {
            name: { type: String },
            uniqueId: { type: String },
            image: { type: String },
        },
    ],
    recipesMade: {
        type: [String],
        default: [],
    },
    collections: [
        {
            name: { type: String },
            recipes: {
                type: [String],
                default: [],
            },
        },
    ],
    likes: [
        {
            type: [String],
            default: [],
        },
    ],
});

export default mongoose.model("User", userSchema);
