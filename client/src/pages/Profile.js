import React, { useState } from "react";

import { PROFILE } from "../testProfile";

const Profile = () => {
    const [bio, setBio] = useState("User has no bio.");
    const [editBio, setEditBio] = useState(false);

    const handleEditBioBtn = (e) => {
        setEditBio(!editBio);
    };

    const handleBioChange = (e) => {
        e.preventDefault();

        setBio(e.target.value);
    };

    const handleBioSubmit = (e) => {
        e.preventDefault();

        if (bio.length === 0) {
            setBio("User has no bio.");
        }

        setEditBio(false);
    };

    return (
        <div className="min-h-[calc(100vh-346px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center">
                <h2 className="text-4xl font-semibold tracking-wide pb-4">
                    {PROFILE.name}
                </h2>
                <img
                    className="w-72 h-72 object-cover"
                    src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000"
                    alt="/"
                />

                <div className="max-w-[18rem] my-4">
                    <div className="flex justify-between">
                        <h1 className="text-lg">About</h1>
                        {PROFILE.id === 0 && (
                            <button
                                type="button"
                                className="text-xs px-4 bg-red-200 rounded-md"
                                onClick={handleEditBioBtn}
                            >
                                Edit Bio
                            </button>
                        )}
                    </div>
                    {!editBio ? (
                        <p className="text-sm font-light mt-2 w-72">{bio}</p>
                    ) : (
                        <form
                            className="mt-2 w-72 flex flex-col space-y-2"
                            onSubmit={handleBioSubmit}
                        >
                            <textarea
                                rows="6"
                                className="border-green-600 border w-full outline-none focus:ring-0 text-sm"
                                value={bio}
                                onChange={handleBioChange}
                            />

                            <button className="bg-green-300 py-2 rounded-sm text-sm">
                                Update Bio
                            </button>
                        </form>
                    )}
                </div>

                {/* Follow Button */}
                {PROFILE.id !== 0 && (
                    <button
                        type="button"
                        className="py-1 px-3 mt-2 w-full max-w-[18rem] rounded-sm text-sm bg-[#96ceb4] hover:bg-[#b5e6cf] transition duration-100"
                    >
                        Follow
                    </button>
                )}

                <div className="flex items-center justify-between space-x-12 mt-1 text-[#d9534f] text-sm">
                    <div className="cursor-pointer hover:text-[#96ceb4] transition duration-100">
                        {PROFILE.followers.length} Followers
                    </div>
                    <div className="cursor-pointer hover:text-[#96ceb4] transition duration-100">
                        {PROFILE.following.length} Following
                    </div>
                </div>
            </div>

            <div className="bg-black">test</div>
        </div>
    );
};

export default Profile;
