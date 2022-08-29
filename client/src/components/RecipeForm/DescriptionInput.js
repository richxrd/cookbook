import React from "react";

const DescriptionInput = ({ setUpdatedForm, formData }) => {
    const handleChange = (e) => {
        setUpdatedForm({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-semibold">
                Description{" "}
                <span className="text-sm text-red-600">(Required)</span>
            </label>
            <textarea
                onChange={handleChange}
                rows="2"
                name="description"
                className="p-1 border-2 border-[#96ceb4] focus:border-green-700 focus:ring-0 text-sm rounded-sm w-full"
                value={formData.description}
                required
            />
        </div>
    );
};

export default DescriptionInput;
