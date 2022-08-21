import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, name, image, googleId, bio, token } = req.body;

    const formData = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            const newUser = new User({
                ...formData,
            });

            await newUser.save();

            // const result = await User.create({
            //     email,
            //     name,
            //     image,
            //     googleId,
            //     bio,
            // });

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
    } catch (error) {}
};
