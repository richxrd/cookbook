import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppIcon from "../assets/icon.png";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [user, setUser] = useState(false);

    const handleNavClick = () => setNav(!nav);

    return (
        <div className="w-full bg-[#f5eedc] h-24 fixed drop-shadow-lg z-10">
            <div className="flex h-full items-center justify-between mx-auto px-6 max-w-screen-xl font-medium}">
                {/* Icon */}
                <a
                    href="."
                    className="flex items-center space-x-2 cursor-pointer w-1/3"
                >
                    <img className="w-16" src={AppIcon} alt="icon" />
                    <h1 className="text-3xl">Cookbook</h1>
                </a>
                <div className="hidden md:flex font-medium text-lg">
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex font-medium text-lg space-x-4 w-1/3">
                        <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                            Recipes
                        </li>
                        <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                            Healthy
                        </li>
                        <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                            Baking
                        </li>
                    </ul>
                </div>

                {/* User */}
                <div className="hidden md:flex text-lg w-1/3 justify-end">
                    {user ? (
                        <div className="cursor-pointer">
                            <div>
                                <ul className="flex items-center space-x-4">
                                    <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                                        Profile
                                    </li>
                                    <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
                                        Notifications
                                    </li>
                                    <li className="cursor-pointer hover:text-[#d9534f] transition duration-200">
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
                        : "absolute bg-[#f5eedc] w-full px-6 py-4 text-left text-lg font-medium md:hidden"
                }
                onClick={handleNavClick}
            >
                {/* Menu */}
                <ul className="flex flex-col space-y-2">
                    <li className="cursor-pointer">Recipes</li>
                    <li className="cursor-pointer">Healthy</li>
                    <li className="cursor-pointer">Baking</li>
                </ul>
                <div className="border border-b-yellow-300 my-3"></div>
                {/* User */}
                <div>
                    {user ? (
                        <div>
                            <ul className="flex flex-col space-y-2">
                                <li className="cursor-pointer">Profile</li>
                                <li className="cursor-pointer">
                                    Notifications
                                </li>
                                <li className="cursor-pointer">Logout</li>
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