import React from "react";

const QuickInfoInput = ({ setUpdatedForm, formData }) => {
    const handleTimeChange = (e) => {
        setUpdatedForm({
            ...formData,
            time: { ...formData.time, [e.target.name]: e.target.value },
        });
    };

    const handleChange = (e) => {
        setUpdatedForm({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col justify-between space-y-4 md:space-y-0 md:flex-row md:space-x-8">
            <div>
                <label htmlFor="prep" className="text-lg font-semibold">
                    Preperation Time{" "}
                    <span className="text-sm text-red-600">(Required)</span>
                </label>
                <input
                    onChange={handleTimeChange}
                    type="number"
                    name="prep"
                    className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-green-700 focus:ring-0 text-sm w-full"
                    value={formData.time.prep}
                    required
                />
            </div>
            <div>
                <label htmlFor="cook" className="text-lg font-semibold">
                    Cook Time{" "}
                    <span className="text-sm text-red-600">(Required)</span>
                </label>
                <input
                    onChange={handleTimeChange}
                    type="number"
                    name="cook"
                    className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-green-700 focus:ring-0 text-sm w-full"
                    value={formData.time.cook}
                    required
                />
            </div>
            <div>
                <label htmlFor="title" className="text-lg font-semibold">
                    Servings{" "}
                    <span className="text-sm text-red-600">(Required)</span>
                </label>
                <input
                    onChange={handleChange}
                    type="number"
                    name="servings"
                    className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-green-700 focus:ring-0 text-sm w-full"
                    value={formData.servings}
                    required
                />
            </div>
        </div>
    );
};

export default QuickInfoInput;
