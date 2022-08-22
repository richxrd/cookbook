import { customAlphabet } from "nanoid";
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
        res.status(200).json({ result: foundUser });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
