import React from "react";

const Direction = ({ index, direction }) => {
    const stepNumber = index + 1;
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="capitalize font-medium text-[#d9534f] text-lg">
                Step {stepNumber}
            </h1>
            <p className="text-lg">{direction}</p>
        </div>
    );
};

export default Direction;
