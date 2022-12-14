import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import Footer from "./components/GlobalComponents/Footer";
import Navbar from "./components/GlobalComponents/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Recipe from "./pages/Recipe";
import NewRecipe from "./pages/NewRecipe";
import Profile from "./pages/Profile";
import Collections from "./pages/Collections";
import EditRecipe from "./pages/EditRecipe";
import Explore from "./pages/Explore";
import DietsPage from "./pages/DietsPage";
import CuisinesPage from "./pages/CuisinesPage";
import SearchResults from "./pages/SearchResults";

const App = () => {
    return (
        <BrowserRouter>
            <div className="font-sans">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/diets" element={<DietsPage />} />
                    <Route path="/cuisines" element={<CuisinesPage />} />
                    <Route path="/:id" element={<Recipe />} />
                    <Route path="/:id/edit" element={<EditRecipe />} />
                    <Route path="/new" element={<NewRecipe />} />
                    <Route path="/user/:uniqueId" element={<Profile />} />
                    <Route
                        path="/user/:uniqueId/collection/:collectionId"
                        element={<Collections />}
                    />
                    <Route path="/explore/:term" element={<SearchResults />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
