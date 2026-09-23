import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BedDouble, Check, Users } from "lucide-react";

const apartments = {
  studio: {
    name: "The Studio",
    tagline: "Quiet, considered, effortlessly yours",
    price: "₦45,000",
    size: "38 sqm",
    guests: "2 guests",
    description: "A calm, beautifully proportioned apartment for solo travellers and couples who value good design, privacy, and an easy stay in Kaduna.",
    image: "/images/houzzhills-bedroom.png",
    media: ["/images/houzzhills-bedroom.png", "/images/houzzhills-hero.png"],
    features: ["Queen bed", "Kitchenette", "Dedicated work desk", "Fast Wi-Fi", "24/7 support", "Secure parking"],
  },
  "one-bedroom": {
    name: "The One Bedroom",
    tagline: "Room to settle into Kaduna",
    price: "₦75,000",
    size: "62 sqm",
    guests: "2–3 guests",
    description: "A generous one-bedroom retreat with the room to work, rest, host, and stay awhile. Ideal for business trips and longer Kaduna visits.",
    image: "/images/houzzhills-hero.png",
    media: ["/images/houzzhills-hero.png", "/images/houzzhills-bedroom.png"],
    features: ["King bed", "Separate living room", "Full kitchen", "Dining area", "Fast Wi-Fi", "24/7 support"],
  },
  penthouse: {
    name: "The Penthouse",
    tagline: "A little more room for the good life",
    price: "₦200,000",
    size: "126 sqm",
    guests: "Up to 6 guests",
    description: "Our most expansive apartment, designed for families, small groups, and guests who want Kaduna living with more space, more light, and more privacy.",
    image: "/images/houzzhills-hero.png",
    media: ["/images/houzzhills-hero.png", "/images/houzzhills-bedroom.png"],
    features: ["Two bedrooms", "Large living room", "Full kitchen", "Dining area", "Fast Wi-Fi", "Secure parking"],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(apartments).map((slug) => ({ slug }));
}

export default async function ApartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apartment = apartments[slug as keyof typeof apartments];

  if (!apartment) return null;

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#202b28]">
      <header className="border-b border-[#e6dfd2] bg-[#263b34] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="font-serif text-2xl">Houzzhills.</Link>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-[#dfb56f] px-5 py-3 text-sm font-semibold text-[#263b34]">
            Book this apartment <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
        <Link href="/#apartments" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#263b34]"><ArrowLeft size={15} /> Back to apartments</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="overflow-hidden rounded-[32px] bg-[#c9a982] shadow-xl">
            <img src={apartment.image} alt={`${apartment.name} at Houzzhills`} className="h-[420px] w-full object-cover sm:h-[560px]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#b28247]">Houzzhills · Kaduna</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight text-[#263b34] sm:text-7xl">{apartment.name}</h1>
            <p className="mt-4 text-lg text-stone-500">{apartment.tagline}</p>
            <p className="mt-7 max-w-lg text-sm leading-7 text-stone-600">{apartment.description}</p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-[#e6dfd2] py-5 text-sm">
              <div><BedDouble size={17} className="mb-2 text-[#31715d]" /><b>{apartment.size}</b><span className="mt-1 block text-xs text-stone-500">space</span></div>
              <div><Users size={17} className="mb-2 text-[#31715d]" /><b>{apartment.guests}</b><span className="mt-1 block text-xs text-stone-500">capacity</span></div>
              <div><b className="font-serif text-xl">{apartment.price}</b><span className="mt-1 block text-xs text-stone-500">per night</span></div>
            </div>
            <Link href="/book" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#263b34] px-7 py-4 text-sm font-semibold text-white hover:bg-[#1a2c26]">Check availability <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <section className="mt-20 border-t border-[#e6dfd2] pt-12">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#b28247]">Included with your stay</p><h2 className="mt-4 font-serif text-4xl text-[#263b34]">Everything considered.</h2></div>
            <div className="grid gap-3 sm:grid-cols-2">{apartment.features.map((feature) => <div key={feature} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm shadow-sm"><Check size={16} className="text-[#31715d]" /> {feature}</div>)}</div>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#b28247]">A closer look</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">{apartment.media.map((image, index) => <div key={image} className="overflow-hidden rounded-[28px] bg-[#d9c6ad]"><img src={image} alt={`${apartment.name} view ${index + 1}`} className="h-[300px] w-full object-cover" /></div>)}</div>
        </section>
      </div>
    </main>
  );
}
