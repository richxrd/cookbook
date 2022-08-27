import React, { useEffect, useState } from "react";
import { ThumbUpIcon, TrashIcon } from "@heroicons/react/outline";
import { fetchUserById } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { deleteReview, likeReview } from "../../api/posts";

const Comment = ({ review, auth, recipeId, setUpdatedRecipe }) => {
    const { comment, rate, likes, date, authorId } = review;

    const [author, setAuthor] = useState(null);
    const [deleteReviewPrompt, setDeleteReviewPrompt] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getAuthor = async () => {
            const data = await fetchUserById(authorId);
            setAuthor(data.result);
        };
        getAuthor();
    }, []);

    const handleReviewLike = async () => {};
    const handleDeleteReview = async () => {
        const data = await deleteReview({
            recipeId: recipeId,
            commentId: review._id,
        });
        setDeleteReviewPrompt(false);
        setUpdatedRecipe(data);
    };
    const handleDeleteReviewPrompt = async () => {
        setDeleteReviewPrompt(!deleteReviewPrompt);
    };

    const handleLikeReview = async () => {
        if (auth && auth._id !== review.authorId) {
            const data = await likeReview({
                recipeId: recipeId,
                commentId: review._id,
                authId: auth._id,
            });

            setUpdatedRecipe(data);
        } else if (!auth) {
            setShowLoginPrompt(!showLoginPrompt);
        }
    };

    const getDate = () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions();
        return new Date(date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const canDelete = () => {
        if (!auth) return false;
        return auth._id === review.authorId;
    };

    const hasData = () => {
        return author;
    };

    return (
        hasData() && (
            <div className="flex flex-col space-y-2 border-b-2 py-4">
                <div>
                    <div className="flex justify-between items-start">
                        <div
                            className="capitalize font-medium text-[#d9534f] text-lg cursor-pointer pb-2"
                            onClick={() => navigate(`/user/${author.uniqueId}`)}
                        >
                            {author.name}
                        </div>
                        <div className="flex space-x-2 items-center font-light">
                            {deleteReviewPrompt && (
                                <div
                                    className="text-sm cursor-pointer bg-red-200 py-1 px-2"
                                    onClick={handleDeleteReview}
                                >
                                    Confirm
                                </div>
                            )}
                            {canDelete() && (
                                <p>
                                    <TrashIcon
                                        className="h-5 cursor-pointer text-red-300 hover:text-red-500 my-1"
                                        onClick={handleDeleteReviewPrompt}
                                    />
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4 text-sm text-[#ecb390]">
                        <p className="text-[#96ceb4]">Rating: {rate}/5</p>
                        <p>{getDate()}</p>
                    </div>
                </div>
                <p className="text-base text-slate-700 py-2">{comment}</p>
                <div
                    className="flex space-x-1 items-center text-gray-400 cursor-pointer"
                    onClick={handleLikeReview}
                >
                    <ThumbUpIcon
                        className={`h-5 cursor-pointer ${
                            auth &&
                            review.likes.includes(auth._id) &&
                            "text-green-400 hover:text-red-300"
                        }`}
                        onClick={handleReviewLike}
                    />
                    <p className="text-sm">
                        Helpful {`(${likes.length || 0})`}
                    </p>

                    {showLoginPrompt && (
                        <p className="text-sm text-red-600 pl-4">
                            Log in to like review
                        </p>
                    )}
                </div>
            </div>
        )
    );
};

export default Comment;
