import React from "react";
import Direction from "./Direction";

const RecipeDirections = ({ recipe }) => {
    return (
        <div className="py-4">
            <h3 className="text-2xl font-medium">Directions</h3>
            <div className="flex flex-col justify-center space-y-8 my-8">
                {Object.entries(recipe.directions).map((direction, index) => {
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
    );
};

export default RecipeDirections;
