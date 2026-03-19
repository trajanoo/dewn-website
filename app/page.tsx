import Image from "next/image";
import Navbar from "./components/home/Navbar";
import HeroSection from "./components/home/HeroSection";
import ProblemSection from "./components/home/ProblemSection";
import ClinicalBanner from "./components/home/ClinicalBanner";
import EngineeringSection from "./components/home/EngineeringSection";
import AboutSection from "./components/home/AboutSection";
import FAQSection from "./components/home/FAQSection";
import ProductsSection from "./components/home/ProductsSection";
import IngredientsSection from "./components/home/IngredientsSection";
import BenefitsSection from "./components/home/BenefitsSection";
import FinalCTA from "./components/home/FinalCTA";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ProductsSection />
      <EngineeringSection />
      <IngredientsSection />
      <ClinicalBanner />
      <BenefitsSection />
      <AboutSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
  
    </div>
  );
}
