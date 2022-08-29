import { PlusIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import DirectionsInput from "./DirectionsInput";

const DirectionsSection = ({ formData, setUpdatedForm }) => {
    const [newDirection, setNewDirection] = useState("");

    const handleDirectionChange = (e) => {
        const directions = [...formData.directions];
        directions[e.target.name] = e.target.value;

        setUpdatedForm({
            ...formData,
            directions: directions,
        });
    };

    const handleDeleteDirection = (e) => {
        const directions = [...formData.directions];
        directions.splice(e.target.id, 1);
        setUpdatedForm({
            ...formData,
            directions: directions,
        });
    };

    const handleDirectionKeydown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const handleNewDirectionChange = (e) => {
        const newDirection = document.getElementById("newDirection");
        newDirection.setCustomValidity("");
        setNewDirection(e.target.value);
    };

    const handleNewDirection = (e) => {
        e.preventDefault();
        setUpdatedForm({
            ...formData,
            directions: [...formData.directions, newDirection],
        });

        setNewDirection("");
    };

    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-semibold py-2">
                Directions{" "}
                <span className="text-sm text-red-600">(Required)</span>
            </h1>

            {formData.directions.map((direction, index) => {
                return (
                    <DirectionsInput
                        key={index}
                        direction={direction}
                        index={index}
                        handleChange={handleDirectionChange}
                        deleteDirection={handleDeleteDirection}
                    />
                );
            })}

            <div
                className="flex space-x-1 py-2 items-center justify-between tracking-wide font-light pl-1 pr-2 bg-green-200"
                onKeyDown={handleDirectionKeydown}
            >
                <input
                    className="bg-green-100 p-2 w-full text-sm outline-none border-2 border-transparent focus:border-green-300"
                    placeholder="Enter Direction"
                    value={newDirection}
                    onChange={handleNewDirectionChange}
                    minLength={1}
                    id="newDirection"
                />
                <button
                    type="button"
                    className="cursor-pointer select-none px-4"
                    onClick={handleNewDirection}
                >
                    <PlusIcon className="w-[20px]" />
                </button>
            </div>
        </div>
    );
};

export default DirectionsSection;
