import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ChevronDown, Wifi, Shield, Zap, Car } from "lucide-react";
import type { Metadata } from "next";
import Countdown from "@/components/Countdown";
import RoomCard from "@/components/RoomCard";
import SectionTitle from "@/components/SectionTitle";
import { ROOMS, TESTIMONIALS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Houzz Hills Kaduna | Luxury Serviced Apartments — Opening November 2026",
  description:
    "Kaduna's most anticipated luxury address. Book your early reservation at Houzz Hills and secure exclusive pre-launch rates. Opening November 2026.",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Houzz Hills Kaduna",
  description:
    "Luxury serviced apartments in Kaduna State, Nigeria. Opening November 2026.",
  url: "https://houzzhills.com",
  telephone: "+2348012345678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15 Ahmadu Bello Way, CBD",
    addressLocality: "Kaduna",
    addressRegion: "Kaduna State",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.5222,
    longitude: 7.4382,
  },
  priceRange: "₦₦₦",
  openingDate: "2026-11-01",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=90"
            alt="Houzz Hills Kaduna luxury exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#080808]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">
          <p
            className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-6 animate-fadeInUp"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Opening November 2026 · Kaduna, Nigeria
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-normal text-white leading-none mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Where Luxury<br />
            <span className="italic text-[#C9A84C]">Finds Its Home</span>
          </h1>
          <p
            className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Houzz Hills redefines premium living in Kaduna State. Fully serviced apartments crafted for discerning travellers, executives, and families.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/reserve"
              className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black font-semibold tracking-widest uppercase px-8 py-4 text-sm transition-all hover:scale-105"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Reserve Your Suite
            </Link>
            <Link
              href="/rooms"
              className="border border-white/30 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] font-semibold tracking-widest uppercase px-8 py-4 text-sm transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore Rooms
            </Link>
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center">
            <p
              className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Grand Opening Countdown
            </p>
            <Countdown />
          </div>
        </div>

        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-[#C9A84C] transition-colors animate-float">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ── TRUST BAR ── */}
      <section id="about" className="bg-[#0D0D0D] border-y border-[#C9A84C]/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Wifi, label: "100 Mbps Fibre WiFi" },
            { icon: Zap, label: "24/7 Power Supply" },
            { icon: Shield, label: "Armed Security" },
            { icon: Car, label: "Secure Parking" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon size={20} className="text-[#C9A84C]" />
              <span
                className="text-white/50 text-xs tracking-wider uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionTitle
            eyebrow="The Houzz Hills Experience"
            title="A New Standard of Living in Kaduna"
            subtitle="From the moment you step in, Houzz Hills announces itself — not loudly, but with the quiet confidence of exceptional design, impeccable service, and an address that says everything."
          />
          <div className="grid grid-cols-2 gap-6 mt-10">
            {[
              { value: "4", label: "Suite Categories" },
              { value: "19", label: "Floors of Luxury" },
              { value: "12+", label: "Amenities" },
              { value: "24/7", label: "Concierge Service" },
            ].map(({ value, label }) => (
              <div key={label} className="border border-[#C9A84C]/20 p-5">
                <p className="text-3xl text-[#C9A84C] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{value}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
            alt="Houzz Hills interior lobby"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute -bottom-6 -left-6 w-40 h-40 border border-[#C9A84C]/40" />
          <div className="absolute -top-6 -right-6 w-40 h-40 border border-[#C9A84C]/20" />
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionTitle
              eyebrow="Accommodation"
              title="Choose Your Suite"
              subtitle="Four exceptional categories, each with its own character."
            />
            <Link
              href="/rooms"
              className="flex items-center gap-2 text-[#C9A84C] text-sm whitespace-nowrap hover:gap-3 transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              View All Suites <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80"
            alt="Houzz Hills pool"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            The Rooftop
          </p>
          <h2 className="text-4xl sm:text-5xl text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Kaduna From A Different Angle
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Our rooftop infinity pool and terrace offer an uninterrupted panorama of Kaduna city — the perfect backdrop for morning swims and sunset cocktails.
          </p>
          <Link
            href="/amenities"
            className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black text-sm tracking-widest uppercase px-8 py-3.5 transition-all"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            See All Amenities <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            eyebrow="Guest Stories"
            title="What Our Early Guests Say"
            subtitle="Hear from those who experienced Houzz Hills at our exclusive preview events."
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#111] border border-white/5 p-8 hover:border-[#C9A84C]/30 transition-colors">
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "var(--font-playfair)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>{t.name}</p>
                    <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER / EARLY BIRD ── */}
      <section className="py-24 bg-[#0D0D0D] border-y border-[#C9A84C]/10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Pre-Launch Offer
          </p>
          <h2 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Secure Your Early Bird Rate
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Register your interest today and receive a 20% discount on your first stay, plus priority room selection before our public opening.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/30 px-5 py-3.5 text-sm outline-none focus:border-[#C9A84C] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <button
              type="submit"
              className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black font-semibold text-sm tracking-widest uppercase px-8 py-3.5 transition-all whitespace-nowrap"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Join Waitlist
            </button>
          </form>
          <p className="text-white/20 text-xs mt-4" style={{ fontFamily: "var(--font-inter)" }}>
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-center">
        <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
          Opening November 2026
        </p>
        <h2 className="text-4xl sm:text-6xl text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
          Be Among The First.
        </h2>
        <p className="text-white/50 max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          Reservations are open. Secure your preferred suite now and experience Kaduna like never before.
        </p>
        <Link
          href="/reserve"
          className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#E8C97A] text-black font-semibold tracking-widest uppercase px-10 py-4 text-sm transition-all hover:scale-105"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Make a Reservation <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
