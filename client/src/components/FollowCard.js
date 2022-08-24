import React from "react";
import { useNavigate } from "react-router-dom";

const FollowCard = ({ person }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/user/${person.uniqueId}`)}
            className="flex items-center space-x-4 p-3 bg-[#f5eedc] rounded-md drop-shadow-lg hover:scale-[1.02] hover:drop-shadow-2xl transition duration-200 cursor-pointer"
        >
            {/* Image */}
            <img
                src={person.image}
                alt="/"
                className="object-cover w-[60px] rounded-lg"
            />
            {/* Name */}
            <h1>{person.name}</h1>
        </div>
    );
};

export default FollowCard;
