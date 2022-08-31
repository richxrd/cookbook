import React, { useEffect, useState } from "react";
import Select from "react-select";
import { addCollection } from "../../api/collections";
import CollectionsCard from "./CollectionsCard";
import FollowCard from "./FollowCard";
import ProfileRecipeCard from "./ProfileRecipeCard";

const ProfileView = ({
    authData,
    userData,
    profileView,
    recipes,
    collections,
    setRecipes,
    setUserData,
    setCollections,
}) => {
    const [newCollection, setNewCollection] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [visibleRecipes, setVisibleRecipes] = useState(9);

    useEffect(() => {
        window.addEventListener("scroll", handleRecipeScroll);
    }, []);

    useEffect(() => {
        setCollectionName("");
        setNewCollection(false);
    }, [profileView]);

    const handleRecipeScroll = (e) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight - 150
        ) {
            setVisibleRecipes((visibleRecipes) => visibleRecipes + 6);
        }
    };

    const handleNewCollection = (e) => {
        setNewCollection(!newCollection);
    };

    const handleCollectionName = (e) => {
        setCollectionName(e.target.value);
    };

    const handleNewCollectionSubmit = async (e) => {
        e.preventDefault();
        const newCollectionForm = {
            googleId: authData.googleId,
            collectionName: collectionName,
        };
        setNewCollection(false);
        setCollectionName("");
        const data = await addCollection(newCollectionForm);
        setCollections(data.collections);
        setUserData(data.result);
    };

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

    // Render Helpers
    const renderFollowerCards = () => {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {userData.followers.map((id) => {
                    return <FollowCard key={id} id={id} />;
                })}
            </div>
        );
    };

    const renderFollowingCards = () => {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {userData.following.map((id) => {
                    return <FollowCard key={id} id={id} />;
                })}
            </div>
        );
    };

    const avgRating = (recipe) => {
        return (
            Object.entries(recipe.reviews).reduce(
                (sum, curr) => sum + parseInt(curr[1].rate),
                0
            ) / Object.entries(recipe.reviews).length
        );
    };

    return (
        <div className="py-8">
            <div className="flex flex-col items-center justify-between md:flex-row md:items-baseline mb-4">
                <h1 className="text-2xl capitalize font-semibold my-4">
                    {profileView}
                </h1>

                {/* Recipes Sort */}
                {profileView === "recipes" && (
                    <Select
                        isMulti={false}
                        className="w-40"
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
                )}

                {/* New Collection */}
                {profileView === "collections" && (
                    <div className="flex flex-col items-center md:items-end">
                        {authData?.googleId === userData?.googleId && (
                            <button
                                type="button"
                                className="py-1 px-4 bg-[#f5eedc] hover:bg-[#ecb390] rounded-md"
                                onClick={handleNewCollection}
                            >
                                New Collection
                            </button>
                        )}
                        {newCollection && (
                            <form
                                className="mt-2 w-72 flex flex-col space-y-2 absolute top-[50rem] md:top-56 z-10 bg-[#f5eedc] p-4 drop-shadow-xl rounded-md"
                                onSubmit={handleNewCollectionSubmit}
                            >
                                <input
                                    className="p-2 border w-full outline-none focus:ring-0 text-sm"
                                    minLength="1"
                                    maxLength="16"
                                    value={collectionName}
                                    onChange={handleCollectionName}
                                    required
                                />
                                <button className="bg-green-300 py-2 rounded-sm text-sm">
                                    Add New Collection
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Recipes View */}
                {profileView === "recipes" &&
                    recipes.slice(0, visibleRecipes).map((recipe) => {
                        return (
                            <ProfileRecipeCard
                                key={recipe._id}
                                recipe={recipe}
                            />
                        );
                    })}

                {/* Collections View */}
                {profileView === "collections" && (
                    <CollectionsCard
                        key="likes"
                        collection={{
                            name: "Liked Recipes",
                            recipes: userData.likes,
                        }}
                        userId={userData.uniqueId}
                        id={"liked"}
                        updateUser={setUserData}
                    />
                )}

                {profileView === "collections" &&
                    collections.map((collection) => {
                        return (
                            <CollectionsCard
                                key={collection._id}
                                collection={collection}
                                userId={userData.uniqueId}
                                id={collection._id}
                                updateUser={setUserData}
                            />
                        );
                    })}
            </div>

            {/* Followers & Following */}
            <div>
                {/* Followers view */}

                {profileView === "followers" &&
                    userData?.followers?.length === 0 && (
                        <div className="text-base font-light">
                            User has no followers
                        </div>
                    )}

                {profileView === "followers" && renderFollowerCards()}

                {/* Following View */}
                {profileView === "following" &&
                    userData?.following?.length === 0 && (
                        <div className="text-base font-light">
                            User is not following anyone
                        </div>
                    )}

                {profileView === "following" && renderFollowingCards()}
            </div>
        </div>
    );
};

export default ProfileView;
