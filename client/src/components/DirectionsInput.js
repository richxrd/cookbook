import React from "react";

const DirectionsInput = ({
    direction,
    index,
    handleChange,
    deleteDirection,
}) => {
    return (
        <div className="flex space-x-1 py-1 items-center justify-between tracking-wide font-light px-2 border-0 border-b-2 border-yellow-200">
            <input
                className="bg-yellow-50 border-2 border-transparent focus:ring-0 w-full p-2 outline-none focus:border-yellow-400"
                value={direction}
                name={index}
                onChange={handleChange}
            />
            <div
                id={index}
                className="cursor-pointer select-none text-red-500 px-4"
                onClick={deleteDirection}
            >
                [x]
            </div>
        </div>
    );
};

export default DirectionsInput;
