import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import ProfileRecipeCard from "../components/ProfileRecipeCard";
import { getUser, updatebio } from "../store/user/userActions";

import TEST_DATA from "../testData";

const Profile = () => {
    // State Variables
    const [auth, setAuth] = useState(
        useSelector((state) => state.user.authData?.result)
    );
    const [user, setUser] = useState(
        useSelector((state) => state.user.userData?.result)
    );
    const [profileView, setProfileView] = useState("recipes");
    const [recipes, setRecipes] = useState([
        ...TEST_DATA.sort((a, b) => b.id - a.id),
    ]);
    const [userBio, setUserBio] = useState(user?.bio);
    const [editBio, setEditBio] = useState(false);

    const userData = useSelector((state) => state.user.userData?.result); // Get updates to userData

    const { uniqueId } = useParams(); // User uniqueId
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser(uniqueId));
    }, [uniqueId]);

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    useEffect(() => {}, [recipes]);

    if (!user) {
        navigate(0);
    }

    const handleEditBioBtn = (e) => {
        setEditBio(!editBio);
        if (!editBio) {
            setUserBio(user?.bio);
        }
    };

    const handleBioChange = (e) => {
        e.preventDefault();
        setUserBio(e.target.value);
    };

    const handleBioSubmit = (e) => {
        e.preventDefault();
        setEditBio(false);
        const newBio = {
            googleId: user?.googleId,
            bio: userBio,
        };
        dispatch(updatebio(newBio, navigate));
    };

    const handleProfileView = (e) => {
        e.preventDefault();
        setProfileView(e.target.value);
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
                    (a, b) => parseInt(b.likes) - parseInt(a.likes)
                ),
            ];
            setRecipes(newRecipes);
        } else if (e.value === "newest") {
            const newRecipes = [...recipes.sort((a, b) => b.id - a.id)];
            setRecipes(newRecipes);
        } else if (e.value === "oldest") {
            const newRecipes = [...recipes.sort((a, b) => a.id - b.id)];
            setRecipes(newRecipes);
        }
    };

    const handleFollow = () => {
        console.log(`${auth.email} follows ${user.email}`);
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

    return (
        <div className="min-h-[calc(100vh-318px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-4xl font-semibold tracking-wide">
                    {user?.name}
                </h2>
                <img
                    className="w-72 h-72 object-cover"
                    src={user?.image}
                    alt="/"
                    referrerPolicy="no-referrer"
                />

                <div className="max-w-[18rem]">
                    <div className="flex justify-between">
                        <h1 className="text-lg">About</h1>
                        {auth.googleId === user.googleId && (
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
                            {user?.bio.length === 0
                                ? "User has no bio"
                                : user?.bio}
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
                {auth.googleId !== user.googleId && (
                    <button
                        type="button"
                        className="py-2 mt-2 w-full max-w-[18rem] rounded-md text-base bg-[#f5eedc] hover:bg-[#ecb390] transition duration-200"
                        onClick={handleFollow}
                    >
                        Follow
                    </button>
                )}

                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={handleProfileView}
                            value="followers"
                            className="text-base py-1 px-3 bg-red-200 rounded-md hover:bg-[#d9534f] transition duration-200"
                        >
                            Followers
                        </button>
                        <button
                            onClick={handleProfileView}
                            value="following"
                            className="text-base py-1 px-3 bg-red-200 rounded-md hover:bg-[#d9534f] transition duration-200"
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
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl capitalize font-semibold my-4">
                            {profileView}
                        </h1>
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
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
                        {profileView === "recipes" &&
                            recipes.map((recipe) => {
                                return (
                                    <ProfileRecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                    />
                                );
                            })}
                    </div>

                    {/* Collections View */}

                    {/* Followers View */}

                    {/* Following View */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
