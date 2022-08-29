import React from "react";
import Select from "react-select";
import { DIETS } from "../../ConstantVariables/Diets";
import { CUISINES } from "../../ConstantVariables/Cuisines";

const CuisinesDiet = ({ formData, setUpdatedForm }) => {
    const handleCuisineChange = (e) => {
        setUpdatedForm({ ...formData, cuisine: e.value });
    };
    const handleDietChange = (e) => {
        const selectedDiets = [];
        e.forEach((diet) => selectedDiets.push(diet.value));
        setUpdatedForm({ ...formData, diets: [...selectedDiets] });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label htmlFor="prep" className="text-lg font-semibold">
                    Cuisine
                </label>
                <Select
                    value={CUISINES.filter(
                        (option) => option.label === formData.cuisine
                    )}
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
                    value={DIETS.filter(
                        (option) => option.label === formData.diets
                    )}
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
    );
};

export default CuisinesDiet;
