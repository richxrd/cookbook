import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Recipe from "./pages/Recipe";
import NewRecipe from "./pages/NewRecipe";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <div className="font-sans">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/recipes" element={<Recipe />} />
                <Route path="/new" element={<NewRecipe />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
