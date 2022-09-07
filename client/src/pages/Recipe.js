import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";

import Divider from "../components/GlobalComponents/Divider";
import TimerCard from "../components/RecipePage/TimerCard";

import { fetchUserById, getUser } from "../api/user";
import { getPost } from "../api/posts";
import RecipeIntroduction from "../components/RecipePage/RecipeIntroduction";
import RecipeIngredients from "../components/RecipePage/RecipeIngredients";
import RecipeNutrition from "../components/RecipePage/RecipeNutrition";
import RecipeDirections from "../components/RecipePage/RecipeDirections";
import RecipeComments from "../components/RecipePage/RecipeComments";
import RecipeNav from "../components/RecipePage/RecipeNav";

const Recipe = () => {
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [collections, setCollections] = useState(null);
    const [collectionOptions, setCollectionOptions] = useState(null);
    const [activeNav, setActiveNav] = useState("Introduction");

    const { id } = useParams();
    const introductionRef = useRef(null);
    const ingredientsRef = useRef(null);
    const nutritionRef = useRef(null);
    const directionsRef = useRef(null);
    const reviewsRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            const recipe = await getPost(id);
            setRecipe({ ...recipe });
        };
        getData();
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchUserById(recipe.authorId);
            setUser({ ...data.result });
        };

        if (recipe) {
            getData();
        }
    }, [recipe]);

    useEffect(() => {
        const getAuthById = async () => {
            const authUser = JSON.parse(localStorage.getItem("profile"));
            const data = await getUser(authUser.authData?.result?.uniqueId);
            setCollections(data.collections);
            let collectionOptions = [];
            data.collections.map((collection) => {
                collectionOptions.push({
                    label: collection.name,
                    value: collection._id,
                });
            });
            setCollectionOptions(collectionOptions);
            setAuth(data.result);
        };
        if (JSON.parse(localStorage.getItem("profile"))) {
            getAuthById();
        }
    }, []);

    useEffect(() => {}, [user]);
    useEffect(() => {}, [collections]);
    useEffect(() => {}, [collectionOptions]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (!ingredientsRef.current) return;
            if (
                window.pageYOffset <
                ingredientsRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    200
            ) {
                setActiveNav("Introduction");
            } else if (
                window.pageYOffset >=
                    ingredientsRef.current.getBoundingClientRect().top +
                        window.scrollY -
                        200 &&
                window.pageYOffset <=
                    nutritionRef.current.getBoundingClientRect().top +
                        window.scrollY -
                        200
            ) {
                setActiveNav("Ingredients");
            } else if (
                window.pageYOffset >=
                    nutritionRef.current.getBoundingClientRect().top +
                        window.scrollY -
                        200 &&
                window.pageYOffset <=
                    directionsRef.current.getBoundingClientRect().top +
                        window.scrollY -
                        200
            ) {
                setActiveNav("Nutrition");
            } else if (
                window.pageYOffset >=
                    directionsRef.current.getBoundingClientRect().top +
                        window.scrollY -
                        200 &&
                window.pageYOffset <=
                    reviewsRef.current.getBoundingClientRect().top +
                        window.scrollY -
                        200
            ) {
                setActiveNav("Directions");
            } else {
                setActiveNav("Reviews");
            }
        });
    }, []);

    const handleNavClick = (nav) => {
        if (nav === "Introduction") {
            window.scrollTo(0, 0);
        } else if (nav === "Ingredients") {
            window.scrollTo(
                0,
                ingredientsRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    200
            );
        } else if (nav === "Nutrition") {
            window.scrollTo(
                0,
                nutritionRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    200
            );
        } else if (nav === "Directions") {
            window.scrollTo(
                0,
                directionsRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    200
            );
        } else {
            window.scrollTo(
                0,
                reviewsRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    200
            );
        }
    };

    const hasData = () => {
        if (!user) return false;
        else if (recipe) return true;
        else {
            return false;
        }
    };

    return hasData() ? (
        <div className="h-fit pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl grid grid-cols-6 gap-8">
            <div className="col-span-6 md:col-span-4">
                <div ref={introductionRef}>
                    <RecipeIntroduction
                        recipe={recipe}
                        auth={auth}
                        user={user}
                        setRecipe={setRecipe}
                        collectionOptions={collectionOptions}
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
                <div className="flex flex-col space-y-4 py-4">
                    <div ref={ingredientsRef}>
                        <RecipeIngredients recipe={recipe} />
                    </div>

                    <div ref={nutritionRef}>
                        <RecipeNutrition recipe={recipe} />
                    </div>
                </div>

                <Divider />

                {/* Directions */}
                <div ref={directionsRef}>
                    <RecipeDirections recipe={recipe} />
                </div>

                <Divider />

                {/* Comments */}
                <div ref={reviewsRef}>
                    <RecipeComments
                        recipe={recipe}
                        auth={auth}
                        setRecipe={setRecipe}
                    />
                </div>
            </div>
            <div className="hidden md:block col-span-2 py-8 relative">
                <div className="fixed w-[250px]">
                    <RecipeNav
                        nav="Introduction"
                        active={activeNav === "Introduction"}
                        handleNavClick={handleNavClick}
                    />
                    <RecipeNav
                        nav="Ingredients"
                        active={activeNav === "Ingredients"}
                        handleNavClick={handleNavClick}
                    />
                    <RecipeNav
                        nav="Nutrition"
                        active={activeNav === "Nutrition"}
                        handleNavClick={handleNavClick}
                    />
                    <RecipeNav
                        nav="Directions"
                        active={activeNav === "Directions"}
                        handleNavClick={handleNavClick}
                    />
                    <RecipeNav
                        nav="Reviews"
                        active={activeNav === "Reviews"}
                        handleNavClick={handleNavClick}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[calc(100vh-318px)]"></div>
    );
};

export default Recipe;
