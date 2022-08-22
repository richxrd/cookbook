import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    uniqueId: { type: String, required: true },
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    recipesMade: {
        type: [String],
        default: [],
    },
    collections: [
        {
            id: { type: [String] },
            recipes: {
                type: [String],
                default: [],
            },
        },
    ],
});

export default mongoose.model("User", userSchema);
