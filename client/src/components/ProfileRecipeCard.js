import React from "react";
import Rating from "../components/Rating";

const ProfileRecipeCard = ({ recipe }) => {
    const { title, image, reviews } = recipe;

    return (
        <div className="flex flex-col space-y-2 h-fit shadow-xl bg-green-200">
            {/* img */}
            <img src={image} alt="" className="object-cover w-full h-72" />

            <div className="px-2 text-sm">
                <h2 className="text-base font-semibold truncate">{title}</h2>
                <Rating ratingsList={Object.entries(reviews)} full />
            </div>

            <div className="flex">
                <button
                    className="w-full py-2 bg-green-300 hover:bg-green-400"
                    onClick={() => console.log("View")}
                >
                    View
                </button>
                <button
                    className="w-full py-2 bg-[#ecb390] hover:bg-[#d9534f]"
                    onClick={() => console.log("Edit")}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ProfileRecipeCard;
