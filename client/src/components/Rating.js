import React from "react";

const Rating = ({ ratingsList }) => {
    const avgRating = (ratingsList) => {
        return (
            ratingsList.reduce((sum, curr) => sum + parseInt(curr[1].rate), 0) /
            ratingsList.length
        );
    };

    return (
        <div className="flex space-x-6 text-gray-600">
            {!isNaN(avgRating(ratingsList)) ? (
                <p>{avgRating(ratingsList)}/5</p>
            ) : (
                <p>No Ratings</p>
            )}
            <p>{ratingsList.length} Reviews</p>
        </div>
    );
};

export default Rating;
