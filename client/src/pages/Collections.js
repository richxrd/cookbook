import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, deleteCollection } from "../api/user";
import LoadingPage from "../components/GlobalComponents/LoadingPage";

const Collections = () => {
    const [userData, setUserData] = useState(null);
    const [collection, setCollection] = useState(null);

    const auth = useSelector((state) => state.user.authData?.result);
    const { uniqueId, collectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getUser(uniqueId);
            setUserData(data.result);
        };
        getData();
    }, [uniqueId]);

    useEffect(() => {}, [collection]);
    useEffect(() => {
        setCollections();
    }, [userData]);

    const handleCollectionDelete = async (e) => {
        e.preventDefault();

        const deleteCollectionForm = {
            id: auth._id,
            collectionId: collectionId,
        };

        const data = await deleteCollection(deleteCollectionForm);
        navigate(`/user/${data.result.uniqueId}`);
    };

    // Helpers
    const setCollections = () => {
        if (collectionId === "liked") {
            setCollection(userData?.likes);
        } else {
            if (userData) {
                const collection = userData?.collections?.filter(
                    (collection) => collection._id === collectionId
                );
                setCollection(collection[0]);
            }
        }
    };

    const hasData = () => {
        return userData && collection;
    };

    return hasData() ? (
        <div className="min-h-[calc(100vh-318px)] pt-32 py-16 md:pt-32 px-6 mx-auto max-w-screen-xl">
            <div className="flex flex-col space-y-4 justify-between items-center md:flex-row md:space-y-0 ">
                {/* Title */}
                <div>
                    <h2 className="text-4xl font-semibold tracking-wide">
                        {collectionId === "liked"
                            ? "Liked Posts"
                            : collection.name}
                    </h2>
                    <h3 className="text-lg">{userData.name}</h3>
                </div>
                {collectionId !== "liked" && userData._id === auth?._id && (
                    <button
                        type="button"
                        onClick={handleCollectionDelete}
                        className="py-1 px-4 bg-red-200 rounded-lg text-base"
                    >
                        Delete
                    </button>
                )}
            </div>

            <div className="my-4"></div>
        </div>
    ) : (
        <div>
            <LoadingPage />
        </div>
    );
};

export default Collections;
