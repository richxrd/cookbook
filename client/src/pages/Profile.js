import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/GlobalComponents/LoadingPage";

import { getUser } from "../api/user";
import SideNav from "../components/Profile/SideNav";
import ProfileView from "../components/Profile/ProfileView";

const Profile = () => {
    // State Variables
    const [userData, setUserData] = useState(null);
    const [profileView, setProfileView] = useState("recipes");
    const [recipes, setRecipes] = useState([]);

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

    const hasData = () => {
        return userData;
    };

    return hasData() ? (
        <div className="min-h-[calc(100vh-318px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            {/* Right Navigation */}
            <SideNav
                userData={userData}
                authData={authData}
                updateUserData={setUserData}
                updateProfileView={setProfileView}
            />

            <div className="w-full">
                {/* Profile View */}
                <ProfileView
                    authData={authData}
                    userData={userData}
                    profileView={profileView}
                    recipes={recipes}
                    setRecipes={setRecipes}
                    setUserData={setUserData}
                    uniqueId
                />
            </div>
        </div>
    ) : (
        <div>
            <LoadingPage />
        </div>
    );
};

export default Profile;
