import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-150",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16">
        <a
          href="#"
          onClick={(e) => handleClick(e, "#")}
          className="font-mono text-sm text-foreground hover:text-primary transition-colors duration-150"
        >
          sutharsan.dev
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors duration-150"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
