import React from "react";
import HomeCard from "./HomeCard";

import TEST_DATA from "../../testData";

const HomeRow = ({ category }) => {
    return (
        <div className="flex flex-col space-y-2">
            {/* Title */}
            <div className="flex justify-between items-baseline">
                <h1 className="text-2xl font-medium tracking-wide uppercase text-[#33e08a]">
                    {category}
                </h1>

                <button
                    type="button"
                    className="text-base font-medium tracking-wide uppercase text-[#96ceb4]"
                >
                    View More
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {TEST_DATA.filter((_, idx) => idx < 2).map((recipe) => (
                    <HomeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default HomeRow;
