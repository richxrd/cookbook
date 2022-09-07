import React from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ThumbUpIcon } from "@heroicons/react/outline";

import { likePost } from "../../api/posts";
import { addToCollection } from "../../api/collections";
import Rating from "../GlobalComponents/Rating";
import TimerCard from "./TimerCard";

const RecipeIntroduction = ({
    recipe,
    user,
    auth,
    setRecipe,
    collectionOptions,
}) => {
    const navigate = useNavigate();

    const handleLike = () => {
        const likePostFirebase = async () => {
            const formData = {
                userId: auth._id,
                postId: recipe._id,
            };
            const newRecipe = await likePost(formData);
            setRecipe(newRecipe);
        };
        likePostFirebase();
    };

    const handleCollectionChange = async (e) => {
        const submittionForm = {
            postId: recipe._id,
            collectionId: e.value,
        };

        await addToCollection(submittionForm);
    };

    const renderLikeEdit = () => {
        if (auth._id !== recipe.authorId) {
            return (
                <div
                    className={`flex space-x-1 items-center cursor-pointer py-1 px-3 rounded-lg hover:shadow-lg transition duration-200 ${
                        recipe.likes.includes(auth._id)
                            ? "bg-green-100"
                            : "bg-gray-50"
                    }`}
                    onClick={handleLike}
                >
                    <ThumbUpIcon
                        className={`w-5 h-5 ${
                            recipe.likes.includes(auth._id)
                                ? "text-green-500"
                                : "text-slate-500"
                        }`}
                    />

                    <span>Like</span>
                </div>
            );
        } else {
            return (
                <div
                    className="py-1 px-3 rounded-lg bg-red-200 hover:bg-red-400 hover:shadow-lg cursor-pointer transition duration-200"
                    onClick={() => navigate(`/${recipe._id}/edit`)}
                >
                    Edit
                </div>
            );
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="flex flex-col space-y-4 col-span-3">
                {/* Name */}
                <h1 className="text-4xl font-semibold md:text-5xl">
                    {recipe.title}
                </h1>
                <div className="flex flex-col space-y-4 justify-center">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:space-y-0 items-center">
                        <Rating ratingsList={Object.entries(recipe.reviews)} />
                        {auth && auth._id !== recipe._authorId && (
                            <div className="flex space-x-4 items-center font-light">
                                {renderLikeEdit()}
                                <div>
                                    <Select
                                        name="collections"
                                        options={collectionOptions}
                                        className="w-[200px]"
                                        isSearchable={false}
                                        placeholder="Add to Collection"
                                        onChange={handleCollectionChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-3">
                        <img
                            src={user.image}
                            alt=""
                            className="rounded-full w-[32px] h-[32px] cursor-pointer"
                            onClick={() => navigate(`/user/${user.uniqueId}`)}
                            referrerPolicy="no-referrer"
                        />
                        <h2>
                            Recipe by{" "}
                            <span
                                className="font-semibold cursor-pointer"
                                onClick={() =>
                                    navigate(`/user/${user.uniqueId}`)
                                }
                            >
                                {recipe.author}
                            </span>
                        </h2>
                    </div>
                </div>
                {/* Text */}
                <p className="text-lg">{recipe.description}</p>

                {/* Timers */}
                <div className="hidden md:block">
                    <TimerCard
                        prep={recipe.time.prep}
                        cook={recipe.time.cook}
                        servings={recipe.servings}
                    />
                </div>
            </div>

            <img
                src={recipe.imageUrl}
                className="object-cover w-full h-[480px] mx-auto col-span-2"
                alt="/"
            />
        </div>
    );
};

export default RecipeIntroduction;
