"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/store/AppContext";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import { useEffect, useState, type ReactNode } from "react";
import { CommandPalette } from "./CommandPalette";

const NAV = [
  {
    group: "Operations",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: GridIcon },
      { href: "/rooms", label: "Rooms", icon: DoorIcon },
      { href: "/reservations", label: "Reservations", icon: CalendarIcon },
      { href: "/guests", label: "Guests", icon: UsersIcon },
    ],
  },
  {
    group: "Services",
    items: [
      { href: "/housekeeping", label: "Housekeeping", icon: BrushIcon },
      { href: "/billing", label: "Billing & Payments", icon: ReceiptIcon },
      { href: "/staff", label: "Staff", icon: BadgeIcon },
    ],
  },
  {
    group: "Insights",
    items: [
      { href: "/reports", label: "Reports", icon: ChartIcon },
      { href: "/settings", label: "Settings", icon: GearIcon },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { state, dispatch } = useApp();
  const pathname = usePathname();
  const { sidebarOpen, theme, currentUser } = state;

  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(value => !value);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null });
    router.push("/login");
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    dispatch({ type: "SET_THEME", payload: next });
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      {/* Sidebar */}
      {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/45 backdrop-blur-[1px] md:hidden" onClick={() => setMobileOpen(false)} />}
      <aside aria-label="Main navigation" className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--surface-0)] shadow-xl transition-all duration-300 overflow-hidden md:static md:z-auto md:shadow-none md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        sidebarOpen ? "md:w-60" : "md:w-16"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--border)] shrink-0">
          <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          {(sidebarOpen || mobileOpen) && (
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[var(--text-primary)] truncate">Houzzhills HMS</p>
              <p className="text-xs text-[var(--text-muted)] truncate">Kaduna</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {NAV.map(group => (
            <div key={group.group}>
              {(sidebarOpen || mobileOpen) && (
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  {group.group}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map(item => {
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all",
                          active
                            ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300"
                            : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]"
                        )}
                      >
                        <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-brand-600 dark:text-brand-400" : "")} />
                        {(sidebarOpen || mobileOpen) && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User */}
        {currentUser && (
          <div className={cn(
            "border-t border-[var(--border)] p-3 flex items-center gap-3",
            !sidebarOpen && !mobileOpen && "md:justify-center"
          )}>
            <Avatar name={currentUser.name} size="sm" />
            {(sidebarOpen || mobileOpen) && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[var(--text-primary)] truncate">{currentUser.name}</p>
                <p className="text-[10px] text-[var(--text-muted)] capitalize truncate">{currentUser.role.replace("_", " ")}</p>
              </div>
            )}
            {(sidebarOpen || mobileOpen) && (
              <button
                onClick={handleLogout}
                title="Log out"
                className="shrink-0 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-[var(--text-muted)] hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOutIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 shrink-0 border-b border-[var(--border)] bg-[var(--surface-0)]/95 backdrop-blur flex items-center px-4 gap-3">
          <button
            onClick={() => window.innerWidth < 768 ? setMobileOpen(true) : dispatch({ type: "TOGGLE_SIDEBAR" })}
            aria-label="Toggle navigation"
            className="p-2 rounded-lg hover:bg-[var(--surface-1)] text-[var(--text-muted)] transition-colors"
          >
            <MenuIcon className="h-4 w-4" />
          </button>

          <button onClick={() => setSearchOpen(true)} className="hidden sm:flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 text-left text-xs text-[var(--text-muted)] hover:border-[var(--surface-3)]">
            <SearchIcon className="h-4 w-4" />
            <span className="flex-1">Search anything</span>
            <kbd className="rounded border border-[var(--border)] bg-[var(--surface-0)] px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>

          <div className="flex-1" />

          {/* Live clock */}
          <LiveClock />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="p-2 rounded-lg hover:bg-[var(--surface-1)] text-[var(--text-muted)] transition-colors"
          >
            {theme === "light" ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
          <button onClick={() => setNotificationsOpen(value => !value)} aria-label="Notifications" aria-expanded={notificationsOpen} className="relative p-2 rounded-lg hover:bg-[var(--surface-1)] text-[var(--text-muted)] transition-colors">
            <BellIcon className="h-4 w-4" />
            {hasUnread && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />}
          </button>
          {notificationsOpen && <NotificationPanel hasUnread={hasUnread} onMarkRead={() => setHasUnread(false)} />}
          </div>
        </header>

        {/* Page content */}
        <main className="app-main flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(new Date()), 0);
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);
  return (
    <div className="text-right hidden sm:block">
      <p className="text-xs font-medium text-[var(--text-primary)]" suppressHydrationWarning>
        {now?.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) ?? "--:--"}
      </p>
      <p className="text-[10px] text-[var(--text-muted)]" suppressHydrationWarning>
        {now?.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short" }) ?? "Loading"}
      </p>
    </div>
  );
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
function GridIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function DoorIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/><circle cx="15" cy="13" r="1" fill="currentColor"/></svg>;
}
function CalendarIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
}
function UsersIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
}
function BrushIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08"/><path d="M7.07 14.94C5.79 16.22 4 17 2 17c0-2 .78-3.79 2.06-5.07l3.01 2.01z"/></svg>;
}
function ReceiptIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>;
}
function BadgeIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4L2 12l3-3V5h4z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function ChartIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-6"/></svg>;
}
function GearIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
}
function MenuIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 12h18M3 6h18M3 18h18"/></svg>;
}
function BellIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
}
function MoonIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
}
function SunIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
}
function LogOutIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
}
function SearchIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
}

function NotificationPanel({ hasUnread, onMarkRead }: { hasUnread: boolean; onMarkRead: () => void }) {
  return (
    <div className="absolute right-0 top-11 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-0)] shadow-xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div><p className="text-sm font-semibold text-[var(--text-primary)]">Activity</p><p className="text-[11px] text-[var(--text-muted)]">What needs your attention</p></div>
        <button onClick={onMarkRead} disabled={!hasUnread} className="text-xs font-medium text-brand-600 disabled:text-[var(--text-muted)] dark:text-brand-400">{hasUnread ? "Mark all read" : "All caught up"}</button>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {[
          ["Room 204 needs inspection", "Housekeeping completed cleaning", "2 min"],
          ["Payment received", "₦185,000 from Chidi Okafor", "18 min"],
          ["Late departure", "Room 102 has not checked out", "42 min"],
        ].map(([title, detail, time], index) => (
          <div key={title} className="flex gap-3 px-4 py-3 hover:bg-[var(--surface-1)]">
            <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", !hasUnread ? "bg-[var(--surface-3)]" : index === 2 ? "bg-amber-500" : "bg-brand-500")} />
            <div className="min-w-0 flex-1"><p className="text-sm font-medium text-[var(--text-primary)]">{title}</p><p className="truncate text-xs text-[var(--text-muted)]">{detail}</p></div>
            <span className="text-[10px] text-[var(--text-muted)]">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
