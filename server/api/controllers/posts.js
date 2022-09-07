import Post from "../models/posts.js";
import User from "../models/user.js";
import Collection from "../models/collections.js";

export const newPost = async (req, res) => {
    const { authorId } = req.body;
    try {
        const user = await User.findById(authorId);

        const newPost = new Post({
            ...req.body,
            date: new Date().toISOString(),
        });

        await newPost.save();

        user.recipesMade.push(newPost._id);

        const updatedUser = await User.findByIdAndUpdate(user._id, user, {
            new: true,
        });

        res.status(200).json({ post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json({ post: post });
    } catch (error) {
        res.status(500).json({ message: "Post not found" });
    }
};

export const getPosts = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await Post.find({
            $or: [
                { title },
                { tags: { $in: tags.split(",") } },
                { diets: { $in: tags.split(",") } },
                { cuisine: { $in: tags.split(",") } },
            ],
        });

        res.status(200).json({ posts: posts });
    } catch (error) {}
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts: posts });
    } catch (error) {
        res.status(500).json({ message: "Post not found" });
    }
};

export const likePost = async (req, res) => {
    const { userId, postId } = req.body;

    try {
        const recipe = await Post.findById(postId);
        const user = await User.findById(userId);

        const recipeIndex = recipe.likes.findIndex(
            (id) => id === String(userId)
        );
        if (recipeIndex === -1) {
            recipe.likes.push(userId);
        } else {
            recipe.likes = recipe.likes.filter((id) => id !== String(userId));
        }

        const userIndex = user.likes.findIndex((id) => id === String(postId));
        if (userIndex === -1) {
            user.likes.push(postId);
        } else {
            user.likes = user.likes.filter((id) => id !== String(postId));
        }

        const updatedRecipe = await Post.findByIdAndUpdate(recipe._id, recipe, {
            new: true,
        });
        await User.findByIdAndUpdate(user._id, user, {
            new: true,
        });

        res.status(200).json({ post: updatedRecipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addReview = async (req, res) => {
    const { authorId, comment, rate, postId } = req.body;
    try {
        const recipe = await Post.findById(postId);

        const newReview = {
            authorId: authorId,
            comment: comment,
            rate: rate,
            date: new Date().toISOString(),
        };

        recipe.reviews.push(newReview);

        const updatedRecipe = await Post.findByIdAndUpdate(recipe._id, recipe, {
            new: true,
        });

        res.status(200).json({ post: updatedRecipe });
    } catch (error) {}
};

export const deleteReview = async (req, res) => {
    const { recipeId, commentId } = req.body;
    try {
        const recipe = await Post.findById(recipeId);

        recipe.reviews = recipe.reviews.filter(
            (review) => review._id.toString() !== commentId
        );

        const updatedRecipe = await Post.findByIdAndUpdate(recipe._id, recipe, {
            new: true,
        });
        res.status(200).json({ post: updatedRecipe });
    } catch (error) {}
};

export const likeReview = async (req, res) => {
    const { recipeId, commentId, authId } = req.body;
    try {
        const recipe = await Post.findById(recipeId);
        const review = recipe.reviews.filter(
            (review) => review._id.toString() === commentId
        );
        const reviewIndex = recipe.reviews.indexOf(review[0]);
        const likeIndex = recipe.reviews[reviewIndex].likes.indexOf(authId);

        if (likeIndex === -1) {
            recipe.reviews[reviewIndex].likes.push(authId);
        } else {
            recipe.reviews[reviewIndex].likes = recipe.reviews[
                reviewIndex
            ].likes.filter((id) => id !== String(authId));
        }

        const updatedRecipe = await Post.findByIdAndUpdate(recipeId, recipe, {
            new: true,
        });
        res.status(200).json({ post: updatedRecipe });
    } catch (error) {}
};

export const updatePost = async (req, res) => {
    const newRecipe = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            newRecipe._id,
            newRecipe,
            { new: true }
        );
        res.status(200).json({ post: updatedPost });
    } catch (error) {}
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);
    const user = await User.findById(post.authorId);

    user.recipesMade = user.recipesMade.filter((recipe) => recipe !== id);
    await User.findByIdAndUpdate(user._id, user, { new: true });
    await User.updateMany({}, { $pull: { likes: id } });
    await Collection.updateMany({}, { $pull: { recipes: id } });

    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted" });
};
