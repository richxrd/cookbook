import React from "react";

const TimerCard = ({ prep, cook, servings }) => {
    return (
        <div className="border w-[300px] mx-auto border-[#96ceb4] p-5 rounded-md">
            <div className="flex space-x-4">
                <h3 className="font-semibold">Prep: </h3>
                <span>{prep} Mins</span>
            </div>
            <div className="flex space-x-4">
                <h3 className="font-semibold">Cook: </h3>
                <span>{cook} Mins</span>
            </div>
            <div className="flex space-x-4">
                <h3 className="font-semibold">Servings: </h3>
                <span>{servings}</span>
            </div>
        </div>
    );
};

export default TimerCard;
