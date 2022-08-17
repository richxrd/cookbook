import React from "react";
import { ThumbUpIcon } from "@heroicons/react/outline";

const Comment = ({ review }) => {
    const { name, comment, rate, likes, date } = review[1];
    return (
        <div className="flex flex-col space-y-2 border-b-2 py-4">
            <div>
                <p className="capitalize font-medium text-[#d9534f] text-lg">
                    {name}
                </p>

                <div className="flex space-x-4 text-sm text-[#ecb390]">
                    <p>{date}</p>
                    <p className="text-[#96ceb4]">Rating: {rate}/5</p>
                </div>
            </div>
            <p className="text-sm text-slate-700">{comment}</p>
            <div className="flex space-x-1 items-center text-gray-400">
                <ThumbUpIcon className="h-4 cursor-pointer hover:text-green-400" />
                <p className="text-sm">Helpful ({likes})</p>
            </div>
        </div>
    );
};

export default Comment;
