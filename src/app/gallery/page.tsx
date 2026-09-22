import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the gallery of Houzz Hills Kaduna — luxury interiors, rooftop pool, spa, restaurant, and city views.",
};

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", alt: "Studio Deluxe Bedroom", category: "Rooms", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", alt: "Executive Suite Living Area", category: "Rooms", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", alt: "Rooftop Infinity Pool", category: "Amenities", span: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80", alt: "Suite Bathroom", category: "Rooms", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Saffron Restaurant", category: "Dining", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Houzz Hills Spa", category: "Wellness", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", alt: "Fitness Centre", category: "Amenities", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", alt: "Penthouse View", category: "Rooms", span: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80", alt: "Two-Bedroom Suite", category: "Rooms", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80", alt: "Suite Kitchen", category: "Rooms", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80", alt: "Lobby Area", category: "Common Areas", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80", alt: "Suite Desk", category: "Rooms", span: "col-span-1 row-span-1" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Visual Tour"
          title="See Houzz Hills"
          subtitle="A glimpse into the spaces, textures and experiences that await you."
        />
      </section>

      {/* Masonry-style grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group cursor-pointer ${
                i === 2 || i === 7 ? "sm:col-span-2" : ""
              } ${i === 1 ? "sm:row-span-2" : ""}`}
              style={{ height: i === 2 || i === 7 ? "320px" : "260px" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#C9A84C] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>{img.category}</p>
                <p className="text-white text-sm" style={{ fontFamily: "var(--font-inter)" }}>{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Virtual Tour Placeholder */}
      <section className="py-16 bg-[#0A0A0A] text-center px-4">
        <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>Coming Soon</p>
        <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>360° Virtual Tour</h2>
        <p className="text-white/40 max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-inter)" }}>
          Walk through every suite and common area from your device. Our immersive virtual tour launches with the property in November 2026.
        </p>
      </section>
    </>
  );
}
