import React from "react";
import HomeRow from "../components/HomeRow";

import bgImg from "../assets/homeHero.PNG";

const Home = () => {
    return (
        <div className="">
            {/* Image */}
            <div
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            >
                <div className="w-full h-screen">
                    <div className="flex h-full items-center justify-center max-w-screen-xl mx-auto px-6">
                        <div className="flex flex-col text-center bg-white p-6 rounded-xl drop-shadow-2xl bg-opacity-70">
                            <h1 className="text-6xl md:text-8xl">Cookbook</h1>
                            <p className="text-2xl md:text-3xl">
                                Some other text
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle */}
            <div className="flex flex-col space-y-6 py-32 md:space-y-4 max-w-screen-xl mx-auto px-6">
                <HomeRow category={"Trending"} />
                <HomeRow category={"Breakfast"} />
                <HomeRow category={"Lunch"} />
                <HomeRow category={"Dinner"} />
                <HomeRow category={"Vegetarian"} />
            </div>
        </div>
    );
};

export default Home;
