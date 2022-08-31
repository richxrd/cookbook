import { customAlphabet } from "nanoid";
import Post from "../models/posts.js";
import User from "../models/user.js";
import Collection from "../models/collections.js";

export const signin = async (req, res) => {
    const { email, token } = req.body;
    const formData = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            let nanoid = customAlphabet(
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                10
            );

            let count = await User.count();

            const newUser = new User({
                ...formData,
                uniqueId: nanoid() + count,
            });

            await newUser.save();

            res.status(200).json({ result: newUser, token });
        } else {
            res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateBio = async (req, res) => {
    const { googleId, bio } = req.body;

    try {
        const existingUser = await User.findOne({ googleId });

        existingUser.bio = bio;

        const updatedUser = await User.findByIdAndUpdate(
            existingUser._id,
            existingUser,
            { new: true }
        );

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchUser = async (req, res) => {
    const { uniqueId } = req.params;

    try {
        const foundUser = await User.findOne({ uniqueId: uniqueId });
        const recipesFound = await Post.find({
            authorId: foundUser._id,
        });

        const collectionsFound = await Collection.find({
            authorId: foundUser._id,
        });

        res.status(200).json({
            result: foundUser,
            recipes: recipesFound,
            collections: collectionsFound,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const foundUser = await User.findById(id);
        const recipesFound = await Post.find({
            authorId: foundUser._id,
        });
        const collectionsFound = await Collection.find({
            authorId: foundUser._id,
        });

        res.status(200).json({
            result: foundUser,
            recipes: recipesFound,
            collections: collectionsFound,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const followUser = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);
        if (
            senderUser.following.filter(
                (person) => person === receiverUser._id.toString()
            ).length > 0
        ) {
            senderUser.following = senderUser.following.filter(
                (person) => person !== receiverUser._id.toString()
            );

            receiverUser.followers = receiverUser.followers.filter(
                (person) => person !== senderUser._id.toString()
            );

            await User.findByIdAndUpdate(senderUser._id, senderUser, {
                new: true,
            });

            const updatedReceiver = await User.findByIdAndUpdate(
                receiverUser._id,
                receiverUser,
                { new: true }
            );

            res.status(200).json({
                user: updatedReceiver,
            });
        } else {
            senderUser.following.push(receiver);
            receiverUser.followers.push(sender);

            await User.findByIdAndUpdate(senderUser._id, senderUser, {
                new: true,
            });

            const updatedReceiver = await User.findByIdAndUpdate(
                receiverUser._id,
                receiverUser,
                { new: true }
            );

            res.status(200).json({
                user: updatedReceiver,
            });
        }
    } catch (error) {}
};
