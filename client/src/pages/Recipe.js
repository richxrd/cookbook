import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddReview from "../components/AddReview";

import Comment from "../components/Comment";
import Direction from "../components/Direction";
import Divider from "../components/Divider";
import Ingredient from "../components/Ingredient";
import Nutrition from "../components/Nutrition";
import Rating from "../components/Rating";
import TimerCard from "../components/TimerCard";

import TEST_DATA from "../testData";

const Recipe = () => {
    const [user, setUser] = useState(true);
    const [showCommentPrompt, setShowCommentPrompt] = useState(false);

    const navigate = useNavigate();

    const {
        title,
        author,
        text,
        image,
        time,
        servings,
        ingredients,
        nutrition,
        directions,
        reviews,
    } = TEST_DATA[0];
    const ingredientsList = Object.entries(ingredients);
    const nutritionList = Object.entries(nutrition);
    const directionsList = Object.entries(directions);
    const reviewsList = Object.entries(reviews);

    const addReviewClick = () => {
        setShowCommentPrompt(!showCommentPrompt);
    };

    const loginClick = () => {
        navigate("/auth");
    };

    return (
        <div className="h-fit pt-28 py-12 md:pt-32 px-6 mx-auto max-w-screen-xl">
            {/* Name, author, image, text, timers */}
            <div className="flex flex-col w-full py-4 space-y-4 md:space-y-0 md:space-x-8 md:flex-row">
                <div className="flex flex-col space-y-4">
                    {/* Name */}
                    <h1 className="text-4xl font-semibold md:text-5xl">
                        {title}
                    </h1>
                    <div className="flex flex-col space-y-4">
                        <Rating ratingsList={reviewsList} />
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fmobile%2Fallrecipes%2Fimages%2Ficon-user-default_v2.png&w=48&h=48&c=sc&poi=face&q=60"
                                alt=""
                                className="rounded-full w-[32px] h-[32px]"
                            />
                            <h2>
                                Recipe by{" "}
                                <span className="font-semibold">{author}</span>
                            </h2>
                        </div>
                    </div>
                    {/* Text */}
                    <p className="text-lg">{text}</p>

                    {/* Timers */}
                    <div className="hidden md:block">
                        <TimerCard
                            prep={time.prep}
                            cook={time.cook}
                            servings={servings}
                        />
                    </div>
                </div>

                <img
                    src={image}
                    className="object-cover w-[360px] h-[480px] mx-auto"
                    alt="/"
                />
                <div className="md:hidden">
                    <TimerCard
                        prep={time.prep}
                        cook={time.cook}
                        servings={servings}
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
                    {ingredientsList.map(([key, value]) => {
                        return (
                            <Ingredient key={key} name={key} quantity={value} />
                        );
                    })}
                </div>
                <div className="w-[320px] h-fit border mx-auto border-[#d9534f] rounded-md p-4 grow-0">
                    <h3 className="text-2xl font-medium">Nutritional Info</h3>
                    {nutritionList.map(([key, value]) => {
                        return <Nutrition key={key} name={key} value={value} />;
                    })}
                </div>
            </div>

            <Divider />

            {/* Directions */}
            <div className="py-4">
                <h3 className="text-2xl font-medium">Directions</h3>
                <div className="flex flex-col justify-center space-y-8 my-8">
                    {directionsList.map((direction, index) => {
                        return (
                            <Direction
                                key={index}
                                index={index}
                                direction={direction[1]}
                            />
                        );
                    })}
                </div>
            </div>

            <Divider />

            {/* Comments */}
            <div className="py-4">
                <h3 className="text-2xl font-medium">Reviews</h3>

                {!user ? (
                    <button
                        className="mt-4 py-2 px-4 bg-[#96ceb4] rounded-sm hover:bg-green-200 transition duration-150"
                        onClick={loginClick}
                    >
                        Log in to add a review
                    </button>
                ) : (
                    <button
                        className="mt-4 py-2 px-4 bg-[#96ceb4] rounded-sm hover:bg-green-200 transition duration-150"
                        onClick={addReviewClick}
                    >
                        Add Review
                    </button>
                )}

                {user && showCommentPrompt && (
                    <div className="mt-4 w-full">
                        <AddReview />
                    </div>
                )}

                <div className="flex flex-col justify-center">
                    {reviewsList.map((review, index) => {
                        return <Comment key={index} review={review} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Recipe;
