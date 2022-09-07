import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddReview from "./AddReview";
import Comment from "./Comment";

const RecipeComments = ({ recipe, auth, setRecipe }) => {
    const [showCommentPrompt, setShowCommentPrompt] = useState(false);
    const navigate = useNavigate();

    const addReviewClick = () => {
        setShowCommentPrompt(!showCommentPrompt);
    };

    return (
        <div className="py-4">
            <h3 className="text-2xl font-medium">Reviews</h3>

            {!auth && (
                <button
                    className="mt-4 py-2 px-4 bg-[#96ceb4] rounded-sm hover:bg-green-200 transition duration-150"
                    onClick={() => navigate("/auth")}
                >
                    Log in to add a review
                </button>
            )}

            {auth && auth._id !== recipe.authorId && (
                <button
                    className="mt-4 py-2 px-4 bg-[#96ceb4] rounded-sm hover:bg-green-200 transition duration-150"
                    onClick={addReviewClick}
                >
                    Add Review
                </button>
            )}

            {auth && auth._id !== recipe.authorId && showCommentPrompt && (
                <div className="mt-4 w-full">
                    <AddReview
                        authId={auth._id}
                        postId={recipe._id}
                        setUpdatedRecipe={setRecipe}
                        setPrompt={setShowCommentPrompt}
                    />
                </div>
            )}

            <div className="flex flex-col justify-center">
                {recipe.reviews.map((review, index) => {
                    return (
                        <Comment
                            key={index}
                            review={review}
                            auth={auth}
                            recipeId={recipe._id}
                            setUpdatedRecipe={setRecipe}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default RecipeComments;
