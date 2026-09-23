"use client";
import { use } from "react";
import { useApp } from "@/store/AppContext";
import { Card, Badge, Button, StatusDot } from "@/components/ui";
import { formatNGN, formatDate, ROOM_STATUS_CONFIG, ROOM_TYPE_CONFIG, RESERVATION_STATUS_CONFIG } from "@/lib/utils";
import type { RoomStatus } from "@/types";
import Link from "next/link";

const STATUS_TRANSITIONS: Record<RoomStatus, RoomStatus[]> = {
  available:    ["out_of_order", "maintenance"],
  occupied:     ["maintenance"],
  dirty:        ["clean", "maintenance", "out_of_order"],
  clean:        ["inspected", "available", "dirty"],
  inspected:    ["available", "dirty"],
  maintenance:  ["available", "out_of_order"],
  out_of_order: ["maintenance", "available"],
};

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state, dispatch } = useApp();

  const room = state.rooms.find(r => r.id === id);
  if (!room) return (
    <div className="p-6">
      <p className="text-[var(--text-muted)]">Room not found.</p>
      <Link href="/rooms" className="text-brand-600 dark:text-brand-400 hover:underline text-sm mt-2 block">← Back to Rooms</Link>
    </div>
  );

  const cfg = ROOM_STATUS_CONFIG[room.status];
  const currentRes = state.reservations.find(r => r.id === room.currentReservationId);
  const history = state.reservations.filter(r => r.roomId === room.id && r.status !== "checked_in");
  const transitions = STATUS_TRANSITIONS[room.status] || [];

  return (
    <div className="p-6 space-y-6 max-w-[1000px]">
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link href="/rooms" className="hover:text-[var(--text-primary)]">Rooms</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">Room {room.number}</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{room.number}</h1>
            <Badge color={cfg.color} bg={cfg.bg}>
              <StatusDot color={cfg.dot} pulse={room.status === "occupied"} />
              {cfg.label}
            </Badge>
            <span className="text-sm text-[var(--text-muted)]">{ROOM_TYPE_CONFIG[room.type].label} · Floor {room.floor}</span>
          </div>
          <p className="text-[var(--text-muted)] mt-1">{room.name}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {transitions.map(status => (
            <Button
              key={status}
              variant={status === "available" || status === "inspected" ? "primary" : "secondary"}
              size="sm"
              onClick={() => dispatch({ type: "UPDATE_ROOM_STATUS", payload: { roomId: room.id, status } })}
            >
              → {ROOM_STATUS_CONFIG[status].label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Current guest */}
          {currentRes && (
            <Card className="p-5 border-l-4 border-blue-500">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Current Guest</p>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-lg">
                    {currentRes.guest?.firstName} {currentRes.guest?.lastName}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">{currentRes.guest?.company}</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {formatDate(currentRes.checkIn)} → {formatDate(currentRes.checkOut)} · {currentRes.nights} nights
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--text-primary)]">{formatNGN(currentRes.grandTotal)}</p>
                  {currentRes.balance > 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400">Due: {formatNGN(currentRes.balance)}</p>
                  )}
                  <Link href={`/reservations/${currentRes.id}`}>
                    <Button variant="secondary" size="sm" className="mt-2">View Folio</Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* Rates */}
          <Card className="p-5">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Rates</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Nightly", value: room.baseRate },
                { label: "Weekend", value: room.weekendRate },
                { label: "Weekly", value: room.weeklyRate },
                { label: "Monthly", value: room.monthlyRate },
              ].map(r => (
                <div key={r.label} className="p-3 rounded-xl bg-[var(--surface-1)] text-center">
                  <p className="text-sm font-bold text-[var(--text-primary)]">{formatNGN(r.value)}</p>
                  <p className="text-xs text-[var(--text-muted)]">{r.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Amenities */}
          <Card className="p-5">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map(a => (
                <span key={a} className="px-3 py-1.5 rounded-lg bg-[var(--surface-1)] text-sm text-[var(--text-secondary)] border border-[var(--border)]">
                  {a}
                </span>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card className="p-5">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Description</p>
            <p className="text-sm text-[var(--text-secondary)]">{room.description}</p>
            {room.notes && (
              <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">⚠️ Note</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-0.5">{room.notes}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Quick Info</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Max Occupancy</span>
                <span className="font-medium text-[var(--text-primary)]">{room.maxOccupancy} guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Floor</span>
                <span className="font-medium text-[var(--text-primary)]">{room.floor}</span>
              </div>
              {room.lastCleaned && (
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Last Cleaned</span>
                  <span className="font-medium text-[var(--text-primary)]">{formatDate(room.lastCleaned)}</span>
                </div>
              )}
              {room.lastInspected && (
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Last Inspected</span>
                  <span className="font-medium text-[var(--text-primary)]">{formatDate(room.lastInspected)}</span>
                </div>
              )}
            </div>
          </Card>

          <div className="flex flex-col gap-2">
            <Button className="w-full">+ New Reservation</Button>
            <Button variant="secondary" className="w-full">🧹 Create HK Task</Button>
            <Button variant="secondary" className="w-full">🔧 Log Maintenance</Button>
          </div>

          {/* Reservation history */}
          {history.length > 0 && (
            <Card className="p-5">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Recent History</p>
              <div className="space-y-2">
                {history.slice(0, 3).map(res => {
                  const resCfg = RESERVATION_STATUS_CONFIG[res.status];
                  return (
                    <div key={res.id} className="text-xs">
                      <div className="flex justify-between">
                        <span className="font-medium text-[var(--text-primary)]">{res.guest?.firstName} {res.guest?.lastName}</span>
                        <Badge color={resCfg.color} bg={resCfg.bg}>{resCfg.label}</Badge>
                      </div>
                      <p className="text-[var(--text-muted)]">{formatDate(res.checkIn)} · {res.nights}N</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
