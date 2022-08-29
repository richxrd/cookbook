import { XIcon } from "@heroicons/react/outline";
import React from "react";

const TagsInput = ({ tag, deleteTag, index }) => {
    return (
        <div className="bg-green-200 inline-flex justify-center items-center py-1 px-3 rounded-xl">
            <span>{tag}</span>
            <span
                className="ml-2 text-red-600 cursor-pointer"
                onClick={() => deleteTag(index)}
            >
                <XIcon className="w-4 h-4" />
            </span>
        </div>
    );
};

export default TagsInput;
