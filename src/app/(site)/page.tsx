import HeroSlider from "@/components/HeroSlider";
import About from "@/components/About";
import Services from "@/components/Services";
import Companies from "@/components/Companies";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import PricingCalculator from "@/components/PricingCalculator";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <About preview />
      <Services preview />
      <Companies preview />
      <Projects preview />
      <Process />
      <PricingCalculator />
      <Testimonials />
      <CTABanner />
    </>
  );
}
