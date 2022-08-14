import React from "react";
import CategoryCard from "./CategoryCard";

import TEST_DATA from "../testData";

const HomeRow = ({ category }) => {
    return (
        <div className="flex flex-col space-y-2">
            {/* Title */}
            <div>
                <h1 className="text-2xl font-medium tracking-wide uppercase text-[#96ceb4]">
                    {category}
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {TEST_DATA.map((recipe) => (
                    <CategoryCard
                        key={recipe.id}
                        title={recipe.title}
                        author={recipe.author}
                        image={recipe.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeRow;
