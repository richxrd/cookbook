import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DescriptionInput from "../components/RecipeForm/DescriptionInput";
import EditInput from "../components/RecipeForm/TitleInput";
import QuickInfoInput from "../components/RecipeForm/QuickInfoInput";
import IngredientsSection from "../components/RecipeForm/IngredientsSection";
import NutritionSection from "../components/RecipeForm/NutritionSection";
import DirectionsSection from "../components/RecipeForm/DirectionsSection";
import TagsSection from "../components/RecipeForm/TagsSection";
import CuisinesDiet from "../components/RecipeForm/CuisinesDiet";

import { deletePost, getPost, newPost, updatePost } from "../api/posts";
import { deleteImage } from "../api/firebase";

const EditRecipe = () => {
    const [recipe, setRecipe] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const data = await getPost(id);
            setRecipe(data);
        };
        getData();
    }, [id]);

    const handleDeleteConfirmPrompt = (e) => {
        setDeleteConfirm(true);
    };

    const handleDelete = async (e) => {
        if (!submitting) {
            setSubmitting(true);

            await deleteImage(recipe.image);
            await deletePost(recipe._id);
            navigate("/");
            setDeleteConfirm(false);
            setSubmitting(false);
        }
    };
    const handleDeleteCancel = (e) => {
        setDeleteConfirm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(recipe.ingredients).length === 0) {
            let newIngredient = document.getElementById("newIngredient");
            newIngredient.setCustomValidity(
                "Please add at least one ingredient."
            );
            newIngredient.reportValidity();
        } else if (recipe.directions.length === 0) {
            let newDirection = document.getElementById("newDirection");
            newDirection.setCustomValidity("Please add at least one direction");
            newDirection.reportValidity();
        } else {
            if (!submitting) {
                setSubmitting(true);

                const submittionForm = {
                    ...recipe,
                };

                const submitNewPost = async () => {
                    const newPostResult = await updatePost(submittionForm);
                    setSubmitting(false);
                    navigate(`/${newPostResult._id}`);
                };

                submitNewPost();
            }
        }
    };

    return (
        recipe && (
            <form
                className="h-fit pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl flex flex-col space-y-4 md:max-w-screen-md"
                onSubmit={handleSubmit}
            >
                <h1 className="text-4xl font-semibold tracking-wide pb-4">
                    Edit Recipe
                </h1>

                <div className="flex flex-col space-y-8">
                    <EditInput setUpdatedForm={setRecipe} formData={recipe} />
                    <DescriptionInput
                        setUpdatedForm={setRecipe}
                        formData={recipe}
                    />
                    <QuickInfoInput
                        setUpdatedForm={setRecipe}
                        formData={recipe}
                    />
                </div>

                {/* Ingredients & Nutritional info */}
                <div className="grid gap-8 grid-cols-1">
                    <IngredientsSection
                        formData={recipe}
                        setUpdatedForm={setRecipe}
                    />

                    <NutritionSection
                        formData={recipe}
                        setUpdatedForm={setRecipe}
                    />
                </div>

                {/* Directions */}
                <DirectionsSection
                    formData={recipe}
                    setUpdatedForm={setRecipe}
                />

                <TagsSection formData={recipe} setUpdatedForm={setRecipe} />
                <CuisinesDiet formData={recipe} setUpdatedForm={setRecipe} />

                {/* Submit */}
                <div className="grid grid-cols-1 md:grid-cols-6 py-4 md:gap-4 gap-y-4">
                    <button
                        type="submit"
                        className="col-span-4 bg-green-400 py-4 rounded-md text-xl font-semibold text-white transition duration-200 hover:bg-green-300 hover:text-black"
                    >
                        Submit Recipe
                    </button>

                    {!deleteConfirm && (
                        <button
                            type="button"
                            onClick={handleDeleteConfirmPrompt}
                            className="bg-red-300 col-span-2 py-4 rounded-md text-xl font-semibold text-white transition duration-200 hover:bg-red-400 hover:text-black"
                        >
                            Delete Recipe
                        </button>
                    )}

                    {deleteConfirm && (
                        <div className="flex col-span-2 space-x-4">
                            <button
                                type="button"
                                onClick={handleDeleteCancel}
                                className="bg-red-300 p-4 rounded-md text-lg font-semibold text-white transition duration-200 hover:bg-red-400 hover:text-black"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-300 py-4 rounded-md text-lg font-semibold text-white transition duration-200 hover:bg-red-400 hover:text-black"
                            >
                                Press To Confirm
                            </button>
                        </div>
                    )}
                </div>
            </form>
        )
    );
};

export default EditRecipe;
