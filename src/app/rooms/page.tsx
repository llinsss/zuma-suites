import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble, Bath, Maximize, ArrowRight, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { ROOMS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Explore Houzz Hills' four luxury suite categories — Studio Deluxe, Executive Suite, Two-Bedroom Suite, and The Houzz Hills Penthouse. Premium furnished apartments in Kaduna.",
};

export default function RoomsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=80"
            alt="Houzz Hills room overview"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Accommodation
          </p>
          <h1 className="text-5xl sm:text-6xl text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Rooms & Suites
          </h1>
          <p className="text-white/50 mt-4 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Four categories of luxury living, each designed to meet a different need — yet all sharing the same uncompromising standard.
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        {ROOMS.map((room, i) => (
          <div
            key={room.id}
            className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
          >
            <div className={`relative h-[400px] overflow-hidden ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}>
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {room.badge && (
                <div className="absolute top-5 right-5 bg-[#C9A84C] text-black text-xs font-semibold tracking-widest uppercase px-4 py-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {room.badge}
                </div>
              )}
            </div>

            <div className={i % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}>
              <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                {room.floor}
              </p>
              <h2 className="text-3xl sm:text-4xl text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                {room.name}
              </h2>
              <p className="text-[#C9A84C] text-sm italic mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {room.tagline}
              </p>
              <p className="text-white/60 leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                {room.description}
              </p>

              <div className="flex flex-wrap gap-5 text-white/50 text-sm mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                <span className="flex items-center gap-2"><Maximize size={15} className="text-[#C9A84C]" /> {room.size}</span>
                <span className="flex items-center gap-2"><Users size={15} className="text-[#C9A84C]" /> {room.guests} Guests</span>
                <span className="flex items-center gap-2"><BedDouble size={15} className="text-[#C9A84C]" /> {room.beds}</span>
                <span className="flex items-center gap-2"><Bath size={15} className="text-[#C9A84C]" /> {room.baths} Bath</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-8">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    <CheckCircle size={13} className="text-[#C9A84C] flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/30 text-xs tracking-wider uppercase" style={{ fontFamily: "var(--font-inter)" }}>From</p>
                  <p className="text-[#C9A84C] text-2xl font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                    ₦{room.price.toLocaleString()}<span className="text-white/30 text-sm font-normal"> /night</span>
                  </p>
                </div>
                <Link
                  href="/reserve"
                  className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-sm font-semibold tracking-widest uppercase px-6 py-3 transition-all"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Reserve <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0D0D0D] border-t border-[#C9A84C]/10 text-center px-4">
        <p className="text-white/50 mb-4" style={{ fontFamily: "var(--font-inter)" }}>
          Need help choosing the right suite?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black text-sm tracking-widest uppercase px-8 py-3 transition-all"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Talk to Our Team <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
