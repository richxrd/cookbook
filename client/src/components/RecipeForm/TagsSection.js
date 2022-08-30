import React from "react";
import TagsInput from "./TagsInput";

const TagsSection = ({ formData, setUpdatedForm }) => {
    const handleRemoveTag = (index) => {
        setUpdatedForm({
            ...formData,
            tags: [...formData.tags.filter((el, i) => i !== index)],
        });
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.target.value.toLowerCase();
            if (!value.trim()) return;
            setUpdatedForm({ ...formData, tags: [...formData.tags, value] });
            e.target.value = "";
        }

        if (e.key === "Backspace") {
            if (e.target.value.length === 0) {
                let currentTags = [...formData.tags];
                currentTags.pop();
                setUpdatedForm({
                    ...formData,
                    tags: [...currentTags],
                });
            }
        }

        return;
    };
    return (
        <div>
            <h1 className="text-lg font-semibold py-2">
                Tags
                <span className="text-sm italic text-gray-500">
                    {" "}
                    (Breakfast, vegetarian, healthy, etc)
                </span>
            </h1>
            <div className="border border-green-200 p-2 rounded-lg max-w-full flex items-center flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                    <TagsInput
                        tag={tag}
                        index={index}
                        deleteTag={handleRemoveTag}
                        key={index}
                    />
                ))}
                <input
                    type="text"
                    placeholder="Enter tag"
                    className="grow py-2 border-none outline-none focus:ring-0 bg-green-50 rounded-lg"
                    onKeyDown={handleTagKeyDown}
                />
            </div>
        </div>
    );
};

export default TagsSection;
