"use client";
import { useApp } from "@/store/AppContext";
import { StatCard, Card, Badge, StatusDot, Avatar, ProgressBar, SectionHeader } from "@/components/ui";
import { formatNGN, ROOM_STATUS_CONFIG, RESERVATION_STATUS_CONFIG, PRIORITY_CONFIG, timeAgo } from "@/lib/utils";
import { WEEKLY_REVENUE, MONTHLY_OCCUPANCY } from "@/lib/data";
import Link from "next/link";

export default function DashboardPage() {
  const { state, metrics } = useApp();
  const { rooms, reservations, housekeepingTasks, maintenanceTickets } = state;

  const todayArrivals = reservations.filter(r => r.status === "confirmed");
  const pendingTasks = housekeepingTasks.filter(t => t.status === "pending" || t.status === "in_progress");
  const openTickets = maintenanceTickets.filter(t => t.status !== "resolved" && t.status !== "closed");

  const statusCounts = rooms.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxRevenue = Math.max(...WEEKLY_REVENUE.map(d => d.revenue));

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Dashboard"
        subtitle={`Good ${getGreeting()}, ${state.currentUser?.name.split(" ")[0]} 👋`}
        action={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <StatusDot color="bg-emerald-500" pulse /> Live
            </span>
          </div>
        }
      />

      <section className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 text-stone-100 shadow-sm dark:border-stone-700" aria-label="Operations briefing">
        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          <div className="p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-400">Shift briefing</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">The property is running smoothly.</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-stone-400">
              Focus on {todayArrivals.length} upcoming {todayArrivals.length === 1 ? "arrival" : "arrivals"}, {pendingTasks.length} open housekeeping {pendingTasks.length === 1 ? "task" : "tasks"}, and {openTickets.length} maintenance {openTickets.length === 1 ? "item" : "items"}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/reservations" className="rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-400">Review arrivals</Link>
              <Link href="/housekeeping" className="rounded-lg border border-stone-700 px-3.5 py-2 text-xs font-semibold text-stone-200 hover:bg-stone-800">Open task board</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-stone-800 lg:border-l lg:border-t-0">
            {[
              ["Arrivals", todayArrivals.length, "Expected"],
              ["Rooms ready", statusCounts.available || 0, "Available"],
              ["Attention", pendingTasks.length + openTickets.length, "Open items"],
            ].map(([label, value, note]) => (
              <div key={label} className="flex flex-col justify-center border-r border-stone-800 p-4 last:border-r-0 lg:p-5">
                <span className="text-2xl font-semibold tabular-nums text-white">{value}</span>
                <span className="mt-1 text-xs font-medium text-stone-300">{label}</span>
                <span className="mt-0.5 text-[10px] text-stone-500">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Occupancy Rate"
          value={`${metrics.occupancyRate}%`}
          sub={`${metrics.occupiedRooms} of ${metrics.totalRooms} rooms`}
          trend={4.2}
          icon={<OccupancyIcon />}
          accent="text-brand-600 dark:text-brand-400"
        />
        <StatCard
          label="ADR"
          value={formatNGN(metrics.adr)}
          sub="Avg daily rate"
          trend={8.1}
          icon={<TrendIcon />}
        />
        <StatCard
          label="RevPAR"
          value={formatNGN(metrics.revpar)}
          sub="Revenue per avail. room"
          trend={6.3}
          icon={<RevenueIcon />}
        />
        <StatCard
          label="Today's Revenue"
          value={formatNGN(metrics.todayRevenue)}
          sub={`Month: ${formatNGN(metrics.monthRevenue)}`}
          trend={12.5}
          icon={<CashIcon />}
          accent="text-emerald-600 dark:text-emerald-400"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Guests In-House", value: metrics.guestsInHouse, icon: "👥", color: "text-blue-600 dark:text-blue-400" },
          { label: "Arrivals Today", value: metrics.checkInsToday, icon: "🛬", color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Departures Today", value: metrics.checkOutsToday, icon: "🛫", color: "text-orange-600 dark:text-orange-400" },
          { label: "Pending HK Tasks", value: metrics.pendingHousekeeping, icon: "🧹", color: "text-violet-600 dark:text-violet-400" },
        ].map(s => (
          <Card key={s.label} className="p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Status Board */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[var(--text-primary)]">Room Status Board</h2>
              <Link href="/rooms" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">View all →</Link>
            </div>

            {/* Status legend */}
            <div className="flex flex-wrap gap-3 mb-4">
              {Object.entries(ROOM_STATUS_CONFIG).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <StatusDot color={cfg.dot} />
                  <span className="text-xs text-[var(--text-muted)]">{cfg.label} ({statusCounts[key] || 0})</span>
                </div>
              ))}
            </div>

            {/* Room grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {rooms.map(room => {
                const cfg = ROOM_STATUS_CONFIG[room.status];
                const res = reservations.find(r => r.id === room.currentReservationId);
                return (
                  <Link key={room.id} href={`/rooms/${room.id}`}>
                    <div className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${cfg.bg} border-current/10`}>
                      <div className="flex items-start justify-between mb-1">
                        <span className="font-bold text-sm text-[var(--text-primary)]">{room.number}</span>
                        <StatusDot color={cfg.dot} pulse={room.status === "occupied"} />
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] truncate">{room.name.split(" ").slice(-1)[0]}</p>
                      <p className={`text-[10px] font-medium mt-1 ${cfg.color}`}>{cfg.label}</p>
                      {res && (
                        <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                          {res.guest?.firstName} {res.guest?.lastName[0]}.
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* Revenue Chart */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[var(--text-primary)]">Weekly Revenue</h2>
              <span className="text-xs text-[var(--text-muted)]">This week</span>
            </div>
            <div className="flex items-end gap-2 h-32">
              {WEEKLY_REVENUE.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[var(--text-muted)]">{formatNGN(d.revenue / 1000)}k</span>
                  <div
                    className="w-full rounded-t-md bg-brand-400 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-400 transition-colors cursor-pointer"
                    style={{ height: `${(d.revenue / maxRevenue) * 80}px` }}
                    title={`${d.day}: ${formatNGN(d.revenue)}`}
                  />
                  <span className="text-[10px] text-[var(--text-muted)]">{d.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Today's arrivals */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[var(--text-primary)]">Upcoming Arrivals</h2>
              <Badge color="text-blue-700 dark:text-blue-400" bg="bg-blue-50 dark:bg-blue-950/40">{todayArrivals.length}</Badge>
            </div>
            {todayArrivals.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] text-center py-4">No arrivals today</p>
            ) : (
              <ul className="space-y-3">
                {todayArrivals.map(res => (
                  <li key={res.id} className="flex items-center gap-3">
                    <Avatar name={`${res.guest?.firstName} ${res.guest?.lastName}`} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {res.guest?.firstName} {res.guest?.lastName}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">Room {res.room?.number} · {res.nights}N</p>
                    </div>
                    <Badge {...RESERVATION_STATUS_CONFIG[res.status]}>{RESERVATION_STATUS_CONFIG[res.status].label}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Housekeeping */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[var(--text-primary)]">Housekeeping</h2>
              <Link href="/housekeeping" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">View all →</Link>
            </div>
            <ul className="space-y-2">
              {pendingTasks.slice(0, 4).map(task => (
                <li key={task.id} className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${task.status === "in_progress" ? "bg-blue-500" : "bg-amber-500"}`} />
                  <span className="text-sm text-[var(--text-primary)] flex-1 truncate">Room {task.room?.number}</span>
                  <span className={`text-xs font-medium ${PRIORITY_CONFIG[task.priority].color}`}>
                    {PRIORITY_CONFIG[task.priority].label}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Maintenance alerts */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[var(--text-primary)]">Maintenance</h2>
              <Badge color="text-red-700 dark:text-red-400" bg="bg-red-50 dark:bg-red-950/40">{openTickets.length} open</Badge>
            </div>
            <ul className="space-y-2">
              {openTickets.map(ticket => (
                <li key={ticket.id} className="flex items-start gap-2">
                  <span className={`mt-0.5 text-xs font-medium ${PRIORITY_CONFIG[ticket.priority].color}`}>●</span>
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--text-primary)] truncate">{ticket.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{ticket.room?.number} · {timeAgo(ticket.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Occupancy trend */}
          <Card className="p-5">
            <h2 className="font-semibold text-[var(--text-primary)] mb-3">6-Month Occupancy</h2>
            <div className="space-y-2">
              {MONTHLY_OCCUPANCY.map(m => (
                <div key={m.month} className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-muted)] w-8">{m.month}</span>
                  <div className="flex-1">
                    <ProgressBar
                      value={m.rate}
                      color={m.rate >= 90 ? "bg-emerald-500" : m.rate >= 70 ? "bg-brand-500" : "bg-amber-500"}
                    />
                  </div>
                  <span className="text-xs font-medium text-[var(--text-primary)] w-8 text-right">{m.rate}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

function OccupancyIcon() {
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function TrendIcon() {
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
}
function RevenueIcon() {
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
}
function CashIcon() {
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
}
