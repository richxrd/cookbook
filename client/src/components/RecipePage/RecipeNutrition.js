import React from "react";
import Nutrition from "./Nutrition";

const RecipeNutrition = ({ recipe }) => {
    return (
        <div className="w-[320px] h-fit border border-[#d9534f] rounded-md p-4 grow-0">
            <h3 className="text-2xl font-medium">Nutritional Info</h3>
            {Object.entries(recipe.nutrition).map(([key, value]) => {
                return (
                    <Nutrition
                        key={key}
                        name={key}
                        value={value}
                        measurement={key}
                    />
                );
            })}
        </div>
    );
};

export default RecipeNutrition;
