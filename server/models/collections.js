import mongoose from "mongoose";

const collectionSchema = mongoose.Schema({
    name: { type: String, required: true },
    authorId: { type: String, required: true },
    recipes: {
        type: [String],
        default: [],
    },
});

export default mongoose.model("Collection", collectionSchema);
