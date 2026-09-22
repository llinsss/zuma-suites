"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-11-01T00:00:00");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function update() {
      const diff = TARGET_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: pad(time.hours) },
    { label: "Minutes", value: pad(time.minutes) },
    { label: "Seconds", value: pad(time.seconds) },
  ];

  return (
    <div className="flex gap-3 sm:gap-6">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="countdown-digit w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-lg border border-[#C9A84C]/30 bg-black/60 backdrop-blur-sm">
            <span
              className="text-2xl sm:text-3xl font-bold text-[#C9A84C]"
              style={{ fontFamily: "var(--font-inter)", fontVariantNumeric: "tabular-nums" }}
            >
              {value}
            </span>
          </div>
          <span
            className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
