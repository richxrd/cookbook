import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../store/user/userActions";

import bgImg from "../assets/authHero.PNG";
import icon from "../assets/icon.png";

const Auth = () => {
    const [user, setUser] = useState(
        useSelector((state) => state.user.authData?.result)
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        const { imageUrl } = result;
        let imageSplit = imageUrl.split("=s");
        const image = imageSplit[0] + "=s1000";

        const formData = {
            googleId: result.googleId,
            name: result.name,
            image: image,
            email: result.email,
            bio: "User has no bio",
            token: token,
        };

        dispatch(signin(formData, navigate));
    };

    const googleFailure = async (res) => {
        console.log("Google Sign in was unsuccessful");
    };

    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    });

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
            <div className="h-fit py-60 md:h-[calc(100vh-318px)] md:py-0 max-w-screen-xl mx-auto flex items-center justify-center">
                <div className="w-[360px] p-8 bg-white rounded-3xl drop-shadow-2xl">
                    <img src={icon} alt="/" className="w-16 mx-auto" />
                    <h1 className="uppercase text-4xl font-semibold text-center md:text-5xl">
                        CookBook
                    </h1>
                    <div className="w-full py-20 text-center">
                        <GoogleLogin
                            clientId="878429723573-ilbeo51e3q9loiga5ik5t833ntrvsuil.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <button
                                    type="button"
                                    className="px-8 py-4 bg-green-200 rounded-lg shadow-lg hover:bg-green-400 transition duration-200"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    Sign In with Google
                                </button>
                            )}
                            buttonText="Login"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
