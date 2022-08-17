import React from "react";

const IngredientInput = ({
    quantity,
    title,
    handleChange,
    deleteIngredient,
}) => {
    return (
        <div className="flex space-x-1 py-1 items-center justify-between tracking-wide font-light px-2 capitalize border-0 border-b-2 border-green-200">
            <span>{title}</span>
            <div className="flex items-center space-x-2">
                <input
                    className="bg-green-100 border-2 border-transparent focus:ring-0 text-end w-[115px] p-2 outline-none focus:border-green-400"
                    name={title}
                    value={quantity}
                    onChange={handleChange}
                />
                <div
                    id={title}
                    onClick={deleteIngredient}
                    className="cursor-pointer select-none text-red-500"
                >
                    [x]
                </div>
            </div>
        </div>
    );
};

export default IngredientInput;
