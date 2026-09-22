import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Lock, Star } from "lucide-react";
import { ROOMS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reserve Your Suite",
  description:
    "Secure your early reservation at Houzz Hills Kaduna. Lock in your preferred suite with exclusive pre-launch pricing. Opening November 2026.",
};

export default function ReservePage() {
  return (
    <>
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — Form */}
        <div>
          <div className="mb-8">
            <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              Early Reservation
            </p>
            <h1 className="text-4xl sm:text-5xl text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Reserve Your Suite
            </h1>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              We open in November 2026. Secure your preferred room type now at our exclusive pre-launch rate — fully refundable up to 30 days before arrival.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {[
              "Free cancellation",
              "Price match guarantee",
              "Instant confirmation",
            ].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5 text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                <CheckCircle size={13} className="text-[#C9A84C]" /> {tag}
              </div>
            ))}
          </div>

          <form className="space-y-5 bg-[#0F0F0F] border border-white/5 p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>First Name *</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
              </div>
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Last Name *</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
              </div>
            </div>
            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Email Address *</label>
              <input required type="email" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
            </div>
            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Phone Number *</label>
              <input required type="tel" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" placeholder="+234" style={{ fontFamily: "var(--font-inter)" }} />
            </div>

            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Suite Type *</label>
              <select required className="w-full bg-white/5 border border-white/10 text-white/70 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                <option value="">Select a suite</option>
                {ROOMS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — from ₦{r.price.toLocaleString()}/night
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Check-in Date</label>
                <input type="date" min="2026-11-01" className="w-full bg-white/5 border border-white/10 text-white/70 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
              </div>
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Check-out Date</label>
                <input type="date" min="2026-11-02" className="w-full bg-white/5 border border-white/10 text-white/70 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
              </div>
            </div>

            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Special Requests</label>
              <textarea rows={3} className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors resize-none" placeholder="Airport pickup, dietary requirements, early check-in..." style={{ fontFamily: "var(--font-inter)" }} />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C9A84C] hover:bg-[#E8C97A] text-black font-semibold text-sm tracking-widest uppercase py-4 transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Lock size={14} /> Submit Reservation Request
            </button>

            <p className="text-white/20 text-xs text-center" style={{ fontFamily: "var(--font-inter)" }}>
              Your data is encrypted and will only be used to process your reservation. No payment is required today.
            </p>
          </form>
        </div>

        {/* Right — Summary */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="bg-[#0F0F0F] border border-[#C9A84C]/20 p-6">
            <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-inter)" }}>Early Bird Offer</p>
            <h3 className="text-white text-xl mb-3" style={{ fontFamily: "var(--font-playfair)" }}>20% Off Your First Stay</h3>
            <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Reserve before 30 September 2026 and receive a guaranteed 20% discount applied at check-in. No code needed.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Fully refundable up to 30 days before arrival",
              "No credit card required to reserve",
              "Priority room selection before public launch",
              "Complimentary early bird welcome package",
              "Dedicated pre-arrival concierge assistance",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0F0F0F] border border-white/5 p-6 relative overflow-hidden">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#C9A84C] text-[#C9A84C]" />)}
            </div>
            <p className="text-white/60 text-sm italic leading-relaxed" style={{ fontFamily: "var(--font-playfair)" }}>
              &ldquo;The preview stay was extraordinary. We booked immediately for November. Do not miss this.&rdquo;
            </p>
            <p className="text-white/30 text-xs mt-3" style={{ fontFamily: "var(--font-inter)" }}>— Chisom E., Lagos</p>
          </div>

          <div className="relative h-40 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
              alt="Executive Suite"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white/70 text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>Opening November 2026</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
