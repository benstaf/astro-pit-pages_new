import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ModelsSection } from "@/components/landing/ModelsSection";
import { BenchmarkChart } from "@/components/landing/BenchmarkChart";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";
import { ResearchSection } from "@/components/landing/ResearchSection";
import { BlogSection } from "@/components/landing/BlogSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <ModelsSection />
        <BenchmarkChart />
        <HowItWorks />
        <PricingSection />
        <ResearchSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
