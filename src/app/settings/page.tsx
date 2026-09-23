"use client";
import { useState } from "react";
import { Card, Button, SectionHeader, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const SETTING_TABS = ["Property", "Rates & Taxes", "Integrations", "Notifications", "Security"] as const;
type SettingTab = typeof SETTING_TABS[number];

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingTab>("Property");

  return (
    <div className="p-6 space-y-6 max-w-[900px]">
      <SectionHeader title="Settings" subtitle="Configure your property, integrations, and system preferences" />

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--surface-1)] rounded-xl w-fit flex-wrap">
        {SETTING_TABS.map(t => (
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

      {tab === "Property" && (
        <div className="space-y-4">
          <Card className="p-6 space-y-5">
            <h3 className="font-semibold text-[var(--text-primary)]">Property Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <SettingField label="Property Name" defaultValue="Houzzhills Apartments" />
              <SettingField label="Property Code" defaultValue="HH-KAD" />
              <SettingField label="Address" defaultValue="Houzzhills Apartments, Kaduna" />
              <SettingField label="City" defaultValue="Kaduna" />
              <SettingField label="Country" defaultValue="Nigeria" />
              <SettingField label="Phone" defaultValue="+234 901 234 5678" />
              <SettingField label="Email" defaultValue="info@houzzhills.com" />
              <SettingField label="Website" defaultValue="https://houzzhills.com" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <SettingField label="Total Rooms" defaultValue="12" type="number" />
              <SettingField label="Check-In Time" defaultValue="14:00" type="time" />
              <SettingField label="Check-Out Time" defaultValue="12:00" type="time" />
            </div>
            <Button>Save Property Info</Button>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-[var(--text-primary)]">Branding</h3>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-2xl">H</div>
              <div>
                <Button variant="secondary" size="sm">Upload Logo</Button>
                <p className="text-xs text-[var(--text-muted)] mt-1">PNG or SVG, max 2MB</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" defaultValue="#c8861a" className="h-9 w-16 rounded-lg border border-[var(--border)] cursor-pointer" />
                  <span className="text-sm text-[var(--text-muted)]">#c8861a (Brand Gold)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "Rates & Taxes" && (
        <div className="space-y-4">
          <Card className="p-6 space-y-5">
            <h3 className="font-semibold text-[var(--text-primary)]">Tax Configuration</h3>
            <div className="space-y-3">
              {[
                { label: "VAT Rate", value: "7.5", note: "Federal Inland Revenue Service (FIRS) standard rate" },
                { label: "Service Charge", value: "10", note: "Applied to room and F&B charges" },
                { label: "Tourism Levy", value: "0", note: "FCT Tourism levy (if applicable)" },
              ].map(tax => (
                <div key={tax.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-1)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{tax.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{tax.note}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={tax.value}
                      className="w-16 px-2 py-1 text-sm text-right rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                    <span className="text-sm text-[var(--text-muted)]">%</span>
                  </div>
                </div>
              ))}
            </div>
            <Button>Save Tax Settings</Button>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-[var(--text-primary)]">Pricing Rules</h3>
            <div className="space-y-3">
              {[
                { label: "Weekend Surcharge", value: "20", note: "Fri–Sun premium" },
                { label: "Early Check-In Fee", value: "5000", note: "Per hour before 12pm (NGN)" },
                { label: "Late Check-Out Fee", value: "5000", note: "Per hour after 2pm (NGN)" },
                { label: "Extra Bed Rate", value: "8000", note: "Per night (NGN)" },
              ].map(rule => (
                <div key={rule.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-1)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{rule.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{rule.note}</p>
                  </div>
                  <input
                    type="number"
                    defaultValue={rule.value}
                    className="w-24 px-2 py-1 text-sm text-right rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Integrations" && (
        <div className="space-y-4">
          {[
            {
              category: "Payment Gateways",
              items: [
                { name: "Paystack", desc: "Card payments, bank transfers, USSD", status: "connected", icon: "🔵" },
                { name: "Flutterwave", desc: "Multi-currency, mobile money", status: "connected", icon: "🟠" },
                { name: "OPay", desc: "Mobile wallet payments", status: "disconnected", icon: "🟢" },
                { name: "PalmPay", desc: "Mobile wallet payments", status: "disconnected", icon: "🔴" },
              ],
            },
            {
              category: "Messaging",
              items: [
                { name: "WhatsApp Business API", desc: "Automated guest messaging", status: "connected", icon: "💬" },
                { name: "Termii SMS", desc: "Nigerian SMS gateway", status: "connected", icon: "📱" },
                { name: "Resend Email", desc: "Transactional emails", status: "connected", icon: "📧" },
              ],
            },
            {
              category: "Channel Manager",
              items: [
                { name: "Booking.com", desc: "OTA channel sync", status: "disconnected", icon: "🌐" },
                { name: "Airbnb", desc: "Short-stay platform", status: "disconnected", icon: "🏠" },
              ],
            },
            {
              category: "Accounting",
              items: [
                { name: "QuickBooks", desc: "Financial sync & reporting", status: "disconnected", icon: "📊" },
                { name: "Xero", desc: "Cloud accounting", status: "disconnected", icon: "📈" },
              ],
            },
          ].map(section => (
            <Card key={section.category} className="p-5">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">{section.category}</h3>
              <div className="space-y-2">
                {section.items.map(item => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-1)]">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{item.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.status === "connected"
                        ? <Badge color="text-emerald-700 dark:text-emerald-400" bg="bg-emerald-50 dark:bg-emerald-950/40">Connected</Badge>
                        : <Badge color="text-stone-600 dark:text-stone-400" bg="bg-stone-100 dark:bg-stone-800/40">Disconnected</Badge>
                      }
                      <Button variant="ghost" size="sm">{item.status === "connected" ? "Configure" : "Connect"}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "Notifications" && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { label: "New Reservation", channels: ["email", "whatsapp", "sms"] },
              { label: "Check-In Reminder (24h before)", channels: ["whatsapp", "sms"] },
              { label: "Check-Out Reminder (day of)", channels: ["whatsapp"] },
              { label: "Low Inventory Alert", channels: ["email", "sms"] },
              { label: "Maintenance Ticket Created", channels: ["email"] },
              { label: "Payment Received", channels: ["email", "whatsapp"] },
              { label: "Night Audit Complete", channels: ["email"] },
            ].map(notif => (
              <div key={notif.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-1)]">
                <p className="text-sm font-medium text-[var(--text-primary)]">{notif.label}</p>
                <div className="flex gap-2">
                  {["email", "whatsapp", "sms", "push"].map(ch => (
                    <label key={ch} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={notif.channels.includes(ch)}
                        className="rounded accent-brand-500"
                      />
                      <span className="text-xs text-[var(--text-muted)] capitalize">{ch}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button>Save Preferences</Button>
        </Card>
      )}

      {tab === "Security" && (
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-[var(--text-primary)]">Security Settings</h3>
            {[
              { label: "Two-Factor Authentication", desc: "Require 2FA for all staff logins", enabled: true },
              { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
              { label: "Audit Logging", desc: "Log all data access and modifications", enabled: true },
              { label: "IP Allowlist", desc: "Restrict access to specific IP addresses", enabled: false },
              { label: "NDPR Compliance Mode", desc: "Enable data protection controls per Nigerian law", enabled: true },
            ].map(setting => (
              <div key={setting.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-1)]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{setting.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{setting.desc}</p>
                </div>
                <button
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    setting.enabled ? "bg-brand-500" : "bg-[var(--surface-3)]"
                  )}
                >
                  <span className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                    setting.enabled ? "translate-x-6" : "translate-x-1"
                  )} />
                </button>
              </div>
            ))}
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-semibold text-[var(--text-primary)]">Data & Backups</h3>
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Last backup: Today at 03:00 AM</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">Automated daily backups to Cloudflare R2</p>
              </div>
              <Button variant="secondary" size="sm">Backup Now</Button>
            </div>
            <Button variant="danger" size="sm">Export All Data (NDPR)</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

function SettingField({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      />
    </div>
  );
}
