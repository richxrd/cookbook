import React from "react";

const Footer = () => {
    return (
        <div className="w-full bg-[#96ceb4] text-black py-y px-2">
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 border-b-2 border-b-green-300 px-6 py-8">
                <div>
                    <h1 className="font-bold uppercase pt-2">Diets</h1>
                    <ul>
                        <li className="py-1">Mediterranean</li>
                        <li className="py-1">Paleo</li>
                        <li className="py-1">Whole 30</li>
                        <li className="py-1">Atkins</li>
                        <li className="py-1">Vegan</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold uppercase pt-2">Get to Know Us</h6>
                    <ul>
                        <li className="py-1">About</li>
                        <li className="py-1">Github</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold uppercase pt-2">Legal</h6>
                    <ul>
                        <li className="py-1">Privacy</li>
                        <li className="py-1">Terms</li>
                        <li className="py-1">Policies</li>
                        <li className="py-1">Conditions</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-800">
                <p className="py-4">Created by Richard Lin</p>
                <div className="flex justify-between sm:w-[300px] pt-4 text-2xl"></div>
            </div>
        </div>
    );
};
export default Footer;
