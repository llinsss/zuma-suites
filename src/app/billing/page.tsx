"use client";
import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { Card, Badge, Button, Avatar, SectionHeader, Divider } from "@/components/ui";
import { formatNGN, formatDate, PAYMENT_STATUS_CONFIG, cn } from "@/lib/utils";
import { FOLIO_ITEMS } from "@/lib/data";
import type { Reservation } from "@/types";

export default function BillingPage() {
  const { state } = useApp();
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(state.reservations[0]);
  const [showPayment, setShowPayment] = useState(false);

  const activeReservations = state.reservations.filter(r =>
    r.status === "checked_in" || r.status === "confirmed"
  );

  const folioItems = FOLIO_ITEMS.filter(f => f.reservationId === selectedRes?.id && !f.isVoided);

  const CATEGORY_ICONS: Record<string, string> = {
    room: "🏠", minibar: "🍺", laundry: "👕", restaurant: "🍽️",
    extra: "➕", fee: "📋", discount: "🏷️", tax: "🧾",
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Billing & Payments"
        subtitle="Folio management, invoices, and payment processing"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Night Audit</Button>
            <Button size="sm">+ Post Charge</Button>
          </div>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Outstanding Balance", value: formatNGN(state.reservations.reduce((s, r) => s + r.balance, 0)), color: "text-red-600 dark:text-red-400" },
          { label: "Collected Today", value: formatNGN(675000), color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Pending Invoices", value: state.reservations.filter(r => r.paymentStatus === "partial" || r.paymentStatus === "pending").length.toString(), color: "text-amber-600 dark:text-amber-400" },
          { label: "Month Revenue", value: formatNGN(8420000), color: "text-brand-600 dark:text-brand-400" },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-[var(--text-muted)] mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservation list */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-1">Active Folios</p>
          {activeReservations.map(res => {
            const payCfg = PAYMENT_STATUS_CONFIG[res.paymentStatus];
            return (
              <Card
                key={res.id}
                hover
                onClick={() => setSelectedRes(res)}
                className={cn("p-4", selectedRes?.id === res.id && "ring-2 ring-brand-500/50")}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar name={`${res.guest?.firstName} ${res.guest?.lastName}`} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {res.guest?.firstName} {res.guest?.lastName}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">Room {res.room?.number} · {res.nights}N</p>
                    </div>
                  </div>
                  <Badge color={payCfg.color} bg={payCfg.bg}>{payCfg.label}</Badge>
                </div>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Total: {formatNGN(res.grandTotal)}</span>
                  {res.balance > 0 && (
                    <span className="text-red-600 dark:text-red-400 font-semibold">Due: {formatNGN(res.balance)}</span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Folio detail */}
        {selectedRes && (
          <div className="lg:col-span-2 space-y-4">
            {/* Folio header */}
            <Card className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-xs text-brand-600 dark:text-brand-400 font-semibold">{selectedRes.confirmationNumber}</p>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-0.5">
                    {selectedRes.guest?.firstName} {selectedRes.guest?.lastName}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Room {selectedRes.room?.number} · {formatDate(selectedRes.checkIn)} → {formatDate(selectedRes.checkOut)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">🖨️ Print</Button>
                  <Button variant="secondary" size="sm">📧 Email</Button>
                  {selectedRes.balance > 0 && (
                    <Button size="sm" onClick={() => setShowPayment(true)}>
                      💳 Collect Payment
                    </Button>
                  )}
                </div>
              </div>

              {/* Folio items */}
              <div className="space-y-1">
                <div className="grid grid-cols-[auto_1fr_auto_auto] gap-3 px-2 py-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  <span>Date</span><span>Description</span><span className="text-right">Qty</span><span className="text-right">Amount</span>
                </div>
                <Divider />
                {folioItems.map(item => (
                  <div key={item.id} className={cn(
                    "grid grid-cols-[auto_1fr_auto_auto] gap-3 px-2 py-2 rounded-lg text-sm hover:bg-[var(--surface-1)] transition-colors",
                    item.amount < 0 && "text-emerald-600 dark:text-emerald-400"
                  )}>
                    <span className="text-[var(--text-muted)] whitespace-nowrap text-xs">{formatDate(item.date)}</span>
                    <span className="text-[var(--text-primary)] flex items-center gap-1.5">
                      <span>{CATEGORY_ICONS[item.category]}</span>
                      {item.description}
                    </span>
                    <span className="text-right text-[var(--text-muted)]">{item.quantity}</span>
                    <span className={cn("text-right font-medium", item.amount < 0 ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--text-primary)]")}>
                      {item.amount < 0 ? "-" : ""}{formatNGN(Math.abs(item.amount))}
                    </span>
                  </div>
                ))}
                <Divider className="my-2" />

                {/* Totals */}
                <div className="space-y-1 px-2">
                  {[
                    { label: "Room Charges", value: selectedRes.totalRoomCharge },
                    { label: "Extras & Services", value: selectedRes.extrasTotal },
                    { label: "Discount", value: -selectedRes.discountAmount },
                    { label: "VAT (7.5%)", value: selectedRes.vatAmount },
                    { label: "Service Charge (10%)", value: selectedRes.serviceCharge },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-[var(--text-muted)]">{row.label}</span>
                      <span className={cn("font-medium", row.value < 0 ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--text-primary)]")}>
                        {row.value < 0 ? "-" : ""}{formatNGN(Math.abs(row.value))}
                      </span>
                    </div>
                  ))}
                  <Divider className="my-2" />
                  <div className="flex justify-between text-base font-bold">
                    <span className="text-[var(--text-primary)]">Grand Total</span>
                    <span className="text-[var(--text-primary)]">{formatNGN(selectedRes.grandTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Amount Paid</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{formatNGN(selectedRes.amountPaid)}</span>
                  </div>
                  {selectedRes.balance > 0 && (
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-red-600 dark:text-red-400">Balance Due</span>
                      <span className="text-red-600 dark:text-red-400">{formatNGN(selectedRes.balance)}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Payment methods accepted */}
            <Card className="p-4">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Accepted Payment Methods</p>
              <div className="flex flex-wrap gap-2">
                {["Cash", "POS Terminal", "Bank Transfer", "Paystack", "Flutterwave", "OPay", "PalmPay"].map(m => (
                  <span key={m} className="px-3 py-1.5 rounded-lg bg-[var(--surface-1)] text-xs font-medium text-[var(--text-secondary)] border border-[var(--border)]">
                    {m}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Payment modal */}
      {showPayment && selectedRes && (
        <PaymentModal
          reservation={selectedRes}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}

function PaymentModal({ reservation, onClose }: { reservation: Reservation; onClose: () => void }) {
  const [method, setMethod] = useState("bank_transfer");
  const [amount, setAmount] = useState(reservation.balance.toString());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-md">
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-semibold text-[var(--text-primary)]">Collect Payment</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--surface-1)] text-[var(--text-muted)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="p-3 rounded-xl bg-[var(--surface-1)]">
            <p className="text-sm text-[var(--text-muted)]">Balance Due</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatNGN(reservation.balance)}</p>
            <p className="text-xs text-[var(--text-muted)]">{reservation.guest?.firstName} {reservation.guest?.lastName} · {reservation.confirmationNumber}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "cash", label: "Cash", icon: "💵" },
                { value: "pos", label: "POS", icon: "💳" },
                { value: "bank_transfer", label: "Transfer", icon: "🏦" },
                { value: "paystack", label: "Paystack", icon: "🔵" },
                { value: "flutterwave", label: "Flutterwave", icon: "🟠" },
                { value: "opay", label: "OPay", icon: "🟢" },
              ].map(m => (
                <button
                  key={m.value}
                  onClick={() => setMethod(m.value)}
                  className={cn(
                    "p-2.5 rounded-lg border text-center transition-all",
                    method === m.value
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                      : "border-[var(--border)] hover:bg-[var(--surface-1)]"
                  )}
                >
                  <div className="text-lg">{m.icon}</div>
                  <div className="text-xs font-medium text-[var(--text-primary)] mt-0.5">{m.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Amount (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Reference / Note</label>
            <input
              type="text"
              placeholder="Transaction ref, receipt number..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>
        </div>
        <div className="p-5 border-t border-[var(--border)] flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1">Confirm Payment</Button>
        </div>
      </Card>
    </div>
  );
}
