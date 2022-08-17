import React from "react";

const NutrionInput = ({ title, measurement, handleChange }) => {
    return (
        <div className="flex justify-between my-4 items-center space-x-8 tracking-wide font-light border-0 border-b-2 border-[#ecb390]">
            <span className="capitalize">{title}</span>
            <div className="flex justify-between w-[115px]">
                <input
                    name={title}
                    type="number"
                    className="p-2 w-20 h-6 bg-green-100 border-none focus:ring-0 text-end"
                    onChange={handleChange}
                />
                <span>{measurement}</span>
            </div>
        </div>
    );
};

export default NutrionInput;
