import React from "react";
import HomeRow from "../components/HomePage/HomeRow";

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
                        <div className="flex flex-col space-y-4 text-center bg-white p-12 rounded-xl shadow-2xl bg-opacity-80">
                            <h1 className="text-6xl md:text-8xl font-semibold">
                                Cookbook
                            </h1>
                            <p className="text-2xl md:text-3xl uppercase font-semibold tracking-wider shadow-inner">
                                Simple Recipes For Any Occasion.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle */}
            <div className="flex flex-col space-y-6 py-12 md:space-y-8 max-w-screen-xl mx-auto px-6">
                {/* <HomeRow category={"Trending"} /> */}
                <HomeRow category={"Breakfast"} />
                <HomeRow category={"Lunch"} />
                <HomeRow category={"Dinner"} />
                <HomeRow category={"Vegetarian"} />
            </div>
        </div>
    );
};

export default Home;
