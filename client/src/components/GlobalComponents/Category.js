import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
    const navigate = useNavigate();

    return (
        <div
            className="my-3 cursor-pointer hover:text-green-400 transition-all duration-200 text-sm"
            onClick={() => navigate(`/explore/${category.toLowerCase()}`)}
        >
            {category}
        </div>
    );
};

export default Category;
