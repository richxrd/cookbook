import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import AppIcon from "../../assets/icon.png";
import { resetStore } from "../../store/store";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleNavClick = () => setNav(!nav);
    const handleHomeBtn = () => {
        navigate("/");
    };

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        resetStore();
        navigate("/");
        setUser(null);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <div className="w-full bg-[#f5eedc] h-24 fixed drop-shadow-lg z-20">
            <div className="flex h-full items-center justify-between mx-auto px-6 max-w-screen-xl ">
                {/* Icon */}
                <div
                    onClick={handleHomeBtn}
                    className="flex items-center space-x-2 cursor-pointer w-1/3"
                >
                    <img className="w-16" src={AppIcon} alt="icon" />
                    <h1 className="text-3xl">Cookbook</h1>
                </div>
                <div className="hidden md:flex">
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-4 text-center whitespace-nowrap">
                        <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                            Recipes
                        </li>
                        <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                            Quick Recipes
                        </li>
                        <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                            Cuisines
                        </li>
                    </ul>
                </div>

                {/* User */}
                <div className="hidden md:flex w-1/3 justify-end">
                    {user ? (
                        <div className="cursor-pointer">
                            <div>
                                <ul className="flex items-center space-x-4">
                                    <li
                                        onClick={() =>
                                            navigate(
                                                `/user/${user?.authData?.result?.uniqueId}`
                                            )
                                        }
                                        className="cursor-pointer hover:text-[#d9534f] transition duration-200"
                                    >
                                        Profile
                                    </li>
                                    <li
                                        onClick={() => navigate("/new")}
                                        className="cursor-pointer hover:text-[#d9534f] transition duration-200"
                                    >
                                        Add
                                    </li>
                                    <li
                                        onClick={handleLogout}
                                        className="cursor-pointer hover:text-[#d9534f] transition duration-200"
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <ul className="flex space-x-4">
                            <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                                <Link to="/auth">Login</Link>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Mobile Sandwich Button */}
                <div className="md:hidden">
                    <div
                        className="md:hidden mr-4 cursor-pointer"
                        onClick={handleNavClick}
                    >
                        {!nav ? (
                            <MenuIcon className="w-5" />
                        ) : (
                            <XIcon className="w-5" />
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile - Menu & User  */}
            <div
                className={
                    !nav
                        ? "hidden"
                        : "absolute bg-[#f5eedc] w-full px-6 py-4 text-left text-lg md:hidden"
                }
                onClick={handleNavClick}
            >
                {/* Menu */}
                <ul className="flex flex-col space-y-3">
                    <li className="cursor-pointer">Recipes</li>
                    <li className="cursor-pointer">Quick Recipes</li>
                    <li className="cursor-pointer">Cuisines</li>
                </ul>
                <div className="border border-b-yellow-300 my-3"></div>
                {/* User */}
                <div>
                    {user ? (
                        <div>
                            <ul className="flex flex-col space-y-3">
                                <li
                                    onClick={() =>
                                        navigate(
                                            `/user/${user?.authData?.result?.uniqueId}`
                                        )
                                    }
                                    className="cursor-pointer"
                                >
                                    Profile
                                </li>
                                <li
                                    onClick={() => navigate("/new")}
                                    className="cursor-pointer"
                                >
                                    Add
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="cursor-pointer"
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex flex-col text-left space-y-2">
                            <Link to="/auth" className="cursor-pointer">
                                Log In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
