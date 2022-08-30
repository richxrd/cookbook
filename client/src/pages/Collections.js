import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import LoadingPage from "../components/GlobalComponents/LoadingPage";
import CollectionsRecipeCard from "../components/CollectionsPage/CollectionsRecipeCard";

import { getUser } from "../api/user";
import { deleteCollection, getCollection } from "../api/collections";

const Collections = () => {
    const [userData, setUserData] = useState(null);
    const [collection, setCollection] = useState(null);
    const [recipes, setRecipes] = useState(null);

    const auth = useSelector((state) => state.user.authData?.result);
    const { uniqueId, collectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getUser(uniqueId);
            setUserData(data.result);
        };
        getData();
    }, [uniqueId]);

    useEffect(() => {}, [collection]);
    useEffect(() => {
        if (collectionId === "liked") {
            setCollection(userData?.likes);
            setRecipes(userData?.likes);
        } else {
            if (userData) {
                const getData = async () => {
                    const collectionsData = await getCollection(collectionId);
                    setCollection(collectionsData.result);
                    setRecipes(collectionsData.result.recipes);
                };

                getData();
            }
        }
    }, [userData]);

    const handleCollectionDelete = async (e) => {
        e.preventDefault();

        await deleteCollection(collectionId);
        navigate(`/user/${userData?.uniqueId}`);
    };

    const hasData = () => {
        return userData && collection;
    };

    return hasData() ? (
        <div className="min-h-[calc(100vh-318px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl">
            <div className="flex flex-col space-y-4 justify-between items-center md:flex-row md:space-y-0 ">
                {/* Title */}
                <div className="flex flex-col space-y-2">
                    <h2 className="text-4xl font-semibold tracking-wide">
                        {collectionId === "liked"
                            ? "Liked Posts"
                            : collection.name}
                    </h2>
                    <h3
                        className="text-base flex items-center space-x-2 cursor-pointer"
                        onClick={() => navigate(`/user/${userData.uniqueId}`)}
                    >
                        <span>
                            <img
                                src={userData.image}
                                alt=""
                                className="w-8 rounded-full"
                            />
                        </span>
                        <span className="text-red-400">{userData.name}</span>
                    </h3>
                </div>
                {collectionId !== "liked" && userData._id === auth?._id && (
                    <button
                        type="button"
                        onClick={handleCollectionDelete}
                        className="py-1 px-4 bg-red-200 rounded-lg text-base"
                    >
                        Delete
                    </button>
                )}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start my-4">
                {recipes.length > 0 &&
                    recipes.map((recipe) => {
                        return (
                            <CollectionsRecipeCard
                                recipe={recipe}
                                key={recipe}
                                userData={userData}
                                setCollection={setCollection}
                                setRecipes={setRecipes}
                            />
                        );
                    })}
            </div>
        </div>
    ) : (
        <div>
            <LoadingPage />
        </div>
    );
};

export default Collections;
