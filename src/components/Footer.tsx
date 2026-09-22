import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <div className="text-3xl tracking-widest uppercase text-[#C9A84C]" style={{ fontFamily: "var(--font-playfair)" }}>
              Zuma
            </div>
            <div className="text-[10px] tracking-[0.35em] text-white/40 uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Suites · Kaduna
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
            Kaduna&apos;s most anticipated luxury address. Where business meets comfort, and every detail tells a story.
          </p>
          <div className="flex gap-4">
            {[
              { label: "Instagram", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
              { label: "Facebook", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
              { label: "X (Twitter)", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { label: "LinkedIn", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
            ].map(({ label, svg }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 border border-[#C9A84C]/30 flex items-center justify-center text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all duration-300"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-5" style={{ fontFamily: "var(--font-inter)" }}>
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { href: "/rooms", label: "Rooms & Suites" },
              { href: "/amenities", label: "Amenities" },
              { href: "/gallery", label: "Gallery" },
              { href: "/about", label: "About Us" },
              { href: "/blog", label: "Blog" },
              { href: "/faq", label: "FAQ" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/50 hover:text-[#C9A84C] text-sm transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Room Types */}
        <div>
          <h4 className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-5" style={{ fontFamily: "var(--font-inter)" }}>
            Accommodation
          </h4>
          <ul className="space-y-3">
            {[
              "Studio Deluxe",
              "Executive Suite",
              "Two-Bedroom Suite",
              "The Zuma Penthouse",
            ].map((room) => (
              <li key={room}>
                <Link
                  href="/rooms"
                  className="text-white/50 hover:text-[#C9A84C] text-sm transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {room}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-5" style={{ fontFamily: "var(--font-inter)" }}>
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
              <span className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                15 Ahmadu Bello Way, CBD, Kaduna, Kaduna State, Nigeria
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={16} className="text-[#C9A84C] flex-shrink-0" />
              <a href="tel:+2348012345678" className="text-white/50 hover:text-[#C9A84C] text-sm transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                +234 801 234 5678
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={16} className="text-[#C9A84C] flex-shrink-0" />
              <a href="mailto:reservations@zumasuites.com" className="text-white/50 hover:text-[#C9A84C] text-sm transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                reservations@zumasuites.com
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/reserve"
              className="inline-block bg-[#C9A84C] text-black text-xs font-semibold tracking-widest uppercase px-5 py-2.5 hover:bg-[#E8C97A] transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Reserve Early
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#C9A84C]/10 py-6 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/30 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
          © 2026 Zuma Suites Ltd. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link key={item} href="#" className="text-white/30 hover:text-[#C9A84C] text-xs transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
