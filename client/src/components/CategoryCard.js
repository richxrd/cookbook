import React from "react";

const CategoryCard = ({ title, author, image }) => {
    return (
        <div className="flex flex-col items-center relative w-full h-72">
            {/* Image */}
            <img src={image} alt="" className="object-cover w-full h-5/6" />
            {/* Title */}

            <div className="flex flex-col w-full">
                <p className="text-lg truncate">{title}</p>
                <div>
                    <span className="text-md text-gray-600">By </span>
                    <span className="text-md text-[#ecb390]">{author}</span>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
