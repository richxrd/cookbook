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
