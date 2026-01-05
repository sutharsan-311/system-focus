import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Resume />
      <Contact />
      <Footer />
      <AIAssistant />
    </main>
  );
};

export default Index;
