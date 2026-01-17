"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, Code, FolderKanban, Mail, Download, Menu } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { name: "Home", url: "#", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Experience", url: "#experience", icon: Briefcase },
  { name: "Skills", url: "#skills", icon: Code },
  { name: "Projects", url: "#projects", icon: FolderKanban },
  { name: "Contact", url: "#contact", icon: Mail },
];

/**
 * Header component - Fixed navigation header with desktop and mobile menu support.
 * Features active section highlighting, smooth scroll with offset, and responsive hamburger menu.
 */
export function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => item.url.replace("#", ""))
        .filter(Boolean);
      
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        const activeItem = navItems.find(
          (item) => item.url === `#${current}`
        );
        if (activeItem) {
          setActiveTab(activeItem.name);
        }
      } else if (window.scrollY < 100) {
        setActiveTab("Home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, name: string) => {
    e.preventDefault();
    setActiveTab(name);
    setIsMenuOpen(false);
    
    if (url === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(url);
      if (element) {
        const headerOffset = 100; // Offset for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const MobileNavItem = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
    const Icon = item.icon;
    return (
      <a
        href={item.url}
        onClick={(e) => handleClick(e, item.url, item.name)}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
          "text-foreground hover:bg-muted",
          isActive && "bg-muted text-primary"
        )}
      >
        <Icon size={20} />
        <span className="font-medium">{item.name}</span>
      </a>
    );
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded-lg bg-background/5 border border-border backdrop-blur-lg shadow-lg text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
            >
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-background border-border">
            <div className="flex flex-col gap-2 mt-8">
              <h2 className="text-lg font-semibold mb-4 px-4">Navigation</h2>
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.name}
                  item={item}
                  isActive={activeTab === item.name}
                />
              ))}
              <a
                href="/system-focus/resume.pdf"
                download="Sutharsan_Resume.pdf"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-muted mt-2"
              >
                <Download size={20} />
                <span className="font-medium">Resume</span>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none hidden md:block">
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg pointer-events-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleClick(e, item.url, item.name)}
              aria-label={`Navigate to ${item.name} section`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isActive && "bg-muted text-white"
              )}
            >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                      <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </a>
            );
          })}
          <a
            href="/system-focus/resume.pdf"
            download="Sutharsan_Resume.pdf"
            aria-label="Download resume"
            className={cn(
              "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
              "text-foreground/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-2"
            )}
          >
            <span className="hidden md:inline">Resume</span>
            <Download size={18} strokeWidth={2.5} className="md:hidden" />
          </a>
        </div>
      </div>
    </>
  );
}
