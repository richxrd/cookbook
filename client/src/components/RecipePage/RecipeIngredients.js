import React from "react";
import Ingredient from "./Ingredient";

const RecipeIngredients = ({ recipe }) => {
    return (
        <div className="w-full h-fit py-4 grow">
            <h3 className="text-2xl font-medium">Ingredients</h3>
            {/* Ingredients list */}
            {Object.entries(recipe.ingredients).map(([key, value]) => {
                return <Ingredient key={key} name={key} quantity={value} />;
            })}
        </div>
    );
};

export default RecipeIngredients;
