import React, { useEffect, useState } from "react";
import {
    CheckIcon,
    ThumbUpIcon,
    TrashIcon,
    XIcon,
} from "@heroicons/react/outline";
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
    const handleDeleteCancel = async () => {
        setDeleteReviewPrompt(false);
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
                    <div className="flex justify-between items-center pb-2">
                        <div className="flex space-x-2 items-center">
                            <img
                                src={author.image}
                                alt=""
                                className="h-8 object-cover rounded-full"
                            />
                            <h2
                                className="capitalize font-medium text-[#d9534f] text-lg cursor-pointer"
                                onClick={() =>
                                    navigate(`/user/${author.uniqueId}`)
                                }
                            >
                                {author.name}
                            </h2>
                        </div>
                        <div className="flex space-x-2 items-center font-light">
                            {deleteReviewPrompt && (
                                <div className="flex items-center cursor-pointer">
                                    <CheckIcon
                                        className="h-5 px-4 bg-green-200 hover:bg-green-400"
                                        onClick={handleDeleteReview}
                                    />
                                    <XIcon
                                        className="h-5 px-2 bg-red-200 hover:bg-red-400"
                                        onClick={handleDeleteCancel}
                                    />
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
                </div>
                <p className="text-base text-slate-700 py-2">{comment}</p>
                <div className="flex justify-between items-center text-gray-400 text-sm">
                    <div className="flex space-x-4">
                        <p className="text-green-800">Rating: {rate}/5</p>
                        <p>{getDate()}</p>
                    </div>
                    <div
                        className="flex space-x-1 items-center cursor-pointer"
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
                        <p>Helpful {`(${likes.length || 0})`}</p>

                        {showLoginPrompt && (
                            <p className="text-red-600 pl-4">
                                Log in to like review
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default Comment;
