import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddReview from "../components/AddReview";
import Comment from "../components/Comment";
import Direction from "../components/Direction";
import Divider from "../components/Divider";
import Ingredient from "../components/Ingredient";
import Nutrition from "../components/Nutrition";
import Rating from "../components/Rating";
import TimerCard from "../components/TimerCard";

import { getPost } from "../store/posts/postsActions";

const Recipe = () => {
    const [showCommentPrompt, setShowCommentPrompt] = useState(false);

    const recipe = useSelector((state) => state.posts.recipeData);
    const auth = useSelector((state) => state.user.authData?.result);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: "CLEAR_CURRENT_POST" });
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {}, [recipe]);
    useEffect(() => {}, [auth]);

    const addReviewClick = () => {
        setShowCommentPrompt(!showCommentPrompt);
    };

    const loginClick = () => {
        navigate("/auth");
    };

    //helper
    const hasData = () => {
        if (recipe === null) return false;
        else if (recipe) return true;
        else {
            return false;
        }
    };

    return hasData() ? (
        <div className="h-fit pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl">
            {/* Name, author, image, text, timers */}
            <div className="flex flex-col w-full space-y-4 md:space-y-0 md:space-x-8 md:flex-row md:justify-between">
                <div className="flex flex-col space-y-4">
                    {/* Name */}
                    <h1 className="text-4xl font-semibold md:text-5xl">
                        {recipe.title}
                    </h1>
                    <div className="flex flex-col space-y-4">
                        <Rating ratingsList={Object.entries(recipe.reviews)} />
                        <div className="flex items-center space-x-3">
                            <img
                                src={auth.image}
                                alt=""
                                className="rounded-full w-[32px] h-[32px] cursor-pointer"
                                onClick={() =>
                                    navigate(`/user/${auth.uniqueId}`)
                                }
                            />
                            <h2>
                                Recipe by{" "}
                                <span
                                    className="font-semibold cursor-pointer"
                                    onClick={() =>
                                        navigate(`/user/${auth.uniqueId}`)
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
                    src={recipe.image}
                    className="object-cover w-[360px] h-[480px] mx-auto"
                    alt="/"
                />
                <div className="md:hidden">
                    <TimerCard
                        prep={recipe.time.prep}
                        cook={recipe.time.cook}
                        servings={recipe.servings}
                    />
                </div>
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
