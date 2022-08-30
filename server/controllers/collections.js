import Post from "../models/posts.js";
import User from "../models/user.js";
import Collection from "../models/collections.js";

export const addCollection = async (req, res) => {
    const { googleId, collectionName } = req.body;
    try {
        const user = await User.findOne({ googleId: googleId });

        const newCollection = new Collection({
            name: collectionName,
            authorId: user._id,

            recipes: [],
        });

        const collection = await newCollection.save();
        user.collections.push(collection._id);

        const updatedUser = await User.findByIdAndUpdate(user._id, user, {
            new: true,
        });

        const collectionsFound = await Collection.find({
            authorId: updatedUser._id,
        });

        res.status(200).json({
            result: updatedUser,
            collections: collectionsFound,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchCollection = async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await Collection.findById(id);

        res.status(200).json({ result: collection });
    } catch (error) {}
};

export const fetchAllCollections = async (req, res) => {
    const { id } = req.params;

    try {
        const collectionsFound = await Collection.find({ authorId: id });

        res.status(200).json({ result: collectionsFound });
    } catch (error) {}
};

export const deleteCollection = async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await Collection.findById(id);

        const user = await User.findById(collection.authorId);

        user.collections = user.collections.filter(
            (collection) => collection !== id
        );
        const updatedUser = await User.findByIdAndUpdate(
            collection.authorId,
            user,
            {
                new: true,
            }
        );

        await Collection.findByIdAndDelete(id);
        res.status(200).json({ result: updatedUser });
    } catch (error) {}
};

export const addToCollection = async (req, res) => {
    const { postId, collectionId } = req.body;

    try {
        const foundCollection = await Collection.findById(collectionId);

        const recipeIndex = foundCollection.recipes.indexOf(postId);

        if (recipeIndex === -1) {
            foundCollection.recipes.push(postId);
        } else {
            foundCollection.recipes = foundCollection.recipes.filter(
                (recipe) => recipe !== postId
            );
        }
        const updatedCollection = await Collection.findByIdAndUpdate(
            foundCollection._id,
            foundCollection,
            {
                new: true,
            }
        );

        res.status(200).json({ result: updatedCollection });
    } catch (error) {}
};
