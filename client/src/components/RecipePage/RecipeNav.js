import React from "react";

const RecipeNav = ({ nav, active, handleNavClick }) => {
    return (
        <div
            onClick={() => handleNavClick(nav)}
            className={`${
                active ? "border-l-2 bg-green-300 border-green-600" : ""
            } bg-green-200 px-4 w-[10/12] py-2 cursor-pointer hover:bg-green-400 transition-all duration-200 text-sm`}
        >
            {nav}
        </div>
    );
};

export default RecipeNav;
