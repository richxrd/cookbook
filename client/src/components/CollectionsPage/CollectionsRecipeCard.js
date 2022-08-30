import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCollection } from "../../api/collections";
import { getPost } from "../../api/posts";
import Rating from "../GlobalComponents/Rating";

const CollectionsRecipeCard = ({
    recipe,
    userData,
    setCollection,
    setRecipes,
}) => {
    const [recipeData, setRecipeData] = useState(null);
    const auth = useSelector((state) => state.user.authData?.result);

    const navigate = useNavigate();
    const { collectionId } = useParams();

    useEffect(() => {
        const getData = async () => {
            const data = await getPost(recipe);
            setRecipeData(data);
        };
        getData();
    }, []);

    const handleDeleteFromCollection = async (e) => {
        e.preventDefault();

        const submittionForm = {
            postId: recipeData._id,
            collectionId: collectionId,
        };

        const data = await addToCollection(submittionForm);
        setCollection({ ...data.result });
        setRecipes(data.result.recipes);
    };

    const isAuthUser = () => {
        if (auth) {
            return auth._id === userData._id;
        }
        return false;
    };

    const hasData = () => {
        return recipeData;
    };

    return (
        hasData() && (
            <div className="flex flex-col w-[290px] aspect-square mx-2 mb-4 h-fit shadow-lg cursor-pointer rounded-lg relative group hover:scale-[1.02] hover:shadow-2xl transition duration-200">
                {/* img */}
                <img
                    src={recipeData.imageUrl}
                    alt=""
                    className="object-cover w-full h-80 rounded-lg"
                    onClick={() => navigate(`/${recipeData._id}`)}
                />

                <div
                    className="p-2 text-sm absolute bottom-0 bg-green-200 w-full rounded-b-lg"
                    onClick={() => navigate(`/${recipeData._id}`)}
                >
                    <h2 className="text-base font-semibold truncate">
                        {recipeData.title}
                    </h2>
                    <Rating
                        ratingsList={Object.entries(recipeData.reviews)}
                        full
                    />
                </div>
                {isAuthUser() && (
                    <div className="absolute p-2 top-0 right-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-200">
                        <button
                            className="w-full py-2 px-4 rounded-xl bg-[#ecb390] hover:bg-[#d9534f] bg-opacity-70"
                            onClick={handleDeleteFromCollection}
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>
        )
    );
};

export default CollectionsRecipeCard;
