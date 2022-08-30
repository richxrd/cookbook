import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPost } from "../../api/posts";

const CollectionsCard = ({ collection, userId, id, updateUser }) => {
    const [readyToLoad, setReadyToLoad] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getCollectionImg();
    }, []);

    const getCollectionImg = async () => {
        if (collection.recipes.length > 0) {
            const data = await getPost(collection.recipes[0]);
            if (!data) {
                const submittionForm = {
                    userId: userId,
                    postId: collection.recipes[0],
                    collectionId: collection._id,
                };
                // const data = await removeFromCollection(submittionForm);
                updateUser(data);
            } else {
                const image = data.imageUrl;
                setImageUrl(image);
            }
        }
        setReadyToLoad(true);
    };

    const createCollectionImg = () => {
        return collection.recipes.length === 0 ? (
            <div className="w-full h-full aspect-square bg-gradient-to-t from-neutral-300 to-neutral-600"></div>
        ) : (
            <div className="aspect-square backdrop-blur-sm bg-blue/30">
                <img
                    src={imageUrl}
                    className="w-full h-full object-cover backdrop-blur-sm bg-blue/30"
                    key={imageUrl}
                    alt="/"
                />
            </div>
        );
    };

    return (
        readyToLoad && (
            <div
                onClick={() => navigate(`/user/${userId}/collection/${id}`)}
                className="w-full bg-white drop-shadow-lg hover:drop-shadow-2xl transition duration-200 relative cursor-pointer"
            >
                {createCollectionImg()}
                <div className="absolute left-0 top-0 p-4 w-full h-full">
                    <h1
                        className="text-2xl text-white font-semibold tracking-wider drop-shadow-xl"
                        style={{ textShadow: "1px 1px 25px black" }}
                    >
                        {collection.name}
                    </h1>
                </div>
            </div>
        )
    );
};

export default CollectionsCard;
