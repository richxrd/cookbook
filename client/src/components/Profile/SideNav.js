import React, { useState } from "react";
import { followUser, updateBio } from "../../api/user";

const SideNav = ({ userData, authData, updateUserData, updateProfileView }) => {
    const [editBio, setEditBio] = useState(false);
    const [userBio, setUserBio] = useState("");

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
        updateUserData(data.user);
    };

    const handleFollow = (e) => {
        e.preventDefault();
        const form = {
            sender: authData._id,
            receiver: userData._id,
        };
        const follow = async () => {
            const newUser = await followUser(form);
            updateUserData(newUser.user);
        };
        follow();
    };

    const handleProfileView = (e) => {
        e.preventDefault();
        updateProfileView(e.target.value);
    };

    return (
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
                    <p className="text-sm font-light w-72 p-2 bg-slate-50 mt-2 rounded-xl">
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
    );
};

export default SideNav;
