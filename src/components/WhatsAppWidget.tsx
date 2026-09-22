"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const phone = "2348012345678";
  const message = encodeURIComponent("Hello! I'd like to make an enquiry about Zuma Suites Kaduna.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden border border-gray-100 animate-fadeInUp">
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-inter)" }}>Zuma Suites</p>
              <p className="text-green-200 text-xs" style={{ fontFamily: "var(--font-inter)" }}>Typically replies instantly</p>
            </div>
          </div>
          <div className="p-4 bg-[#ECE5DD]">
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
              <p className="text-gray-700 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                Hello! 👋 Welcome to Zuma Suites Kaduna. How can we assist you today?
              </p>
              <p className="text-gray-400 text-xs mt-1 text-right" style={{ fontFamily: "var(--font-inter)" }}>Just now</p>
            </div>
          </div>
          <div className="p-3 bg-[#ECE5DD] border-t border-[#DCF8C6]/50">
            <a
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366] text-white text-center text-sm font-semibold py-2.5 rounded-full hover:bg-[#20ba5a] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center shadow-lg transition-all hover:scale-110 pulse-gold"
        aria-label="Chat on WhatsApp"
      >
        {open ? <X size={24} className="text-white" /> : <MessageCircle size={26} className="text-white" />}
      </button>
    </div>
  );
}
