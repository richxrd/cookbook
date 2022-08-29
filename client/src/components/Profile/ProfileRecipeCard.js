import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rating from "../GlobalComponents/Rating";

const ProfileRecipeCard = ({ recipe }) => {
    const { title, imageUrl, reviews } = recipe;
    const auth = useSelector((state) => state.user.authData?.result);
    const navigate = useNavigate();

    const isAuthUser = () => {
        if (auth) {
            return auth._id === recipe.authorId;
        }
        return false;
    };

    return (
        <div className="flex flex-col m-2 aspect-[4/5] shadow-lg cursor-pointer rounded-lg relative group hover:scale-[1.02] hover:shadow-2xl transition duration-200">
            {/* img */}
            <img
                src={imageUrl}
                alt=""
                className="object-cover w-full h-full rounded-lg"
                onClick={() => navigate(`/${recipe._id}`)}
            />

            <div
                className="p-2 text-sm absolute bottom-0 bg-green-200 w-full rounded-b-lg"
                onClick={() => navigate(`/${recipe._id}`)}
            >
                <h2 className="text-base font-semibold truncate">{title}</h2>
                <Rating ratingsList={Object.entries(reviews)} full />
            </div>

            {isAuthUser() && (
                <div className="absolute p-2 top-0 right-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-200">
                    <button
                        className="w-full py-2 px-4 rounded-xl bg-[#ecb390] hover:bg-[#d9534f] bg-opacity-70"
                        onClick={() => navigate(`/${recipe._id}/edit`)}
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileRecipeCard;
