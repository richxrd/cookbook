import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";

import { getPosts } from "../../api/posts";

const HomeRow = ({ category }) => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const searchData = {
                title: "",
                tags: [category.toLowerCase()],
            };

            const data = await getPosts(searchData);
            setRecipes(data);
        };

        getData();
    }, []);

    return (
        recipes && (
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
                    {recipes
                        .filter((_, idx) => idx < 2)
                        .map((recipe) => (
                            <HomeCard key={recipe._id} recipe={recipe} />
                        ))}
                </div>
            </div>
        )
    );
};

export default HomeRow;
