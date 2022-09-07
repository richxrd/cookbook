import React from "react";
import Category from "./Category";

const CategoriesColumn = ({ list }) => {
    return (
        <div className="border-0 border-green-200 text-left sm:odd:border-r-2 md:last:border-0 md:border-r-2">
            {list.map((category) => {
                return <Category category={category} />;
            })}
        </div>
    );
};

export default CategoriesColumn;
