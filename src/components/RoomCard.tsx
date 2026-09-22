import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble, Bath, ArrowRight } from "lucide-react";

interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  size: string;
  guests: number;
  beds: string;
  baths: number;
  image: string;
  badge?: string;
}

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="group relative bg-[#111] border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-500 overflow-hidden">
      {room.badge && (
        <div className="absolute top-4 left-4 z-10 bg-[#C9A84C] text-black text-xs font-semibold tracking-widest uppercase px-3 py-1" style={{ fontFamily: "var(--font-inter)" }}>
          {room.badge}
        </div>
      )}

      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          {room.size}
        </p>
        <h3 className="text-xl text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
          {room.name}
        </h3>
        <p className="text-white/50 text-sm mb-5 line-clamp-2" style={{ fontFamily: "var(--font-inter)" }}>
          {room.tagline}
        </p>

        <div className="flex gap-5 text-white/40 text-xs mb-6" style={{ fontFamily: "var(--font-inter)" }}>
          <span className="flex items-center gap-1.5">
            <Users size={13} /> {room.guests} guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={13} /> {room.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} /> {room.baths} bath
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-wider text-white/30 uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              From
            </p>
            <p className="text-[#C9A84C] text-xl font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
              ₦{room.price.toLocaleString()}
              <span className="text-white/30 text-xs font-normal"> /night</span>
            </p>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="flex items-center gap-2 text-[#C9A84C] text-sm hover:gap-3 transition-all group/link"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            View Suite <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
