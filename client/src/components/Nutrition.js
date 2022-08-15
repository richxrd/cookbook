import React from "react";

const Nutrition = ({ name, value }) => {
    return (
        <div className="flex justify-between space-x-2 my-4 items-center tracking-wide font-light border-0 border-b-2 border-[#ecb390]">
            <span className="capitalize">{name}</span>
            <span>{value}</span>
        </div>
    );
};

export default Nutrition;
