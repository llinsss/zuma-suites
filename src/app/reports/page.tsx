"use client";
import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { Card, Button, SectionHeader, ProgressBar, Badge } from "@/components/ui";
import { formatNGN, cn } from "@/lib/utils";
import { WEEKLY_REVENUE, MONTHLY_OCCUPANCY } from "@/lib/data";

const REPORT_TABS = ["Overview", "Revenue", "Occupancy", "Inventory", "Staff"] as const;
type ReportTab = typeof REPORT_TABS[number];

export default function ReportsPage() {
  const { metrics, inventory } = useApp();
  const [tab, setTab] = useState<ReportTab>("Overview");

  const lowStockItems = inventory.filter(i => i.currentStock <= i.minStock);
  const maxRevenue = Math.max(...WEEKLY_REVENUE.map(d => d.revenue));

  const revenueBySource = [
    { source: "Direct Bookings", amount: 3200000, pct: 38 },
    { source: "Corporate Accounts", amount: 2500000, pct: 30 },
    { source: "Booking.com", amount: 1400000, pct: 17 },
    { source: "Walk-in", amount: 840000, pct: 10 },
    { source: "Airbnb", amount: 420000, pct: 5 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Reports & Analytics"
        subtitle="Performance metrics, revenue analysis, and operational insights"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">📅 Date Range</Button>
            <Button variant="secondary" size="sm">📊 Export Excel</Button>
            <Button size="sm">📄 Export PDF</Button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--surface-1)] rounded-xl w-fit">
        {REPORT_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
              tab === t
                ? "bg-[var(--surface-0)] text-[var(--text-primary)] shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="space-y-6">
          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Occupancy Rate", value: `${metrics.occupancyRate}%`, sub: "vs 72% last month", trend: +4.2, color: "text-brand-600 dark:text-brand-400" },
              { label: "ADR", value: formatNGN(metrics.adr), sub: "Avg daily rate", trend: +8.1, color: "text-blue-600 dark:text-blue-400" },
              { label: "RevPAR", value: formatNGN(metrics.revpar), sub: "Revenue per avail. room", trend: +6.3, color: "text-violet-600 dark:text-violet-400" },
              { label: "TRevPAR", value: formatNGN(metrics.revpar * 1.18), sub: "Total revenue per room", trend: +9.2, color: "text-emerald-600 dark:text-emerald-400" },
            ].map(kpi => (
              <Card key={kpi.label} className="p-5">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{kpi.label}</p>
                <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{kpi.sub}</p>
                <p className={cn("text-xs font-medium mt-1", kpi.trend >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500")}>
                  {kpi.trend >= 0 ? "↑" : "↓"} {Math.abs(kpi.trend)}% vs last month
                </p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by source */}
            <Card className="p-5">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Revenue by Source</h3>
              <div className="space-y-3">
                {revenueBySource.map(r => (
                  <div key={r.source}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--text-secondary)]">{r.source}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--text-muted)]">{r.pct}%</span>
                        <span className="font-semibold text-[var(--text-primary)] w-24 text-right">{formatNGN(r.amount)}</span>
                      </div>
                    </div>
                    <ProgressBar value={r.pct} color="bg-brand-400" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Room type performance */}
            <Card className="p-5">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Room Type Performance</h3>
              <div className="space-y-4">
                {[
                  { type: "Studio (4 rooms)", occ: 75, adr: 45000, rev: 135000 },
                  { type: "1 Bedroom (4 rooms)", occ: 75, adr: 80000, rev: 240000 },
                  { type: "2 Bedroom (4 rooms)", occ: 50, adr: 165000, rev: 330000 },
                ].map(rt => (
                  <div key={rt.type} className="p-3 rounded-xl bg-[var(--surface-1)]">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{rt.type}</span>
                      <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{formatNGN(rt.rev)}/day</span>
                    </div>
                    <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                      <span>Occ: <strong className="text-[var(--text-primary)]">{rt.occ}%</strong></span>
                      <span>ADR: <strong className="text-[var(--text-primary)]">{formatNGN(rt.adr)}</strong></span>
                    </div>
                    <ProgressBar value={rt.occ} className="mt-2" color={rt.occ >= 80 ? "bg-emerald-500" : rt.occ >= 60 ? "bg-brand-500" : "bg-amber-500"} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "Revenue" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-5">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Weekly Revenue Trend</h3>
              <div className="flex items-end gap-2 h-40">
                {WEEKLY_REVENUE.map(d => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-[var(--text-muted)]">{formatNGN(d.revenue / 1000)}k</span>
                    <div
                      className="w-full rounded-t-md bg-brand-400 dark:bg-brand-500 hover:bg-brand-500 transition-colors"
                      style={{ height: `${(d.revenue / maxRevenue) * 100}px` }}
                    />
                    <span className="text-[10px] text-[var(--text-muted)]">{d.day}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Payment Method Breakdown</h3>
              <div className="space-y-3">
                {[
                  { method: "Bank Transfer", amount: 3800000, pct: 45, color: "bg-blue-500" },
                  { method: "POS Terminal", amount: 2100000, pct: 25, color: "bg-emerald-500" },
                  { method: "Paystack", amount: 1260000, pct: 15, color: "bg-violet-500" },
                  { method: "Cash", amount: 840000, pct: 10, color: "bg-amber-500" },
                  { method: "Flutterwave", amount: 420000, pct: 5, color: "bg-orange-500" },
                ].map(p => (
                  <div key={p.method}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--text-secondary)]">{p.method}</span>
                      <span className="font-semibold text-[var(--text-primary)]">{formatNGN(p.amount)}</span>
                    </div>
                    <ProgressBar value={p.pct} color={p.color} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "Occupancy" && (
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">6-Month Occupancy Trend</h3>
            <div className="space-y-3">
              {MONTHLY_OCCUPANCY.map(m => (
                <div key={m.month} className="flex items-center gap-4">
                  <span className="text-sm text-[var(--text-muted)] w-8">{m.month}</span>
                  <div className="flex-1">
                    <ProgressBar
                      value={m.rate}
                      color={m.rate >= 90 ? "bg-emerald-500" : m.rate >= 70 ? "bg-brand-500" : "bg-amber-500"}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)] w-10 text-right">{m.rate}%</span>
                  <span className="text-xs text-[var(--text-muted)] w-24 text-right">
                    {Math.round(12 * m.rate / 100)}/12 rooms
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Inventory" && (
        <div className="space-y-4">
          {lowStockItems.length > 0 && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                ⚠️ {lowStockItems.length} items below minimum stock level
              </p>
            </div>
          )}
          <Card>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {["Item", "SKU", "Category", "Current Stock", "Min Stock", "Status", "Unit Cost"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {inventory.map(item => {
                  const isLow = item.currentStock <= item.minStock;
                  const pct = Math.min(100, (item.currentStock / item.maxStock) * 100);
                  return (
                    <tr key={item.id} className={cn("hover:bg-[var(--surface-1)] transition-colors", isLow && "bg-red-50/50 dark:bg-red-950/10")}>
                      <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{item.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">{item.sku}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{item.category}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-semibold", isLow ? "text-red-600 dark:text-red-400" : "text-[var(--text-primary)]")}>
                            {item.currentStock} {item.unit}s
                          </span>
                          <div className="w-16">
                            <ProgressBar value={pct} color={isLow ? "bg-red-500" : pct > 50 ? "bg-emerald-500" : "bg-amber-500"} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{item.minStock}</td>
                      <td className="px-4 py-3">
                        {isLow
                          ? <Badge color="text-red-700 dark:text-red-400" bg="bg-red-50 dark:bg-red-950/40">Low Stock</Badge>
                          : <Badge color="text-emerald-700 dark:text-emerald-400" bg="bg-emerald-50 dark:bg-emerald-950/40">OK</Badge>
                        }
                      </td>
                      <td className="px-4 py-3 text-[var(--text-primary)]">{formatNGN(item.unitCost)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === "Staff" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Housekeeping Performance</h3>
            <div className="space-y-3">
              {[
                { name: "Grace Okonkwo", role: "HK Supervisor", rooms: 8, avgTime: "42 min", score: 98 },
                { name: "Blessing Adeyemi", role: "Housekeeper", rooms: 6, avgTime: "48 min", score: 94 },
                { name: "Fatima Musa", role: "Housekeeper", rooms: 5, avgTime: "51 min", score: 91 },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-1)]">
                  <div className="h-9 w-9 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-sm font-bold text-teal-700 dark:text-teal-400">
                    {s.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{s.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{s.rooms} rooms · {s.avgTime}/room</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{s.score}%</p>
                    <p className="text-xs text-[var(--text-muted)]">score</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Maintenance Response Time</h3>
            <div className="space-y-3">
              {[
                { category: "Urgent", avgTime: "23 min", target: "30 min", met: true },
                { category: "High", avgTime: "1.8 hrs", target: "2 hrs", met: true },
                { category: "Medium", avgTime: "5.2 hrs", target: "4 hrs", met: false },
                { category: "Low", avgTime: "18 hrs", target: "24 hrs", met: true },
              ].map(m => (
                <div key={m.category} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-1)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{m.category}</p>
                    <p className="text-xs text-[var(--text-muted)]">Target: {m.target}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold", m.met ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
                      {m.avgTime}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{m.met ? "✓ On target" : "⚠ Over target"}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
