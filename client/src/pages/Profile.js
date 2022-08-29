import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import CollectionsCard from "../components/Profile/CollectionsCard";
import FollowCard from "../components/Profile/FollowCard";
import LoadingPage from "../components/GlobalComponents/LoadingPage";

import ProfileRecipeCard from "../components/Profile/ProfileRecipeCard";
import { getUser, followUser, updateBio, addCollection } from "../api/user";

const Profile = () => {
    // State Variables
    const [userData, setUserData] = useState(null);
    const [profileView, setProfileView] = useState("recipes");
    const [recipes, setRecipes] = useState([]);
    const [userBio, setUserBio] = useState("");
    const [editBio, setEditBio] = useState(false);
    const [newCollection, setNewCollection] = useState(false);
    const [collectionName, setCollectionName] = useState("");

    const authData = useSelector((state) => state.user?.authData?.result);

    const { uniqueId } = useParams(); // User uniqueId

    useEffect(() => {
        const getData = async () => {
            const data = await getUser(uniqueId);
            setUserData(data.result);

            const orderedRecipes = [
                ...data.recipes.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                ),
            ];
            setRecipes(orderedRecipes);
            setProfileView("recipes");
        };

        getData();
    }, [uniqueId]);

    useEffect(() => {}, [userData]);
    useEffect(() => {}, [authData]);
    useEffect(() => {}, [recipes]);

    const handleEditBioBtn = (e) => {
        setEditBio(!editBio);
        if (!editBio) {
            setUserBio(userData?.bio);
        }
    };

    const handleBioChange = (e) => {
        e.preventDefault();
        setUserBio(e.target.value);
    };

    const handleBioSubmit = async (e) => {
        e.preventDefault();
        setEditBio(false);
        const newBio = {
            googleId: userData?.googleId,
            bio: userBio,
        };

        const data = await updateBio(newBio);
        setUserData(data.user);
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
        const data = await addCollection(newCollectionForm);
        setUserBio(data.result);
    };

    const handleProfileView = (e) => {
        e.preventDefault();
        setProfileView(e.target.value);
        setCollectionName("");
        setNewCollection(false);
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

    const handleFollow = (e) => {
        e.preventDefault();
        const form = {
            sender: authData._id,
            receiver: userData._id,
        };
        const follow = async () => {
            const newUser = await followUser(form);
            setUserData(newUser.user);
        };
        follow();
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

    // Helper
    const avgRating = (recipe) => {
        return (
            Object.entries(recipe.reviews).reduce(
                (sum, curr) => sum + parseInt(curr[1].rate),
                0
            ) / Object.entries(recipe.reviews).length
        );
    };

    const hasData = () => {
        return userData;
    };

    return hasData() ? (
        <div className="min-h-[calc(100vh-318px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-4xl font-semibold tracking-wide">
                    {userData?.name}
                </h2>
                <img
                    className="w-72 h-72 object-cover"
                    src={userData?.image}
                    alt="/"
                    referrerPolicy="no-referrer"
                />

                <div className="max-w-[18rem]">
                    <div className="flex justify-between">
                        <h1 className="text-lg">About</h1>
                        {authData?.googleId === userData?.googleId && (
                            <button
                                type="button"
                                className="text-xs px-4 bg-[#f5eedc] hover:bg-[#ecb390] rounded-md"
                                onClick={handleEditBioBtn}
                            >
                                Edit Bio
                            </button>
                        )}
                    </div>
                    {!editBio ? (
                        <p className="text-sm font-light w-72">
                            {userData?.bio.length === 0
                                ? "User has no bio"
                                : userData?.bio}
                        </p>
                    ) : (
                        <form
                            className="mt-2 w-72 flex flex-col space-y-2"
                            onSubmit={handleBioSubmit}
                        >
                            <textarea
                                rows="6"
                                className="border-green-600 border w-full outline-none focus:ring-0 text-sm"
                                value={userBio}
                                onChange={handleBioChange}
                            />
                            <button className="bg-green-300 py-2 rounded-sm text-sm">
                                Update Bio
                            </button>
                        </form>
                    )}
                </div>

                {/* Follow Button */}
                {authData && authData.googleId !== userData.googleId && (
                    <button
                        type="button"
                        className={`${
                            userData.followers.filter(
                                (person) => person === authData._id
                            ).length === 0
                                ? "bg-[#f5eedc] hover:bg-[#ecb390]"
                                : "hover:bg-[#f5eedc] bg-[#ecb390]"
                        } py-2 mt-2 w-full max-w-[18rem] rounded-md text-base transition duration-200`}
                        onClick={handleFollow}
                    >
                        {userData.followers.filter(
                            (person) => person === authData._id
                        ).length === 0
                            ? "Follow"
                            : "Unfollow"}
                    </button>
                )}

                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={handleProfileView}
                            disabled={userData?.followers?.length === 0}
                            value="followers"
                            className="text-base py-1 px-3 bg-red-200 rounded-md hover:bg-[#d9534f] transition duration-200 disabled:bg-slate-200 disabled:text-slate-500"
                        >
                            Followers
                        </button>
                        <button
                            onClick={handleProfileView}
                            disabled={userData?.following?.length === 0}
                            value="following"
                            className="text-base py-1 px-3 bg-red-200 rounded-md hover:bg-[#d9534f] transition duration-200 disabled:bg-slate-200 disabled:text-slate-500"
                        >
                            Following
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={handleProfileView}
                            value="recipes"
                            className="text-base py-1 px-3 bg-green-200 rounded-md hover:bg-green-300 transition duration-200"
                        >
                            Recipes
                        </button>
                        <button
                            onClick={handleProfileView}
                            value="collections"
                            className="text-base py-1 px-3 bg-green-200 rounded-md hover:bg-green-300 transition duration-200"
                        >
                            Collections
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full">
                {/* Nav */}

                {/* Profile View */}
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
                            recipes.map((recipe) => {
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
                                userId={uniqueId}
                                id={"liked"}
                                updateUser={setUserData}
                            />
                        )}

                        {profileView === "collections" &&
                            userData.collections.map((collection) => {
                                return (
                                    <CollectionsCard
                                        key={collection._id}
                                        collection={collection}
                                        userId={uniqueId}
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
            </div>
        </div>
    ) : (
        <div>
            <LoadingPage />
        </div>
    );
};

export default Profile;
