"use client";
import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { Card, Badge, Button, StatusDot, SectionHeader } from "@/components/ui";
import { formatNGN, ROOM_STATUS_CONFIG, ROOM_TYPE_CONFIG, cn } from "@/lib/utils";
import type { RoomStatus, RoomType } from "@/types";
import Link from "next/link";

export default function RoomsPage() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState<RoomStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<RoomType | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = state.rooms.filter(r =>
    (filter === "all" || r.status === filter) &&
    (typeFilter === "all" || r.type === typeFilter)
  );

  const counts = state.rooms.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Rooms"
        subtitle="Manage room status, rates, and availability"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setView(v => v === "grid" ? "list" : "grid")}>
              {view === "grid" ? <ListIcon /> : <GridIcon />}
              {view === "grid" ? "List" : "Grid"}
            </Button>
            <Button size="sm">+ Add Room</Button>
          </div>
        }
      />

      {/* Status summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {Object.entries(ROOM_STATUS_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setFilter(filter === key as RoomStatus ? "all" : key as RoomStatus)}
            className={cn(
              "p-3 rounded-xl border text-left transition-all",
              filter === key
                ? `${cfg.bg} border-current/20`
                : "bg-[var(--surface-0)] border-[var(--border)] hover:bg-[var(--surface-1)]"
            )}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <StatusDot color={cfg.dot} />
              <span className="text-lg font-bold text-[var(--text-primary)]">{counts[key] || 0}</span>
            </div>
            <p className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</p>
          </button>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "studio", "one_bedroom", "two_bedroom"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
              typeFilter === t
                ? "bg-brand-500 text-white border-brand-500"
                : "bg-[var(--surface-0)] border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-1)]"
            )}
          >
            {t === "all" ? "All Types" : ROOM_TYPE_CONFIG[t].label}
          </button>
        ))}
        <span className="ml-auto text-sm text-[var(--text-muted)] self-center">{filtered.length} rooms</span>
      </div>

      {/* Room grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(room => {
            const cfg = ROOM_STATUS_CONFIG[room.status];
            const res = state.reservations.find(r => r.id === room.currentReservationId);
            return (
              <Card key={room.id} hover className="overflow-hidden">
                {/* Color header */}
                <div className={`h-2 ${cfg.dot}`} />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[var(--text-primary)]">{room.number}</span>
                        <Badge color={cfg.color} bg={cfg.bg}>
                          <StatusDot color={cfg.dot} pulse={room.status === "occupied"} />
                          {cfg.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5">{room.name}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-[var(--surface-1)] text-[var(--text-muted)]">
                      {ROOM_TYPE_CONFIG[room.type].shortLabel}
                    </span>
                  </div>

                  {/* Rate */}
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {formatNGN(room.baseRate)}<span className="text-xs font-normal text-[var(--text-muted)]">/night</span>
                  </p>

                  {/* Current guest */}
                  {res && (
                    <div className="mt-3 p-2.5 rounded-lg bg-[var(--surface-1)]">
                      <p className="text-xs font-medium text-[var(--text-primary)]">
                        {res.guest?.firstName} {res.guest?.lastName}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        CO: {res.checkOut} · {res.nights}N
                      </p>
                    </div>
                  )}

                  {/* Amenities */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map(a => (
                      <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-1)] text-[var(--text-muted)]">{a}</span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-1)] text-[var(--text-muted)]">+{room.amenities.length - 3}</span>
                    )}
                  </div>

                  {/* Quick status change */}
                  <div className="mt-3 pt-3 border-t border-[var(--border)] flex gap-2">
                    <Link href={`/rooms/${room.id}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">Details</Button>
                    </Link>
                    {room.status === "dirty" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => dispatch({ type: "UPDATE_ROOM_STATUS", payload: { roomId: room.id, status: "clean" } })}
                      >
                        Mark Clean
                      </Button>
                    )}
                    {room.status === "clean" && (
                      <Button
                        size="sm"
                        onClick={() => dispatch({ type: "UPDATE_ROOM_STATUS", payload: { roomId: room.id, status: "inspected" } })}
                      >
                        Inspect
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-table">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Room", "Name", "Type", "Status", "Rate/Night", "Guest", "Floor", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(room => {
                const cfg = ROOM_STATUS_CONFIG[room.status];
                const res = state.reservations.find(r => r.id === room.currentReservationId);
                return (
                  <tr key={room.id} className="hover:bg-[var(--surface-1)] transition-colors">
                    <td className="px-4 py-3 font-bold text-[var(--text-primary)]">{room.number}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{room.name}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{ROOM_TYPE_CONFIG[room.type].label}</td>
                    <td className="px-4 py-3">
                      <Badge color={cfg.color} bg={cfg.bg}>
                        <StatusDot color={cfg.dot} />
                        {cfg.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{formatNGN(room.baseRate)}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">
                      {res ? `${res.guest?.firstName} ${res.guest?.lastName}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Floor {room.floor}</td>
                    <td className="px-4 py-3">
                      <Link href={`/rooms/${room.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function GridIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function ListIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
}
