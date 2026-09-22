import type { Metadata } from "next";
import Image from "next/image";
import { Wifi, Zap, Waves, Dumbbell, UtensilsCrossed, ShieldCheck, Car, Flower2, Presentation, CookingPot, WashingMachine, PhoneCall } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "World-class amenities at Houzz Hills Kaduna — rooftop infinity pool, 24/7 power, high-speed WiFi, Houzz Hills Spa, Saffron Restaurant, conference rooms, and more.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  wifi: Wifi,
  generator: Zap,
  pool: Waves,
  gym: Dumbbell,
  restaurant: UtensilsCrossed,
  security: ShieldCheck,
  parking: Car,
  spa: Flower2,
  conference: Presentation,
  kitchen: CookingPot,
  laundry: WashingMachine,
  concierge: PhoneCall,
};

const AMENITIES = [
  { icon: "wifi", title: "High-Speed Fibre WiFi", description: "100Mbps dedicated fibre throughout the building with backup connectivity. Multiple access points ensure seamless coverage in every room, lobby, and outdoor space." },
  { icon: "generator", title: "24/7 Power Supply", description: "Industrial-grade generator system with automatic transfer switches. Zero perceptible downtime — your devices and appliances stay powered around the clock." },
  { icon: "pool", title: "Rooftop Infinity Pool", description: "Heated rooftop infinity pool with panoramic views of Kaduna city. Open daily from 6am to 10pm, with poolside lounge chairs, umbrellas, and towel service." },
  { icon: "gym", title: "Fully Equipped Gym", description: "State-of-the-art Technogym equipment including treadmills, bikes, free weights, and a dedicated stretch area. Personal training available on request." },
  { icon: "restaurant", title: "Saffron Restaurant & Bar", description: "Our flagship restaurant serves curated continental and Nigerian cuisine from 6am to midnight. The Houzz Hills Bar operates until 2am, with a cocktail menu crafted by internationally trained mixologists." },
  { icon: "security", title: "24/7 Armed Security", description: "Professionally trained security personnel, perimeter CCTV, biometric access control, and a dedicated security command room monitoring the property at all times." },
  { icon: "parking", title: "Secure Underground Parking", description: "Underground parking with CCTV coverage, designated bays per suite, EV charging points, and full-time valet service for guests." },
  { icon: "spa", title: "Houzz Hills Spa & Wellness Centre", description: "A full-service spa featuring treatment rooms, couples suites, sauna, steam room, hydrotherapy pool, and a premium beauty salon with skilled therapists." },
  { icon: "conference", title: "Conference & Event Facilities", description: "Three conference rooms with capacities from 10 to 120 delegates. Full AV, high-speed internet, catering, and dedicated event coordination services." },
  { icon: "kitchen", title: "Fully Stocked Premium Kitchen", description: "Every suite features premium built-in appliances — Miele or equivalent — complete with cookware, utensils, and a welcome pantry stocked on arrival." },
  { icon: "laundry", title: "Laundry & Dry Cleaning", description: "Same-day laundry, dry cleaning, and pressing service available daily. Collect and deliver to your door, or drop items at the front desk." },
  { icon: "concierge", title: "24-Hour Concierge & Business Support", description: "Our highly trained concierge team handles airport transfers, restaurant reservations, travel bookings, business centre access, courier services, and more." },
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", alt: "Infinity Pool" },
  { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", alt: "Gym" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Restaurant" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Spa" },
];

export default function AmenitiesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80"
            alt="Houzz Hills amenities"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>World-Class Facilities</p>
          <h1 className="text-5xl sm:text-6xl text-white" style={{ fontFamily: "var(--font-playfair)" }}>Amenities</h1>
          <p className="text-white/50 mt-4 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Every detail considered. Every comfort included. Houzz Hills delivers an experience that anticipates your every need.
          </p>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Everything Included"
          title="Designed Around You"
          subtitle="From the moment you arrive to the moment you leave, every aspect of your stay is taken care of."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px mt-16 bg-[#C9A84C]/10">
          {AMENITIES.map((item) => {
            const Icon = ICON_MAP[item.icon] || Wifi;
            return (
              <div key={item.icon} className="bg-[#0A0A0A] p-8 hover:bg-[#111] transition-colors group">
                <div className="w-12 h-12 border border-[#C9A84C]/30 flex items-center justify-center mb-5 group-hover:border-[#C9A84C] transition-colors">
                  <Icon size={20} className="text-[#C9A84C]" />
                </div>
                <h3 className="text-white text-lg mb-3" style={{ fontFamily: "var(--font-playfair)" }}>{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Gallery Strip */}
      <section className="py-16 bg-[#080808]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-7xl mx-auto px-4 sm:px-6">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.alt} className="relative h-56 overflow-hidden group">
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <p className="absolute bottom-3 left-3 text-white/70 text-xs tracking-wider uppercase" style={{ fontFamily: "var(--font-inter)" }}>{img.alt}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
