import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import AddReview from "../components/RecipePage/AddReview";
import Comment from "../components/RecipePage/Comment";
import Direction from "../components/RecipePage/Direction";
import Divider from "../components/GlobalComponents/Divider";
import Ingredient from "../components/RecipePage/Ingredient";
import Nutrition from "../components/RecipePage/Nutrition";
import Rating from "../components/GlobalComponents/Rating";
import TimerCard from "../components/RecipePage/TimerCard";

import { fetchUserById, getUser } from "../api/user";
import { getPost, likePost } from "../api/posts";
import { getImage } from "../api/firebase";

const Recipe = () => {
    const [showCommentPrompt, setShowCommentPrompt] = useState(false);
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const recipe = await getPost(id);
            setRecipe(recipe);
        };
        getData();
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchUserById(recipe.authorId);
            setUser(data.result);

            const image = await getImage(recipe.image);
            setImage(image);
        };

        if (recipe) {
            getData();
        }
    }, [recipe]);

    useEffect(() => {
        const getAuthById = async () => {
            const authUser = JSON.parse(localStorage.getItem("profile"));
            const data = await getUser(authUser.authData?.result?.uniqueId);
            setAuth(data.result);
        };
        if (JSON.parse(localStorage.getItem("profile"))) {
            getAuthById();
        }
    }, [auth]);
    useEffect(() => {}, [user]);

    const addReviewClick = () => {
        setShowCommentPrompt(!showCommentPrompt);
    };

    const loginClick = () => {
        navigate("/auth");
    };

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

    //helper

    const getCollectionsOptions = () => {
        let collectionOptions = [];

        if (auth) {
            auth.collections.map((collection) => {
                collectionOptions.push({
                    label: collection.name,
                    value: collection.name,
                });
            });
        }
        return collectionOptions;
    };

    const hasData = () => {
        if (recipe === null || user === null || image == null) return false;
        else if (recipe) return true;
        else {
            return false;
        }
    };

    return hasData() ? (
        <div className="h-fit pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl">
            {/* Name, author, image, text, timers */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="flex flex-col space-y-4 col-span-3">
                    {/* Name */}
                    <h1 className="text-4xl font-semibold md:text-5xl">
                        {recipe.title}
                    </h1>
                    <div className="flex flex-col space-y-4 justify-center">
                        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:space-y-0 items-center">
                            <Rating
                                ratingsList={Object.entries(recipe.reviews)}
                            />
                            {auth && auth._id !== recipe._authorId && (
                                <div className="flex space-x-4 items-center font-light">
                                    {}
                                    <div
                                        className={`flex space-x-1 items-center cursor-pointer py-1 px-3 rounded-lg hover:shadow-lg transition duration-200 ${
                                            recipe.likes.includes(auth._id)
                                                ? "bg-green-100"
                                                : "bg-gray-50"
                                        }`}
                                        onClick={handleLike}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className={`w-5 h-5 ${
                                                recipe.likes.includes(auth._id)
                                                    ? "text-green-500"
                                                    : "text-slate-500"
                                            }`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.383 12.25c.806 0 1.533-.446 2.031-1.08a9.04 9.04 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V4.75A.75.75 0 0113 4a2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H12.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H4.654m10.598-9.75H13M4.654 20.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368A12 12 0 011 17.125c0-1.553.295-3.036.831-4.398.306-.774 1.086-1.227 1.918-1.227h1.053c.472 0 .745.556.5.96A8.958 8.958 0 004 17.124c0 1.194.232 2.333.654 3.375z"
                                            />
                                        </svg>
                                        <span>Like</span>
                                    </div>
                                    <div>
                                        <Select
                                            name="collections"
                                            options={getCollectionsOptions()}
                                            className="w-[200px]"
                                            isSearchable={false}
                                            placeholder="Add to Collection"
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
                                onClick={() =>
                                    navigate(`/user/${user.uniqueId}`)
                                }
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
                    src={image}
                    className="object-cover w-full h-[480px] mx-auto col-span-2"
                    alt="/"
                />
            </div>
            <div className="md:hidden my-4">
                <TimerCard
                    prep={recipe.time.prep}
                    cook={recipe.time.cook}
                    servings={recipe.servings}
                />
            </div>

            <Divider />

            {/* Ingredients & Nutrition */}
            <div className="flex flex-col space-y-4 py-4 md:flex-row md:space-y-0 md:space-x-4">
                {/* Ingredients */}
                <div className="w-full h-fit py-4 grow">
                    <h3 className="text-2xl font-medium">Ingredients</h3>
                    {/* Ingredients list */}
                    {Object.entries(recipe.ingredients).map(([key, value]) => {
                        return (
                            <Ingredient key={key} name={key} quantity={value} />
                        );
                    })}
                </div>
                <div className="w-[320px] h-fit border mx-auto border-[#d9534f] rounded-md p-4 grow-0">
                    <h3 className="text-2xl font-medium">Nutritional Info</h3>
                    {Object.entries(recipe.nutrition).map(([key, value]) => {
                        return <Nutrition key={key} name={key} value={value} />;
                    })}
                </div>
            </div>

            <Divider />

            {/* Directions */}
            <div className="py-4">
                <h3 className="text-2xl font-medium">Directions</h3>
                <div className="flex flex-col justify-center space-y-8 my-8">
                    {Object.entries(recipe.directions).map(
                        (direction, index) => {
                            return (
                                <Direction
                                    key={index}
                                    index={index}
                                    direction={direction[1]}
                                />
                            );
                        }
                    )}
                </div>
            </div>

            <Divider />

            {/* Comments */}
            <div className="py-4">
                <h3 className="text-2xl font-medium">Reviews</h3>

                {!auth && (
                    <button
                        className="mt-4 py-2 px-4 bg-[#96ceb4] rounded-sm hover:bg-green-200 transition duration-150"
                        onClick={loginClick}
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
                        <AddReview />
                    </div>
                )}

                <div className="flex flex-col justify-center">
                    {Object.entries(recipe.reviews).map((review, index) => {
                        return <Comment key={index} review={review} />;
                    })}
                </div>
            </div>
        </div>
    ) : (
        <div className="h-fit py-60 md:h-[calc(100vh-318px)] md:py-0 max-w-screen-xl mx-auto flex items-center justify-center"></div>
    );
};

export default Recipe;
