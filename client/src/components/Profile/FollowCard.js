import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserById } from "../../api/user";

const FollowCard = ({ id }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            const data = await fetchUserById(id);
            setUser(data.result);
        };
        getUserData();
    }, []);

    const hasData = () => {
        return user;
    };

    return (
        hasData() && (
            <div
                onClick={() => navigate(`/user/${user.uniqueId}`)}
                className="flex items-center space-x-4 p-3 bg-[#FCF8E8] rounded-md drop-shadow-lg hover:scale-[1.02] hover:drop-shadow-2xl transition duration-200 cursor-pointer"
            >
                {/* Image */}
                <img
                    src={user.image}
                    alt="/"
                    className="object-cover w-[60px] rounded-lg"
                    referrerPolicy="no-referrer"
                />
                {/* Name */}
                <h1>{user.name}</h1>
            </div>
        )
    );
};

export default FollowCard;
