import { customAlphabet } from "nanoid";
import Post from "../models/posts.js";
import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, name, image, googleId, bio, token } = req.body;

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

        res.status(200).json({ result: updatedUser });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchUser = async (req, res) => {
    const { uniqueId } = req.params;

    try {
        const foundUser = await User.findOne({ uniqueId: uniqueId });

        const recipes = foundUser.recipesMade;
        const recipesFound = await Post.find({ _id: { $in: recipes } });

        res.status(200).json({ result: foundUser, recipes: recipesFound });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addCollection = async (req, res) => {
    const { googleId, collectionName } = req.body;
    try {
        const user = await User.findOne({ googleId: googleId });
        const newCollection = {
            name: collectionName,
            recipes: [],
        };

        user?.collections.push(newCollection);
        const updatedUser = await User.findByIdAndUpdate(user._id, user, {
            new: true,
        });

        res.status(200).json({ result: updatedUser });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteCollection = async (req, res) => {
    const { id, collectionId } = req.body;

    try {
        const user = await User.findById(id);

        user.collections = user.collections.filter(
            (collection) => collection._id.toString() !== collectionId
        );
        const updatedUser = await User.findByIdAndUpdate(id, user, {
            new: true,
        });
        res.status(200).json({ result: updatedUser });
    } catch (error) {}
};

export const followUser = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (
            senderUser.following.filter(
                (following) => following.uniqueId === receiverUser.uniqueId
            ).length > 0
        ) {
            senderUser.following = senderUser.following.filter(
                (following) => following.uniqueId !== receiverUser.uniqueId
            );

            receiverUser.followers = receiverUser.followers.filter(
                (following) => following.uniqueId !== senderUser.uniqueId
            );

            const updatedSender = await User.findByIdAndUpdate(
                senderUser._id,
                senderUser,
                { new: true }
            );

            const updatedReceiver = await User.findByIdAndUpdate(
                receiverUser._id,
                receiverUser,
                { new: true }
            );

            res.status(200).json({
                auth: updatedSender,
                user: updatedReceiver,
            });
        } else {
            const newFollower = {
                name: senderUser.name,
                uniqueId: senderUser.uniqueId,
                image: senderUser.image,
            };

            const newFollowing = {
                name: receiverUser.name,
                uniqueId: receiverUser.uniqueId,
                image: receiverUser.image,
            };

            senderUser.following.push(newFollowing);
            receiverUser.followers.push(newFollower);

            const updatedSender = await User.findByIdAndUpdate(
                senderUser._id,
                senderUser,
                { new: true }
            );

            const updatedReceiver = await User.findByIdAndUpdate(
                receiverUser._id,
                receiverUser,
                { new: true }
            );

            res.status(200).json({
                auth: updatedSender,
                user: updatedReceiver,
            });
        }
    } catch (error) {}
};
