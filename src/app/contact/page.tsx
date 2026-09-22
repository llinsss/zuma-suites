import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Houzz Hills Kaduna — reservations, corporate enquiries, event bookings, and general information.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Get In Touch"
          title="We'd Love to Hear From You"
          subtitle="Whether you're planning a stay, booking for your team, or just have a question — we're here."
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 grid lg:grid-cols-2 gap-16">
        {/* Form */}
        <div className="bg-[#0F0F0F] border border-white/5 p-8 sm:p-10">
          <h2 className="text-2xl text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Send a Message</h2>
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>First Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" placeholder="Amara" style={{ fontFamily: "var(--font-inter)" }} />
              </div>
              <div>
                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Last Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" placeholder="Okafor" style={{ fontFamily: "var(--font-inter)" }} />
              </div>
            </div>
            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" placeholder="amara@example.com" style={{ fontFamily: "var(--font-inter)" }} />
            </div>
            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Phone Number</label>
              <input type="tel" className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" placeholder="+234 800 000 0000" style={{ fontFamily: "var(--font-inter)" }} />
            </div>
            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Enquiry Type</label>
              <select className="w-full bg-white/5 border border-white/10 text-white/70 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                <option value="">Select one...</option>
                <option>Room Reservation</option>
                <option>Corporate Booking</option>
                <option>Event & Conference</option>
                <option>General Enquiry</option>
                <option>Press & Media</option>
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>Message</label>
              <textarea rows={5} className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors resize-none" placeholder="Tell us how we can help..." style={{ fontFamily: "var(--font-inter)" }} />
            </div>
            <button
              type="submit"
              className="w-full bg-[#C9A84C] hover:bg-[#E8C97A] text-black font-semibold text-sm tracking-widest uppercase py-4 transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-10">
          <div>
            <h3 className="text-white text-xl mb-5" style={{ fontFamily: "var(--font-playfair)" }}>Contact Information</h3>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Address", text: "15 Ahmadu Bello Way, CBD\nKaduna, Kaduna State, Nigeria" },
                { icon: Phone, label: "Phone", text: "+234 801 234 5678\n+234 802 345 6789" },
                { icon: Mail, label: "Email", text: "reservations@houzzhills.com\nevents@houzzhills.com" },
              ].map(({ icon: Icon, label, text }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
                    <p className="text-white/50 text-sm whitespace-pre-line" style={{ fontFamily: "var(--font-inter)" }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-8">
            <h3 className="text-white text-xl mb-5" style={{ fontFamily: "var(--font-playfair)" }}>Quick Chat</h3>
            <p className="text-white/40 text-sm mb-5" style={{ fontFamily: "var(--font-inter)" }}>
              For the fastest response, reach us directly on WhatsApp. Our team is available 7am – 11pm daily.
            </p>
            <a
              href="https://wa.me/2348012345678?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20Houzz%20Hills"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-semibold px-6 py-3 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          <div className="border-t border-white/5 pt-8">
            <h3 className="text-white text-xl mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Office Hours</h3>
            <div className="space-y-2 text-sm text-white/40" style={{ fontFamily: "var(--font-inter)" }}>
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-white/60">8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white/60">9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday & Public Holidays</span>
                <span className="text-white/60">10:00 AM – 4:00 PM</span>
              </div>
              <p className="text-[#C9A84C] text-xs pt-2">Front desk & emergency line: 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
