import React from "react";

import bgImg from "../assets/authHero.PNG";
import icon from "../assets/icon.png";

const Auth = () => {
    return (
        <div
            className=""
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}
        >
            <div className="h-fit py-60 md:h-[calc(100vh-346px)] md:py-0 max-w-screen-xl mx-auto flex items-center justify-center">
                <div className="w-[360px] p-8 bg-white rounded-3xl drop-shadow-2xl">
                    <img src={icon} alt="/" className="w-16 mx-auto" />
                    <h1 className="uppercase text-4xl font-semibold text-center md:text-5xl">
                        CookBook
                    </h1>
                    <div className="w-full py-20 text-center">
                        Log In With Google
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
