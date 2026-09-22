import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Zuma Suites — our story, vision, and the team behind Kaduna's most anticipated luxury serviced apartment complex.",
};

const TEAM = [
  {
    name: "Alhaji Musa Ibrahim",
    role: "Founder & Chairman",
    image: "https://images.unsplash.com/photo-1560250097-0dc05a977c9e?w=400&q=80",
    bio: "A veteran real estate developer with over 25 years across Nigeria's hospitality sector. Musa's vision was simple: Kaduna deserved a property that could stand shoulder-to-shoulder with the world's finest.",
  },
  {
    name: "Chidinma Osei",
    role: "CEO & Managing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Former General Manager at Transcorp Hilton Abuja. Chidinma brings an exceptional track record in luxury hospitality operations and a deep passion for Nigerian tourism.",
  },
  {
    name: "Tariq Al-Rashid",
    role: "Head of Design & Architecture",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Internationally acclaimed architect behind projects in Dubai, London, and Lagos. Tariq designed Zuma Suites to honour Kaduna's heritage while projecting its global future.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
            alt="Kaduna city"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>Our Story</p>
          <h1 className="text-5xl sm:text-6xl text-white max-w-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Built for Kaduna.<br />Made for the World.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionTitle eyebrow="The Vision" title="Why Zuma Suites?" />
          <div className="space-y-5 mt-6 text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            <p>
              For too long, executives and professionals visiting Kaduna had to choose between dated government hotels and informal short-let apartments. Zuma Suites was born out of a conviction that Northern Nigeria&apos;s most strategically important city deserved better.
            </p>
            <p>
              Named after the iconic Zuma Rock — the towering sentinel that stands at the gateway to Abuja from Kaduna — our suites embody the same strength, permanence, and quiet grandeur of that landmark.
            </p>
            <p>
              Every design decision, every material selected, every service protocol was crafted with one goal: to create an address that Kaduna can be proud of — and that guests around the world will choose again and again.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-64 col-span-2">
            <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="Zuma Suites exterior" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="relative h-44">
            <Image src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80" alt="Suite interior" fill className="object-cover" sizes="25vw" />
          </div>
          <div className="relative h-44">
            <Image src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80" alt="Pool area" fill className="object-cover" sizes="25vw" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Our Pillars" title="What We Stand For" center />
          <div className="grid sm:grid-cols-3 gap-px mt-14 bg-[#C9A84C]/10">
            {[
              { title: "Excellence", text: "We settle for nothing less than the finest — in design, service, and experience." },
              { title: "Authenticity", text: "Rooted in Nigerian culture, expressed through a global lens. Proudly Kaduna." },
              { title: "Security", text: "Your safety and privacy are our first and non-negotiable priority." },
            ].map((v) => (
              <div key={v.title} className="bg-[#0A0A0A] p-10 text-center">
                <div className="w-px h-12 bg-[#C9A84C] mx-auto mb-6" />
                <h3 className="text-2xl text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="The Team" title="Leadership" center />
        <div className="grid sm:grid-cols-3 gap-8 mt-14">
          {TEAM.map((member) => (
            <div key={member.name} className="group">
              <div className="relative h-80 overflow-hidden mb-5">
                <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-inter)" }}>{member.role}</p>
              <h3 className="text-white text-xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{member.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle eyebrow="Find Us" title="Prime Location in Kaduna" />
            <div className="mt-6 space-y-4">
              {[
                { icon: MapPin, text: "15 Ahmadu Bello Way, CBD, Kaduna, Kaduna State, Nigeria" },
                { icon: Phone, text: "+234 801 234 5678" },
                { icon: Mail, text: "reservations@zumasuites.com" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              <p>✦ 12 minutes from Kaduna International Airport</p>
              <p>✦ 5 minutes from Kaduna State Government Secretariat</p>
              <p>✦ 3 minutes from Kaduna Central Business District</p>
              <p>✦ 2 hours from Abuja via Expressway</p>
            </div>
          </div>
          <div className="h-80 bg-[#111] border border-[#C9A84C]/20 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={40} className="text-[#C9A84C] mx-auto mb-3" />
              <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Interactive map launching soon</p>
              <Link
                href="https://maps.google.com/?q=Ahmadu+Bello+Way+Kaduna+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[#C9A84C] text-sm hover:underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Open in Google Maps <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
