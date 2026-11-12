"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DemoTrigger } from "../demo/DemoModal";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Benefits", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled || menuOpen ? "site-header-solid" : ""}`}>
      <div className="site-container header-inner">
        <Link href="/" className="brand-link" aria-label="PurePic home" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/brand/purepic-logo-dark.png"
            alt="PurePic AI Photo Selection"
            width={300}
            height={93}
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(({ label, href }) => <a key={label} href={href}>{label}</a>)}
        </nav>

        <DemoTrigger className="header-demo button button-primary">
          Get Free Demo <ArrowRight aria-hidden="true" size={19} strokeWidth={2} />
        </DemoTrigger>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={25} /> : <Menu aria-hidden="true" size={25} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? "mobile-nav-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!menuOpen}
      >
        <div className="site-container mobile-nav-inner">
          {navigation.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <DemoTrigger className="button button-primary" onOpen={() => setMenuOpen(false)}>
            Get Free Demo <ArrowRight aria-hidden="true" size={19} />
          </DemoTrigger>
        </div>
      </nav>
    </header>
  );
}
