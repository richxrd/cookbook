import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/outline";
import Select from "react-select";

import DirectionsInput from "../components/RecipeForm/DirectionsInput";
import IngredientInput from "../components/RecipeForm/IngredientInput";
import NutrionInput from "../components/RecipeForm/NutrionInput";
import TagsInput from "../components/RecipeForm/TagsInput";
import { newPost } from "../api/posts";
import { getImage, uploadImage } from "../api/firebase";

import { DIETS } from "../ConstantVariables/Diets";
import { CUISINES } from "../ConstantVariables/Cuisines";
import { DEFAULT_FORM } from "../ConstantVariables/DefaultRecipeForm";

const NewRecipe = () => {
    const [formData, setFormData] = useState(DEFAULT_FORM);
    const [imageName, setImageName] = useState(null);
    const [newIngredientName, setNewIngredientName] = useState("");
    const [newIngredientQuantity, setNewIngredientQuantity] = useState("");
    const [newDirection, setNewDirection] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const auth = useSelector((state) => state.user?.authData?.result);

    const handleTimeChange = (e) => {
        setFormData({
            ...formData,
            time: { ...formData.time, [e.target.name]: e.target.value },
        });
    };
    const handleNutritionChange = (e) => {
        setFormData({
            ...formData,
            nutrition: {
                ...formData.nutrition,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (e) => {
        setFormData({
            ...formData,
            ingredients: {
                ...formData.ingredients,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleDeleteIngredient = (e) => {
        let newFormData = { ...formData };
        delete newFormData.ingredients[e.target.id];
        setFormData(newFormData);
    };

    const resetIngredientForm = () => {
        setNewIngredientName("");
        setNewIngredientQuantity("");
    };

    const handleNewIngrdientName = (e) => {
        let newIngredient = document.getElementById("newIngredient");
        newIngredient.setCustomValidity("");
        setNewIngredientName(e.target.value);
    };

    const handleNewIngrdientQuantity = (e) => {
        setNewIngredientQuantity(e.target.value);
    };

    const handleIngredientKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.target.value;
            if (!value.trim()) return;
            setFormData({
                ...formData,
                ingredients: {
                    ...formData.ingredients,
                    [newIngredientName]: newIngredientQuantity,
                },
            });
            resetIngredientForm();
        }
    };

    const handleNewIngredient = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            ingredients: {
                ...formData.ingredients,
                [newIngredientName]: newIngredientQuantity,
            },
        });
        resetIngredientForm();
    };

    const handleDirectionKeydown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const handleNewDirectionChange = (e) => {
        const newDirection = document.getElementById("newDirection");
        newDirection.setCustomValidity("");
        setNewDirection(e.target.value);
    };

    const handleNewDirection = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            directions: [...formData.directions, newDirection],
        });

        setNewDirection("");
    };

    const handleDirectionChange = (e) => {
        const directions = [...formData.directions];
        directions[e.target.name] = e.target.value;

        setFormData({
            ...formData,
            directions: directions,
        });
    };

    const handleDeleteDirection = (e) => {
        const directions = [...formData.directions];
        directions.splice(e.target.id, 1);
        setFormData({
            ...formData,
            directions: directions,
        });
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.target.value;
            if (!value.trim()) return;
            setFormData({ ...formData, tags: [...formData.tags, value] });
            e.target.value = "";
        }

        if (e.key === "Backspace") {
            if (e.target.value.length === 0) {
                let currentTags = [...formData.tags];
                currentTags.pop();
                setFormData({
                    ...formData,
                    tags: [...currentTags],
                });
            }
        }

        return;
    };

    const removeTag = (index) => {
        setFormData({
            ...formData,
            tags: [...formData.tags.filter((el, i) => i !== index)],
        });
    };

    const handleCuisineChange = (e) => {
        setFormData({ ...formData, cuisine: e.value });
    };
    const handleDietChange = (e) => {
        const selectedDiets = [];
        e.forEach((diet) => selectedDiets.push(diet.value));
        setFormData({ ...formData, diets: [...selectedDiets] });
    };

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
                    nutrition: {
                        ...formData.nutrition,
                        calories: formData.nutrition.calories + "cal",
                        fat: formData.nutrition.fat + "g",
                        satFat: formData.nutrition.satFat + "g",
                        sodium: formData.nutrition.sodium + "mg",
                        protein: formData.nutrition.protein + "g",
                        carbohydrates: formData.nutrition.carbohydrates + "g",
                        sugar: formData.nutrition.sugar + "g",
                        cholesterol: formData.nutrition.cholesterol + "mg",
                    },
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
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg font-semibold">
                        Title{" "}
                        <span className="text-sm text-red-600">(Required)</span>
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="title"
                        className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-[#d0ecdf] focus:ring-0 text-sm"
                        value={formData.title}
                        required
                    />
                </div>
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

                <div className="flex flex-col">
                    <label
                        htmlFor="description"
                        className="text-lg font-semibold"
                    >
                        Description{" "}
                        <span className="text-sm text-red-600">(Required)</span>
                    </label>
                    <textarea
                        onChange={handleChange}
                        rows="2"
                        name="description"
                        className="p-1 border-2 border-[#96ceb4] focus:border-[#d0ecdf] focus:ring-0 text-sm rounded-sm w-full"
                        value={formData.text}
                        required
                    />
                </div>

                {/* Timers */}
                <div className="flex flex-col justify-between space-y-4 md:space-y-0 md:flex-row md:space-x-8">
                    <div>
                        <label htmlFor="prep" className="text-lg font-semibold">
                            Preperation Time{" "}
                            <span className="text-sm text-red-600">
                                (Required)
                            </span>
                        </label>
                        <input
                            onChange={handleTimeChange}
                            type="number"
                            name="prep"
                            className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-[#d0ecdf] focus:ring-0 text-sm w-full"
                            value={formData.time.prep}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cook" className="text-lg font-semibold">
                            Cook Time{" "}
                            <span className="text-sm text-red-600">
                                (Required)
                            </span>
                        </label>
                        <input
                            onChange={handleTimeChange}
                            type="number"
                            name="cook"
                            className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-[#d0ecdf] focus:ring-0 text-sm w-full"
                            value={formData.time.cook}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="title"
                            className="text-lg font-semibold"
                        >
                            Servings{" "}
                            <span className="text-sm text-red-600">
                                (Required)
                            </span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="number"
                            name="servings"
                            className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-[#d0ecdf] focus:ring-0 text-sm w-full"
                            value={formData.servings}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Ingredients & Nutrition */}
            <div className="grid gap-8 grid-cols-1">
                {/* Ingredients */}
                <div>
                    <h1 className="text-lg font-semibold py-2">
                        Ingredients{" "}
                        <span className="text-sm text-red-600">(Required)</span>
                    </h1>
                    <div className="flex space-x-1 my-4 items-center justify-between tracking-wide text-[#96ceb4] px-2 capitalize">
                        <span>Ingredient</span>
                        <span>Quantity</span>
                    </div>

                    {Object.entries(formData.ingredients).map(
                        ([key, value]) => {
                            return (
                                <IngredientInput
                                    key={key}
                                    title={key}
                                    name={key}
                                    quantity={value}
                                    handleChange={handleIngredientChange}
                                    deleteIngredient={handleDeleteIngredient}
                                />
                            );
                        }
                    )}

                    {/* New Ingredient */}
                    <div
                        onKeyDown={handleIngredientKeyDown}
                        className="flex space-x-1 py-2 items-center justify-between tracking-wide font-light pl-1 pr-2 bg-green-200"
                    >
                        <input
                            className="bg-green-100 p-2 w-full text-sm outline-none border-2 border-transparent focus:border-green-400"
                            placeholder="Enter Ingredient"
                            value={newIngredientName}
                            onChange={handleNewIngrdientName}
                            id="newIngredient"
                            minLength={1}
                        />
                        <div className="flex space-x-2 items-center">
                            <input
                                className="bg-green-100 border-2 border-transparent focus:ring-0 text-end w-[115px] p-2 text-sm outline-none focus:border-green-400"
                                value={newIngredientQuantity}
                                placeholder="Enter Quantity"
                                onChange={handleNewIngrdientQuantity}
                            />
                            <button
                                type="button"
                                className="cursor-pointer select-none px-4 text-green-500"
                                onClick={handleNewIngredient}
                            >
                                <PlusIcon className="w-[20px]" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nutrition */}
                <div className="h-fit border border-[#d9534f] rounded-md py-2 px-4 grow-0 w-fit mx-auto">
                    <h1 className="text-lg font-semibold ">
                        Nutritional Info{" "}
                        <span className="text-sm text-red-600">(Required)</span>
                    </h1>

                    <NutrionInput
                        title="calories"
                        measurement="Cal"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.calories}
                    />

                    <NutrionInput
                        title="fat"
                        measurement="g"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.fat}
                    />

                    <NutrionInput
                        title="satFat"
                        measurement="g"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.satFat}
                    />

                    <NutrionInput
                        title="sodium"
                        measurement="mg"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.sodium}
                    />

                    <NutrionInput
                        title="protein"
                        measurement="g"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.protein}
                    />

                    <NutrionInput
                        title="carbohydrates"
                        measurement="g"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.carbohydrates}
                    />

                    <NutrionInput
                        title="sugar"
                        measurement="g"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.sugar}
                    />

                    <NutrionInput
                        title="cholesterol"
                        measurement="mg"
                        handleChange={handleNutritionChange}
                        value={formData.nutrition.cholesterol}
                    />
                </div>
            </div>

            {/* Directions */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-lg font-semibold py-2">
                    Directions{" "}
                    <span className="text-sm text-red-600">(Required)</span>
                </h1>

                {formData.directions.map((direction, index) => {
                    return (
                        <DirectionsInput
                            key={index}
                            direction={direction}
                            index={index}
                            handleChange={handleDirectionChange}
                            deleteDirection={handleDeleteDirection}
                        />
                    );
                })}

                <div
                    className="flex space-x-1 py-2 items-center justify-between tracking-wide font-light pl-1 pr-2 bg-yellow-200"
                    onKeyDown={handleDirectionKeydown}
                >
                    <input
                        className="bg-yellow-100 p-2 w-full text-sm outline-none border-2 border-transparent focus:border-yellow-300"
                        placeholder="Enter Direction"
                        value={newDirection}
                        onChange={handleNewDirectionChange}
                        minLength={1}
                        id="newDirection"
                    />
                    <button
                        type="button"
                        className="cursor-pointer select-none px-4"
                        onClick={handleNewDirection}
                    >
                        <PlusIcon className="w-[20px]" />
                    </button>
                </div>
            </div>

            {/* Tags */}
            <div>
                <h1 className="text-lg font-semibold py-2">
                    Tags
                    <span className="text-sm italic text-gray-500">
                        {" "}
                        (Breakfast, vegetarian, healthy, etc)
                    </span>
                </h1>
                <div className="border border-green-200 p-2 rounded-lg max-w-full flex items-center flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                        <TagsInput
                            tag={tag}
                            index={index}
                            deleteTag={removeTag}
                            key={index}
                        />
                    ))}
                    <input
                        type="text"
                        placeholder="Enter tag"
                        className="grow py-2 border-none outline-none focus:ring-0 bg-yellow-50 rounded-lg"
                        onKeyDown={handleTagKeyDown}
                    />
                </div>
            </div>

            {/* Cuisines, Diets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="prep" className="text-lg font-semibold">
                        Cuisine
                    </label>
                    <Select
                        name="cuisine"
                        options={CUISINES}
                        className="w-full"
                        isSearchable={false}
                        placeholder="Select Cuisine"
                        onChange={handleCuisineChange}
                    />
                </div>
                <div>
                    <label htmlFor="prep" className="text-lg font-semibold">
                        Diets
                    </label>
                    <Select
                        isMulti
                        name="diets"
                        options={DIETS}
                        className="w-full"
                        isSearchable={false}
                        placeholder="Select Diet"
                        onChange={handleDietChange}
                    />
                </div>
            </div>

            {/* Image & Submit */}
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
