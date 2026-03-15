import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Stats } from "@/components/Stats";
import { AIAssistant } from "@/components/AIAssistant";

const Index = () => {
  return (
    <>
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-50 focus-within:flex focus-within:flex-col focus-within:gap-2">
        <a
          href="#main-content"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-none ring-2 ring-primary ring-offset-2 ring-offset-background focus:not-sr-only"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-none ring-2 ring-primary ring-offset-2 ring-offset-background focus:not-sr-only"
        >
          Skip to navigation
        </a>
        <a
          href="#footer"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg outline-none ring-2 ring-primary ring-offset-2 ring-offset-background focus:not-sr-only"
        >
          Skip to footer
        </a>
      </div>
      <main id="main-content" className="min-h-screen w-full bg-black">
        <ScrollProgress />
        <Header />
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Projects />
        <AIAssistant />
        <Contact />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
};

export default Index;
