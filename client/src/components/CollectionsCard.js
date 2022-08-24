import React from "react";
import { useNavigate } from "react-router-dom";

const CollectionsCard = ({ collection, userId, id }) => {
    const navigate = useNavigate();
    const createCollectionImg = () => {
        return collection.recipes.length === 0 ? (
            <div className="w-full h-full bg-gradient-to-t from-neutral-300 to-neutral-600"></div>
        ) : (
            <div className="grid grid-rows-2 grid-cols-2">
                {collection
                    .filter((_, idx) => idx < 3)
                    .map((recipe) => {
                        return (
                            <img
                                src={recipe.image}
                                className="w-full h-full object-cover opacity-80"
                                key={recipe.id}
                                alt="/"
                            />
                        );
                    })}
            </div>
        );
    };
    return (
        <div
            onClick={() => navigate(`/user/${userId}/collection/${id}`)}
            className="w-full aspect-square bg-white drop-shadow-lg hover:drop-shadow-2xl transition duration-200 relative cursor-pointer"
        >
            {createCollectionImg()}
            <div className="absolute left-0 top-0 p-4 w-full h-full">
                <h1 className="text-2xl text-white font-semibold tracking-wider drop-shadow-xl">
                    {collection.name}
                </h1>
            </div>
        </div>
    );
};

export default CollectionsCard;
