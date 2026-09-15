"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#C9A84C]/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="text-2xl tracking-widest uppercase text-[#C9A84C]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Zuma
          </span>
          <span className="text-[10px] tracking-[0.35em] text-white/60 uppercase font-light" style={{ fontFamily: "var(--font-inter)" }}>
            Suites · Kaduna
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-[#C9A84C] text-sm tracking-widest uppercase transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+2348012345678"
            className="flex items-center gap-2 text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
          >
            <Phone size={14} />
            <span className="tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>+234 801 234 5678</span>
          </a>
          <Link
            href="/reserve"
            className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-sm font-semibold tracking-widest uppercase px-6 py-2.5 transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reserve Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#080808]/98 backdrop-blur-md border-t border-[#C9A84C]/20 px-4 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-[#C9A84C] text-sm tracking-widest uppercase py-2 border-b border-white/5 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reserve"
            className="mt-2 bg-[#C9A84C] text-black text-sm font-semibold tracking-widest uppercase px-6 py-3 text-center"
            style={{ fontFamily: "var(--font-inter)" }}
            onClick={() => setOpen(false)}
          >
            Reserve Now
          </Link>
        </div>
      )}
    </header>
  );
}
