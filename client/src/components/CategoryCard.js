import React from "react";

import testImg from "../assets/testPasta.PNG";

const CategoryCard = () => {
    return (
        <div className="flex flex-col items-center relative w-full h-72">
            {/* Image */}
            <img src={testImg} alt="" className="object-cover w-full h-5/6" />
            {/* Title */}

            <div className="flex flex-col w-full">
                <p className="text-lg truncate">
                    why is this takign me so long wtf L pls send help weewooo
                    peepoo
                </p>
                <p className="text-md text-[#ecb390]">Richard Lin</p>
            </div>
        </div>
    );
};

export default CategoryCard;
