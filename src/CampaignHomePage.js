import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import Blog from "components/blogs/ThreeColSimpleWithImage.js";
import FAQ from "components/faqs/SingleCol.js";
import Footer from "components/footers/MiniCenteredFooter.js";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <SliderCard />
    <Blog />
    <FAQ />
    <Footer />
  </AnimationRevealPage>
);
