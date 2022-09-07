import React from "react";
import CategoriesColumn from "../components/GlobalComponents/CategoriesColumn";

const diets = [
    "Atkins",
    "DASH",
    "Dukan Diet",
    "Flexitarian",
    "Ketogenic",
    "Low-Carb",
    "Low-Fat",
    "Mediterranean",
    "Paleo",
    "Vegan",
    "Vegetarian",
    "Whole 30",
];

const DietsPage = () => {
    return (
        <div className="h-fit min-h-[calc(100vh-318px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl">
            <h1 className="text-4xl font-semibold md:text-5xl">Diets</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 mx-auto justify-center">
                <CategoriesColumn list={diets.slice(0, 4)} />
                <CategoriesColumn list={diets.slice(4, 8)} />
                <CategoriesColumn list={diets.slice(8, 12)} />
            </div>
        </div>
    );
};

export default DietsPage;
