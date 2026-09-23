"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DESTINATIONS = [
  { label: "Dashboard", hint: "Overview and today’s activity", href: "/dashboard", group: "Navigate" },
  { label: "Rooms", hint: "Room status and availability", href: "/rooms", group: "Navigate" },
  { label: "Reservations", hint: "Bookings, arrivals and departures", href: "/reservations", group: "Navigate" },
  { label: "Guests", hint: "Guest profiles and history", href: "/guests", group: "Navigate" },
  { label: "Housekeeping", hint: "Cleaning tasks and inspections", href: "/housekeeping", group: "Navigate" },
  { label: "Billing & Payments", hint: "Folios, charges and payments", href: "/billing", group: "Navigate" },
  { label: "Reports", hint: "Revenue and occupancy insights", href: "/reports", group: "Navigate" },
  { label: "Reservation workspace", hint: "Open bookings and create a reservation", href: "/reservations", group: "Quick action" },
] as const;

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return DESTINATIONS;
    return DESTINATIONS.filter(item => `${item.label} ${item.hint}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive(value => Math.min(value + 1, results.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(value => Math.max(value - 1, 0));
      }
      if (event.key === "Enter" && results[active]) {
        router.push(results[active].href);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [active, onClose, open, results, router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-stone-950/40 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Quick search" className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-0)] shadow-2xl" onMouseDown={event => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={event => { setQuery(event.target.value); setActive(0); }}
            placeholder="Search rooms, bookings, guests…"
            className="h-14 flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          <kbd className="rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">ESC</kbd>
        </div>
        <div className="max-h-[360px] overflow-y-auto p-2">
          {results.length ? results.map((item, index) => (
            <button
              key={item.href}
              onMouseEnter={() => setActive(index)}
              onClick={() => { router.push(item.href); onClose(); }}
              className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left", active === index ? "bg-brand-50 dark:bg-brand-950/30" : "hover:bg-[var(--surface-1)]")}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-xs font-semibold text-brand-700 dark:text-brand-300">{item.label.charAt(0)}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-[var(--text-primary)]">{item.label}</span>
                <span className="block truncate text-xs text-[var(--text-muted)]">{item.hint}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{item.group}</span>
            </button>
          )) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm font-medium text-[var(--text-primary)]">No matching destination</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">Try “rooms”, “billing” or “guests”.</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-[var(--border)] bg-[var(--surface-1)] px-4 py-2 text-[10px] text-[var(--text-muted)]">
          <span>↑↓ to move</span><span>↵ to open</span><span>esc to close</span>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return <svg className="h-4 w-4 shrink-0 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
}
