import Post from "../models/posts.js";
import User from "../models/user.js";

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
