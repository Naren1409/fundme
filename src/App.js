import React from "react";
import GlobalStyles from "styles/GlobalStyles";
import ComponentRenderer from "ComponentRenderer.js";
import LoginPage from "./pages/Login";
import CampaignHomePage from "./CampaignHomePage";
import AboutUsPage from "./pages/AboutUs";
import BlogPage from "./BlogPage";
import Campaign from "./pages/Campaign";
import BrowseCampaign from "./pages/BrowseCampaign";
import AdminPage from "./pages/AdminPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<CampaignHomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/create-campaign" element={<Campaign />} />
          <Route path="/browse-campaign" element={<BrowseCampaign />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}
