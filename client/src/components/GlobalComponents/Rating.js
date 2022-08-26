import React from "react";

const Rating = ({ ratingsList, full = false }) => {
    const avgRating = (ratingsList) => {
        return (
            ratingsList.reduce((sum, curr) => sum + parseInt(curr[1].rate), 0) /
            ratingsList.length
        );
    };

    return (
        <div
            className={`${
                full ? "justify-between" : "space-x-6"
            } flex text-gray-600 italic`}
        >
            <div>
                {!isNaN(avgRating(ratingsList)) ? (
                    <p>Rating: {avgRating(ratingsList)}/5</p>
                ) : (
                    <p>No Ratings</p>
                )}
            </div>
            {!isNaN(avgRating(ratingsList)) ? (
                <p>{ratingsList.length} Reviews</p>
            ) : (
                <p>No Reviews</p>
            )}
        </div>
    );
};

export default Rating;
