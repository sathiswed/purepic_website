import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import ProductIntro from "@/components/sections/ProductIntro";
import Challenges from "@/components/sections/Challenges";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import UseCases from "@/components/sections/UseCases";
import Benefits from "@/components/sections/Benefits";
import ProductDemo from "@/components/sections/ProductDemo";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import "./sections.css";
import "./features.css";
import "./how-it-works.css";
import "./use-cases-benefits.css";
import "./demo-cta.css";
import "./footer.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <span id="about-purepic" className="block scroll-mt-24" aria-hidden="true" />
        <ProductIntro />
        <Challenges />
        <Features />
        <HowItWorks />
        <UseCases />
        <Benefits />
        <span id="product-demo" className="block scroll-mt-24" aria-hidden="true" />
        <ProductDemo />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
