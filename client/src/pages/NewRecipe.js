import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TitleInput from "../components/RecipeForm/TitleInput";
import DescriptionInput from "../components/RecipeForm/DescriptionInput";
import QuickInfoInput from "../components/RecipeForm/QuickInfoInput";
import IngredientsSection from "../components/RecipeForm/IngredientsSection";
import NutritionSection from "../components/RecipeForm/NutritionSection";
import DirectionsSection from "../components/RecipeForm/DirectionsSection";
import TagsSection from "../components/RecipeForm/TagsSection";
import CuisinesDiet from "../components/RecipeForm/CuisinesDiet";

import { newPost } from "../api/posts";
import { getImage, uploadImage } from "../api/firebase";
import { DEFAULT_FORM } from "../ConstantVariables/DefaultRecipeForm";

const NewRecipe = () => {
    const [formData, setFormData] = useState(DEFAULT_FORM);
    const [imageName, setImageName] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const auth = useSelector((state) => state.user?.authData?.result);

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setImageName(e.target.files[0]);
        }
    };

    const deleteImageUpload = (e) => {
        const fileInput = document.getElementById("fileInput");
        fileInput.value = "";
        setImageName("");
    };

    const handleNewRecipe = async (e) => {
        e.preventDefault();
        if (Object.keys(formData.ingredients).length === 0) {
            let newIngredient = document.getElementById("newIngredient");
            newIngredient.setCustomValidity(
                "Please add at least one ingredient."
            );
            newIngredient.reportValidity();
        } else if (formData.directions.length === 0) {
            let newDirection = document.getElementById("newDirection");
            newDirection.setCustomValidity("Please add at least one direction");
            newDirection.reportValidity();
        } else {
            if (!submitting) {
                setSubmitting(true);
                const newImageName = await uploadImage(imageName);
                const imageUrl = await getImage(newImageName);

                const submittionForm = {
                    ...formData,
                    image: newImageName,
                    imageUrl: imageUrl,
                    author: auth.name,
                    authorId: auth._id,
                    authorUniqueId: auth.uniqueId,
                };

                const submitNewPost = async () => {
                    const newPostResult = await newPost(submittionForm);
                    setSubmitting(false);
                    navigate(`/${newPostResult._id}`);
                };

                submitNewPost();
            }
        }
    };

    return (
        <form
            className="h-fit pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl flex flex-col space-y-4 md:max-w-screen-md"
            onSubmit={handleNewRecipe}
        >
            {/* Title & About */}
            <h1 className="text-4xl font-semibold tracking-wide pb-4">
                Add Recipe
            </h1>
            <div className="flex flex-col space-y-8">
                <TitleInput setUpdatedForm={setFormData} formData={formData} />
                {/* Image */}
                <div>
                    <h1 className="text-lg font-semibold">
                        Import Image{" "}
                        <span className="text-sm text-red-600">(Required)</span>
                    </h1>
                    <div className="flex justify-between items-center text-sm">
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            id="fileInput"
                            placeholder="hi"
                            className="w-1/2"
                            required
                        />
                        {imageName && (
                            <button
                                type="button"
                                className="bg-red-400 py-2 px-4 rounded-md"
                                onClick={deleteImageUpload}
                            >
                                Remove Image
                            </button>
                        )}
                    </div>
                </div>

                <DescriptionInput
                    setUpdatedForm={setFormData}
                    formData={formData}
                />

                <QuickInfoInput
                    setUpdatedForm={setFormData}
                    formData={formData}
                />
            </div>

            {/* Ingredients & Nutritional info */}
            <div className="grid gap-8 grid-cols-1">
                <IngredientsSection
                    formData={formData}
                    setUpdatedForm={setFormData}
                />

                <NutritionSection
                    formData={formData}
                    setUpdatedForm={setFormData}
                />
            </div>

            {/* Directions */}
            <DirectionsSection
                formData={formData}
                setUpdatedForm={setFormData}
            />

            <TagsSection formData={formData} setUpdatedForm={setFormData} />
            <CuisinesDiet formData={formData} setUpdatedForm={setFormData} />

            {/* Submit */}
            <div className="grid grid-cols-1 py-4">
                {/* Submit */}
                <button
                    type="submit"
                    className="bg-green-400 py-4 rounded-md text-xl font-semibold text-white transition duration-200 hover:bg-green-300 hover:text-black"
                >
                    Submit Recipe
                </button>
            </div>
        </form>
    );
};

export default NewRecipe;
