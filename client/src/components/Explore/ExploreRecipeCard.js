import React from "react";
import { useNavigate } from "react-router-dom";

const ExploreRecipeCard = ({ recipe }) => {
    const navigate = useNavigate();

    const avgRating = () => {
        return (
            Object.entries(recipe.reviews).reduce(
                (sum, curr) => sum + parseInt(curr[1].rate),
                0
            ) / Object.entries(recipe.reviews).length
        );
    };

    return (
        <div
            onClick={() => navigate(`/${recipe._id}`)}
            className="flex flex-col w-full min-h-[400px] shadow-lg hover:shadow-2xl hover:scale-[1.01] transition duration-200 cursor-pointer"
        >
            {/* Image */}
            <img
                src={recipe.imageUrl}
                alt=""
                className="object-cover w-full h-48"
            />

            <div className="flex flex-col justify-between p-4 space-y-4 w-full h-full">
                <div className="flex flex-col space-y-4">
                    <h1 className="text-xl font-semibold tracking-wider wrap">
                        {recipe.title}
                    </h1>

                    <p className="font-light text-ellipsis overflow-y-hidden line-clamp-4">
                        {recipe.description}
                    </p>
                </div>

                <div className="flex justify-between text-sm">
                    <div>
                        <span className="text-[#ecb390]">{recipe.author}</span>
                    </div>

                    <div className="text-sm font-extralight">
                        {!isNaN(avgRating()) ? (
                            <p>Rating: {avgRating()}/5</p>
                        ) : (
                            <p>No Ratings</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreRecipeCard;
