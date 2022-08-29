import { PlusIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import IngredientInput from "./IngredientInput";

const IngredientsSection = ({ setUpdatedForm, formData }) => {
    const [newIngredientName, setNewIngredientName] = useState("");
    const [newIngredientQuantity, setNewIngredientQuantity] = useState("");

    const resetIngredientForm = () => {
        setNewIngredientName("");
        setNewIngredientQuantity("");
    };

    const handleIngredientChange = (e) => {
        setUpdatedForm({
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
        setUpdatedForm(newFormData);
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
            setUpdatedForm({
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
        setUpdatedForm({
            ...formData,
            ingredients: {
                ...formData.ingredients,
                [newIngredientName]: newIngredientQuantity,
            },
        });
        resetIngredientForm();
    };

    return (
        <div>
            <h1 className="text-lg font-semibold py-2">
                Ingredients{" "}
                <span className="text-sm text-red-600">(Required)</span>
            </h1>
            <div className="flex space-x-1 my-4 items-center justify-between tracking-wide text-[#96ceb4] px-2 capitalize">
                <span>Ingredient</span>
                <span>Quantity</span>
            </div>

            {Object.entries(formData.ingredients).map(([key, value]) => {
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
            })}

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
    );
};

export default IngredientsSection;
