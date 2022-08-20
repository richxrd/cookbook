import React from "react";

const HomeCard = ({ recipe }) => {
    const avgRating = () => {
        return (
            Object.entries(recipe.reviews).reduce(
                (sum, curr) => sum + parseInt(curr[1].rate),
                0
            ) / Object.entries(recipe.reviews).length
        );
    };

    return (
        <div className="flex flex-col w-full h-fit md:h-72 shadow-xl md:flex-row hover:brightness-125 transition duration-200 cursor-pointer">
            {/* Image */}
            <img
                src={recipe.image}
                alt=""
                className="object-cover w-full h-60 md:w-[15rem] md:h-72"
            />

            <div className="flex flex-col justify-between p-4 space-y-4 w-full md:w-[calc(100%-15rem)]">
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

export default HomeCard;
