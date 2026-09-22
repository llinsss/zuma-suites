"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { FAQS } from "@/lib/data";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Have Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before you arrive."
        />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`border transition-colors ${open === i ? "border-[#C9A84C]/40 bg-[#0F0F0F]" : "border-white/5 bg-[#0A0A0A] hover:border-white/10"}`}
          >
            <button
              className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-white font-normal text-base" style={{ fontFamily: "var(--font-playfair)" }}>
                {faq.question}
              </span>
              {open === i ? (
                <ChevronUp size={18} className="text-[#C9A84C] flex-shrink-0" />
              ) : (
                <ChevronDown size={18} className="text-white/30 flex-shrink-0" />
              )}
            </button>
            {open === i && (
              <div className="px-6 pb-5">
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}

        <div className="mt-12 text-center pt-6 border-t border-white/5">
          <p className="text-white/40 text-sm mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="mailto:reservations@zumasuites.com"
            className="inline-block text-[#C9A84C] text-sm border border-[#C9A84C]/40 hover:border-[#C9A84C] px-6 py-2.5 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Email Us
          </a>
        </div>
      </section>
    </>
  );
}
