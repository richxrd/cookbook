import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#f5eedc] text-black px-2">
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 border-b-2 border-b-yellow-300 px-6 py-8">
                <div className="cursor-pointer">
                    <h1
                        className="font-bold uppercase pt-2"
                        onClick={() => navigate(`/diets`)}
                    >
                        Diets
                    </h1>
                    <ul className="text-sm">
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/mediterranean`)}
                        >
                            Mediterranean
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/paleo`)}
                        >
                            Paleo
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/whole 30`)}
                        >
                            Whole 30
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/atkins`)}
                        >
                            Atkins
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/vegan`)}
                        >
                            Vegan
                        </li>
                    </ul>
                </div>
                <div className="cursor-pointer">
                    <h1
                        className="font-bold uppercase pt-2"
                        onClick={() => navigate(`/cuisines`)}
                    >
                        Cuisines
                    </h1>
                    <ul className="text-sm">
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/american`)}
                        >
                            American
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/chinese`)}
                        >
                            Chinese
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/indian`)}
                        >
                            Indian
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/mexican`)}
                        >
                            Mexican
                        </li>
                        <li
                            className="py-1"
                            onClick={() => navigate(`/explore/italian`)}
                        >
                            Italian
                        </li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold uppercase pt-2">Get to Know Us</h6>
                    <ul className="text-sm">
                        <li className="py-1">About</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold uppercase pt-2">Legal</h6>
                    <ul className="text-sm">
                        <li className="py-1">Privacy</li>
                        <li className="py-1">Terms</li>
                        <li className="py-1">Policies</li>
                        <li className="py-1">Conditions</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-800">
                <p className="py-4 text-xs">Created by Richard Lin</p>
                <div className="flex justify-between sm:w-[300px] pt-4 text-2xl"></div>
            </div>
        </div>
    );
};
export default Footer;
