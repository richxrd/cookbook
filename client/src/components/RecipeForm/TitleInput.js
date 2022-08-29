import React from "react";

const TitleInput = ({ setUpdatedForm, formData }) => {
    const handleChange = (e) => {
        setUpdatedForm({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold">
                Title <span className="text-sm text-red-600">(Required)</span>
            </label>
            <input
                onChange={handleChange}
                type="text"
                name="title"
                className="p-1 border-x-0 border-y-0 border-b-2 border-[#96ceb4] focus:border-green-700 focus:ring-0 text-sm"
                value={formData.title}
                required
            />
        </div>
    );
};

export default TitleInput;
