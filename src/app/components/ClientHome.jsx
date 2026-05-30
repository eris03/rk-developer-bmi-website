"use client";

import { useState } from "react";
import ZoomStage from "./ZoomStage";
import Header from "./Header";
import Hero from "./Hero";
import HeroInfo from "./HeroInfo";
import Trust from "./Trust";
import Projects from "./Projects";
import Amenities from "./Amenities";
import Services from "./Services";
import Immersive3D from "./Immersive3D";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import WhatsAppFAB from "./WhatsAppFAB";
import Splash from "./Splash";
import MarqueeStrip from "./MarqueeStrip";

export default function ClientHome() {
  const [section, setSection] = useState(0);

  return (
    <>
      <Splash />
      <ZoomStage onSectionChange={setSection}>
        <Hero />
        <HeroInfo />
        <Trust />
        <Projects />
        <Amenities />
        <Services />
        <Immersive3D />
        <Gallery />
        <Testimonials />
        <Contact />
      </ZoomStage>
      <Header />
      <WhatsAppFAB />
      {/* Marquee strip — visible on all sections */}
      <MarqueeStrip visible={true} />
    </>
  );
}
