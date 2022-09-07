import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { getAllPosts } from "../api/posts";
import ExploreRecipeCard from "../components/Explore/ExploreRecipeCard";

const Explore = () => {
    const [recipes, setRecipes] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleRecipes, setVisibleRecipes] = useState(9);

    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", handleRecipeScroll);

        if (window.innerWidth > 1025) {
            setVisibleRecipes(12);
        }
    }, []);

    const handleRecipeScroll = (e) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight - 150
        ) {
            setVisibleRecipes((visibleRecipes) => visibleRecipes + 6);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getAllPosts();

            const orderedRecipes = [
                ...data.sort((a, b) => new Date(b.date) - new Date(a.date)),
            ];

            setRecipes(orderedRecipes);
        };
        getData();
    }, []);

    const handleRecipesSort = (e) => {
        if (e.value === "rated") {
            const newRecipes = [
                ...recipes.sort(
                    (a, b) => parseInt(avgRating(b)) - parseInt(avgRating(a))
                ),
            ];
            setRecipes(newRecipes);
        } else if (e.value === "liked") {
            const newRecipes = [
                ...recipes.sort(
                    (a, b) =>
                        parseInt(b.likes.length) - parseInt(a.likes.length)
                ),
            ];
            setRecipes(newRecipes);
        } else if (e.value === "newest") {
            const newRecipes = [
                ...recipes.sort((a, b) => new Date(b.date) - new Date(a.date)),
            ];
            setRecipes(newRecipes);
        } else if (e.value === "oldest") {
            const newRecipes = [
                ...recipes.sort((a, b) => new Date(a.date) - new Date(b.date)),
            ];
            setRecipes(newRecipes);
        }
    };

    const avgRating = (recipe) => {
        return (
            Object.entries(recipe.reviews).reduce(
                (sum, curr) => sum + parseInt(curr[1].rate),
                0
            ) / Object.entries(recipe.reviews).length
        );
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/explore/${searchTerm || "none"}`);
        navigate(0);
    };

    const renderSort = () => {
        return (
            <Select
                isMulti={false}
                className="w-full h-10"
                name="recipesSort"
                options={[
                    {
                        value: "liked",
                        label: "Most Liked",
                    },
                    { value: "rated", label: "Top Rated" },
                    { value: "newest", label: "Newest" },
                    { value: "oldest", label: "Oldest" },
                ]}
                isSearchable={false}
                placeholder="Sort"
                onChange={handleRecipesSort}
            />
        );
    };

    return recipes ? (
        <div className="min-h-[calc(100vh-318px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl flex flex-col space-y-8">
            <h2 className="text-4xl font-semibold tracking-wide">
                Search Recipes
            </h2>

            <div className="grid grid-cols-4 gap-4">
                {/* Filters */}
                {/* <div className="col-span-1 bg-slate-50 h-[500px] hidden md:block">
                        Filters
                    </div> */}

                {/* Searchbar */}
                <div className="col-span-4 md:col-span-4 flex flex-col space-y-4 ">
                    <form
                        className="md:h-10 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            className="w-full border-green-400 focus:border-green-600 focus:ring-0 rounded-md"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />

                        <button
                            type="submit"
                            className="px-8 h-10 shadow-sm bg-green-200 hover:bg-green-400 hover:shadow-lg cursor-pointer rounded-md transition duration-200"
                        >
                            Search
                        </button>
                        <div className="w-60 hidden md:block">
                            {renderSort()}
                        </div>

                        {/* <button className="w-full h-10 shadow-sm bg-[#ecb390] hover:bg-[#e7762b] hover:shadow-lg cursor-pointer rounded-md transition duration-200 md:hidden">
                                Filters
                            </button> */}
                    </form>
                    <div className="md:hidden">{renderSort()}</div>
                    <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {recipes.slice(0, visibleRecipes).map((recipe) => {
                            return (
                                <ExploreRecipeCard
                                    recipe={recipe}
                                    key={recipe._id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[calc(100vh-318px)]"></div>
    );
};

export default Explore;
