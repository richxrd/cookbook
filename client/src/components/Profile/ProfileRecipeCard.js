import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../api/firebase";
import Rating from "../GlobalComponents/Rating";

const ProfileRecipeCard = ({ recipe }) => {
    const { title, image, reviews } = recipe;
    const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getRecipeImage = async () => {
            if (image.length > 0) {
                const imageSrc = await getImage(image);
                setImageSrc(imageSrc);
            }
        };

        getRecipeImage();
    }, [image]);

    return (
        <div className="flex flex-col h-fit shadow-lg bg-green-200 cursor-pointer rounded-lg relative group hover:scale-[1.02] hover:shadow-2xl transition duration-200">
            {/* img */}
            <img
                src={imageSrc}
                alt=""
                className="object-cover w-full h-80 rounded-lg"
                onClick={() => navigate(`/${recipe._id}`)}
            />

            <div
                className="p-2 text-sm absolute bottom-0 bg-green-200 w-full rounded-b-lg"
                onClick={() => navigate(`/${recipe._id}`)}
            >
                <h2 className="text-base font-semibold truncate">{title}</h2>
                <Rating ratingsList={Object.entries(reviews)} full />
            </div>

            <div className="absolute p-2 top-0 right-0 opacity-0 group-hover:opacity-100 transition duration-200">
                <button
                    className="w-full py-2 px-4 rounded-xl bg-[#ecb390] hover:bg-[#d9534f] bg-opacity-70"
                    onClick={() => console.log("Edit")}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ProfileRecipeCard;
