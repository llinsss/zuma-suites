"use client";
import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { Card, Badge, Button, Avatar, SectionHeader, ProgressBar } from "@/components/ui";
import { formatNGN, formatDate, cn } from "@/lib/utils";

export default function GuestsPage() {
  const { guests } = useApp();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = guests.filter(g => {
    const q = search.toLowerCase();
    return !q ||
      g.firstName.toLowerCase().includes(q) ||
      g.lastName.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      g.phone.includes(q) ||
      g.company?.toLowerCase().includes(q);
  });

  const selectedGuest = guests.find(g => g.id === selected);

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Guest Profiles"
        subtitle="Manage guest records, preferences, and history"
        action={<Button size="sm">+ New Guest</Button>}
      />

      <div className="flex gap-6">
        {/* Guest list */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search guests by name, email, phone, company..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.map(guest => (
              <Card
                key={guest.id}
                hover
                onClick={() => setSelected(guest.id === selected ? null : guest.id)}
                className={cn(
                  "p-4 transition-all",
                  selected === guest.id && "ring-2 ring-brand-500/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <Avatar name={`${guest.firstName} ${guest.lastName}`} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-[var(--text-primary)]">
                        {guest.firstName} {guest.lastName}
                      </p>
                      {guest.isBlacklisted && (
                        <Badge color="text-red-700 dark:text-red-400" bg="bg-red-50 dark:bg-red-950/40">Blacklisted</Badge>
                      )}
                      {guest.totalStays >= 10 && (
                        <Badge color="text-brand-700 dark:text-brand-400" bg="bg-brand-50 dark:bg-brand-950/40">⭐ VIP</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">{guest.email} · {guest.phone}</p>
                    {guest.company && (
                      <p className="text-xs text-[var(--text-muted)]">{guest.designation} @ {guest.company}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{guest.totalStays} stays</p>
                    <p className="text-xs text-[var(--text-muted)]">{formatNGN(guest.totalSpend)} total</p>
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">{guest.loyaltyPoints.toLocaleString()} pts</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Guest detail panel */}
        {selectedGuest && (
          <div className="w-80 shrink-0 space-y-4">
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={`${selectedGuest.firstName} ${selectedGuest.lastName}`} size="lg" />
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{selectedGuest.firstName} {selectedGuest.lastName}</p>
                  <p className="text-xs text-[var(--text-muted)]">{selectedGuest.nationality}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <DetailRow label="Email" value={selectedGuest.email} />
                <DetailRow label="Phone" value={selectedGuest.phone} />
                {selectedGuest.company && <DetailRow label="Company" value={selectedGuest.company} />}
                {selectedGuest.designation && <DetailRow label="Title" value={selectedGuest.designation} />}
                <DetailRow label="ID Type" value={selectedGuest.idType.replace("_", " ").toUpperCase()} />
                <DetailRow label="ID Number" value={selectedGuest.idNumber} />
                <DetailRow label="Member Since" value={formatDate(selectedGuest.createdAt)} />
              </div>
            </Card>

            {/* Loyalty */}
            <Card className="p-5">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Loyalty Status</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                  {selectedGuest.loyaltyPoints.toLocaleString()}
                </span>
                <span className="text-xs text-[var(--text-muted)]">points</span>
              </div>
              <ProgressBar value={selectedGuest.loyaltyPoints} max={10000} color="bg-brand-500" />
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {Math.max(0, 10000 - selectedGuest.loyaltyPoints).toLocaleString()} pts to Gold
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="text-center p-2 rounded-lg bg-[var(--surface-1)]">
                  <p className="text-lg font-bold text-[var(--text-primary)]">{selectedGuest.totalStays}</p>
                  <p className="text-xs text-[var(--text-muted)]">Total Stays</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[var(--surface-1)]">
                  <p className="text-sm font-bold text-[var(--text-primary)]">{formatNGN(selectedGuest.totalSpend)}</p>
                  <p className="text-xs text-[var(--text-muted)]">Total Spend</p>
                </div>
              </div>
            </Card>

            {/* Preferences */}
            {selectedGuest.preferences && (
              <Card className="p-5">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Preferences</p>
                <p className="text-sm text-[var(--text-secondary)]">{selectedGuest.preferences}</p>
              </Card>
            )}

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">Edit Profile</Button>
              <Button size="sm" className="flex-1">New Booking</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-[var(--text-muted)] shrink-0">{label}</span>
      <span className="text-[var(--text-primary)] text-right truncate">{value}</span>
    </div>
  );
}
