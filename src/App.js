import React from "react";
import GlobalStyles from "styles/GlobalStyles";
import CampaignHomePage from "CampaignHomePage";
import LoginPage from "pages/Login.js";
import AboutUsPage from "pages/AboutUs.js";
import BlogPage from "BlogPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventLandingPage from "demos/EventLandingPage";
import BrowseCampaign from "pages/BrowseCampaign";
import Campaign from "pages/Campaign";

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
        </Routes>
      </Router>
    </>
  );
}
