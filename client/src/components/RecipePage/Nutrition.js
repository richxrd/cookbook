import React from "react";

const Nutrition = ({ name, value, measurement }) => {
    const getMeasurement = () => {
        switch (measurement) {
            case "calories":
                return "cal";
            case "soduium":
                return "mg";
            case "cholesterol":
                return "mg";
            default:
                return "g";
        }
    };

    return (
        <div className="flex justify-between space-x-2 my-4 items-center tracking-wide font-light border-0 border-b-2 border-[#ecb390]">
            <span className="capitalize">{name}</span>
            <div>
                <span>{value}</span>
                <span>{getMeasurement()}</span>
            </div>
        </div>
    );
};

export default Nutrition;
