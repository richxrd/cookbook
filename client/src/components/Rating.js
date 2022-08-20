import React from "react";

const Rating = ({ ratingsList }) => {
    const avgRating = (ratingsList) => {
        return (
            ratingsList.reduce((sum, curr) => sum + parseInt(curr[1].rate), 0) /
            ratingsList.length
        );
    };

    return (
        <div className="flex space-x-6 text-gray-600 italic">
            {!isNaN(avgRating(ratingsList)) ? (
                <p>Rating: {avgRating(ratingsList)}/5</p>
            ) : (
                <p>No Ratings</p>
            )}
            {!isNaN(avgRating(ratingsList)) ? (
                <p>{ratingsList.length} Reviews</p>
            ) : (
                <p>No Reviews</p>
            )}
        </div>
    );
};

export default Rating;
