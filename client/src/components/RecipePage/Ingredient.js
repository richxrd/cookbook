import React from "react";

const Ingredient = ({ name, quantity }) => {
    return (
        <div className="flex space-x-1 my-4 items-center tracking-wide font-light">
            <input
                type="checkbox"
                className="bg-white hover:bg-[#ecb390] cursor-pointer 
                w-6 h-6 border-3 border-[rgb(217,83,79)] rounded-lg 
                checked:bg-[#96ceb4] active:bg-[#96ceb4] focus:bg-[#96ceb4] outline-none"
            />
            {quantity && <span className="pl-2">{quantity}</span>}
            <span>{name}</span>
        </div>
    );
};

export default Ingredient;
