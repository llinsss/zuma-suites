"use client";
import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { Card, Badge, Button, Avatar, SectionHeader } from "@/components/ui";
import { formatNGN, formatDate, RESERVATION_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, cn } from "@/lib/utils";
import type { ReservationStatus } from "@/types";
import Link from "next/link";

const STATUS_TABS: { value: ReservationStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "checked_in", label: "In-House" },
  { value: "checked_out", label: "Checked Out" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No Show" },
];

export default function ReservationsPage() {
  const { state } = useApp();
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);

  const filtered = state.reservations.filter(r => {
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      r.confirmationNumber.toLowerCase().includes(q) ||
      r.guest?.firstName.toLowerCase().includes(q) ||
      r.guest?.lastName.toLowerCase().includes(q) ||
      r.room?.number.includes(q);
    return matchStatus && matchSearch;
  });

  const counts = state.reservations.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Reservations"
        subtitle="Manage bookings, check-ins, and check-outs"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Import</Button>
            <Button size="sm" onClick={() => setShowNew(true)}>+ New Reservation</Button>
          </div>
        }
      />

      {/* Status tabs */}
      <div className="flex gap-1 p-1 bg-[var(--surface-1)] rounded-xl w-fit flex-wrap">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              statusFilter === tab.value
                ? "bg-[var(--surface-0)] text-[var(--text-primary)] shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            )}
          >
            {tab.label}
            {tab.value !== "all" && counts[tab.value] ? (
              <span className="ml-1.5 text-xs text-[var(--text-muted)]">({counts[tab.value]})</span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, room, or confirmation #..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Confirmation", "Guest", "Room", "Check-In", "Check-Out", "Nights", "Total", "Balance", "Status", "Payment", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(res => {
                const resCfg = RESERVATION_STATUS_CONFIG[res.status];
                const payCfg = PAYMENT_STATUS_CONFIG[res.paymentStatus];
                return (
                  <tr key={res.id} className="hover:bg-[var(--surface-1)] transition-colors group">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">
                        {res.confirmationNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={`${res.guest?.firstName} ${res.guest?.lastName}`} size="sm" />
                        <div>
                          <p className="font-medium text-[var(--text-primary)] whitespace-nowrap">
                            {res.guest?.firstName} {res.guest?.lastName}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">{res.guest?.company || res.guest?.nationality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-[var(--text-primary)]">{res.room?.number}</span>
                      <p className="text-xs text-[var(--text-muted)]">{res.room?.name.split(" ").slice(-1)[0]}</p>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-nowrap">{formatDate(res.checkIn)}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-nowrap">{formatDate(res.checkOut)}</td>
                    <td className="px-4 py-3 text-center font-medium text-[var(--text-primary)]">{res.nights}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap">{formatNGN(res.grandTotal)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={cn("font-semibold", res.balance > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400")}>
                        {res.balance > 0 ? formatNGN(res.balance) : "Settled"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={resCfg.color} bg={resCfg.bg}>{resCfg.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={payCfg.color} bg={payCfg.bg}>{payCfg.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/reservations/${res.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                        {res.status === "confirmed" && (
                          <Button variant="primary" size="sm">Check In</Button>
                        )}
                        {res.status === "checked_in" && (
                          <Button variant="secondary" size="sm">Check Out</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-[var(--text-muted)]">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-medium">No reservations found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </Card>

      {/* New Reservation Modal */}
      {showNew && <NewReservationModal onClose={() => setShowNew(false)} />}
    </div>
  );
}

function NewReservationModal({ onClose }: { onClose: () => void }) {
  const { state } = useApp();
  const availableRooms = state.rooms.filter(r => r.status === "available" || r.status === "inspected");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">New Reservation</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--surface-1)] text-[var(--text-muted)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="First Name" placeholder="Emeka" />
            <FormField label="Last Name" placeholder="Okafor" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone" placeholder="+234 801 234 5678" type="tel" />
            <FormField label="Email" placeholder="guest@example.com" type="email" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Check-In Date" type="date" />
            <FormField label="Check-Out Date" type="date" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Room</label>
              <select className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30">
                <option value="">Select room...</option>
                {availableRooms.map(r => (
                  <option key={r.id} value={r.id}>{r.number} — {r.name} ({formatNGN(r.baseRate)}/night)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Booking Source</label>
              <select className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30">
                {["direct", "walk_in", "phone", "whatsapp", "booking_com", "airbnb", "corporate"].map(s => (
                  <option key={s} value={s}>{s.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Adults</label>
              <input type="number" min={1} max={6} defaultValue={1} className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Children</label>
              <input type="number" min={0} max={4} defaultValue={0} className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
            </div>
            <FormField label="Special Requests" placeholder="Optional..." />
          </div>

          {/* Rate preview */}
          <div className="p-4 rounded-xl bg-[var(--surface-1)] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">Room charge (0 nights)</span>
              <span className="font-medium text-[var(--text-primary)]">₦0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">VAT (7.5%)</span>
              <span className="font-medium text-[var(--text-primary)]">₦0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">Service charge (10%)</span>
              <span className="font-medium text-[var(--text-primary)]">₦0</span>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-[var(--border)] pt-2">
              <span className="text-[var(--text-primary)]">Grand Total</span>
              <span className="text-brand-600 dark:text-brand-400">₦0</span>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-[var(--border)] flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button>Create Reservation</Button>
        </div>
      </Card>
    </div>
  );
}

function FormField({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      />
    </div>
  );
}
