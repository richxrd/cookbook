import React, { useState, useEffect } from "react";
import { getPost } from "../../api/posts";

const CollectionsRecipeCard = ({ recipe }) => {
    const [recipeData, setRecipeData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await getPost(recipe);
            setRecipeData(data);
        };
        getData();
    }, []);

    const avgRating = () => {
        return (
            recipeData.reviews.reduce(
                (sum, curr) => sum + parseInt(curr[1].rate),
                0
            ) / recipeData.reviews.length
        );
    };

    const hasData = () => {
        return recipeData;
    };

    return (
        hasData() && (
            <div className="flex flex-col w-full h-fit md:h-60 shadow-md md:flex-row hover:shadow-xl hover:scale-[1.005] transition duration-200 cursor-pointer">
                {/* Image */}
                <img
                    src={recipeData.imageUrl}
                    alt=""
                    className="object-cover w-full h-60 md:w-[12rem] md:h-full"
                />

                <div className="flex flex-col justify-between p-4 space-y-4 w-full md:w-[calc(100%-15rem)]">
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-xl font-semibold tracking-wider wrap">
                            {recipeData.title}
                        </h1>

                        <p className="font-light text-ellipsis overflow-y-hidden line-clamp-3">
                            {recipeData.description}
                        </p>
                    </div>

                    <div className="flex justify-between text-sm">
                        <div>
                            <span className="text-[#ecb390]">
                                {recipeData.author}
                            </span>
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
        )
    );
};

export default CollectionsRecipeCard;
