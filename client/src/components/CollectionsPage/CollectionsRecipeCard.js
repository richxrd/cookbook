import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPost } from "../../api/posts";
import Rating from "../GlobalComponents/Rating";

const CollectionsRecipeCard = ({ recipe }) => {
    const [recipeData, setRecipeData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getPost(recipe);
            setRecipeData(data);
        };
        getData();
    }, []);

    const hasData = () => {
        return recipeData;
    };

    return (
        hasData() && (
            <div className="flex flex-col w-[290px] aspect-square mx-2 mb-4 h-fit shadow-lg cursor-pointer rounded-lg relative group hover:scale-[1.02] hover:shadow-2xl transition duration-200">
                {/* img */}
                <img
                    src={recipeData.imageUrl}
                    alt=""
                    className="object-cover w-full h-80 rounded-lg"
                    onClick={() => navigate(`/${recipeData._id}`)}
                />

                <div
                    className="p-2 text-sm absolute bottom-0 bg-green-200 w-full rounded-b-lg"
                    onClick={() => navigate(`/${recipeData._id}`)}
                >
                    <h2 className="text-base font-semibold truncate">
                        {recipeData.title}
                    </h2>
                    <Rating
                        ratingsList={Object.entries(recipeData.reviews)}
                        full
                    />
                </div>
            </div>
        )
    );
};

export default CollectionsRecipeCard;
