import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCollection, getUser } from "../store/user/userActions";

const Collections = () => {
    const [auth, setAuth] = useState(
        useSelector((state) => state.user.authData?.result)
    );
    const [user, setUser] = useState(
        useSelector((state) => state.user.userData?.result)
    );

    const [collection, setCollection] = useState(null);

    const userData = useSelector((state) => state.user.userData?.result); // Get updates to userData

    const { uniqueId, collectionId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser(uniqueId));
        setCollections();
    }, [uniqueId]);

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const handleCollectionDelete = (e) => {
        e.preventDefault();

        const deleteCollectionForm = {
            id: auth._id,
            collectionId: collectionId,
        };
        dispatch(deleteCollection(deleteCollectionForm, navigate));
    };

    // Helpers
    const setCollections = () => {
        if (collectionId === "liked") {
            setCollection(user?.likes);
        } else {
            const collection = user?.collections?.filter(
                (collection) => collection._id === collectionId
            );

            setCollection(collection[0]);
        }
    };

    const hasData = () => {
        return user && collection;
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
                    <h3 className="text-lg">{user.name}</h3>
                </div>
                {collectionId !== "liked" && user._id === auth?._id && (
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
        <div></div>
    );
};

export default Collections;
