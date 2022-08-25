import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";

const ProfileRecipeCard = ({ recipe }) => {
    const { title, image, reviews } = recipe;

    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-fit shadow-lg bg-green-200 cursor-pointer relative group hover:scale-[1.02] hover:shadow-2xl transition duration-200">
            {/* img */}
            <img
                src={image}
                alt=""
                className="object-cover w-full h-80"
                onClick={() => navigate(`/${recipe._id}`)}
            />

            <div
                className="p-2 text-sm absolute bottom-0 bg-green-200 w-full"
                onClick={() => navigate(`/${recipe._id}`)}
            >
                <h2 className="text-base font-semibold truncate">{title}</h2>
                <Rating ratingsList={Object.entries(reviews)} full />
            </div>

            <div className="absolute p-2 top-0 right-0 opacity-0 group-hover:opacity-100 transition duration-200">
                <button
                    className="w-full p-2 rounded-xl bg-[#ecb390] hover:bg-[#d9534f] bg-opacity-60"
                    onClick={() => console.log("Edit")}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ProfileRecipeCard;
