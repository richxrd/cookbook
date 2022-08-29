import React from "react";
import NutrionInput from "./NutrionInput";

const NutritionSection = ({ formData, setUpdatedForm }) => {
    const handleNutritionChange = (e) => {
        setUpdatedForm({
            ...formData,
            nutrition: {
                ...formData.nutrition,
                [e.target.name]: e.target.value,
            },
        });
    };

    return (
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
    );
};

export default NutritionSection;
