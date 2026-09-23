import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}
export function Badge({ children, color, bg, className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
      color, bg, className
    )}>
      {children}
    </span>
  );
}

// ─── StatusDot ────────────────────────────────────────────────────────────────
export function StatusDot({ color, pulse }: { color: string; pulse?: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", color)} />}
      <span className={cn("relative inline-flex rounded-full h-2 w-2", color)} />
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}
export function Card({ children, className, onClick, hover }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-[var(--surface-0)] border border-[var(--border)] rounded-2xl shadow-[0_1px_2px_rgba(28,25,23,0.025)]",
        hover && "cursor-pointer hover:-translate-y-0.5 hover:border-[var(--surface-3)] hover:shadow-md transition-all",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
}
export function Button({ variant = "primary", size = "md", children, loading, className, disabled, ...props }: ButtonProps) {
  const variants = {
    primary:   "bg-brand-500 hover:bg-brand-600 text-white shadow-sm",
    secondary: "bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text-primary)] border border-[var(--border)]",
    ghost:     "hover:bg-[var(--surface-1)] text-[var(--text-secondary)]",
    danger:    "bg-red-600 hover:bg-red-700 text-white shadow-sm",
    outline:   "border border-[var(--border)] hover:bg-[var(--surface-1)] text-[var(--text-primary)]",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant], sizes[size], className
      )}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: number;
  icon?: ReactNode;
  accent?: string;
}
export function StatCard({ label, value, sub, trend, icon, accent }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{label}</p>
          <p className={cn("mt-1 text-2xl font-bold text-[var(--text-primary)] truncate", accent)}>{value}</p>
          {sub && <p className="mt-0.5 text-xs text-[var(--text-muted)]">{sub}</p>}
          {trend !== undefined && (
            <p className={cn("mt-1 text-xs font-medium", trend >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500")}>
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-3 p-2.5 rounded-lg bg-[var(--surface-1)] text-[var(--text-muted)] shrink-0">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-[var(--text-muted)]">{subtitle}</p>}
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-[var(--surface-1)] text-[var(--text-muted)] mb-4">{icon}</div>
      <p className="font-medium text-[var(--text-primary)]">{title}</p>
      {description && <p className="mt-1 text-sm text-[var(--text-muted)] max-w-xs">{description}</p>}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const sizes = { sm: "h-7 w-7 text-xs", md: "h-9 w-9 text-sm", lg: "h-12 w-12 text-base" };
  const colors = ["bg-brand-100 text-brand-700", "bg-blue-100 text-blue-700", "bg-violet-100 text-violet-700", "bg-emerald-100 text-emerald-700"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={cn("rounded-full flex items-center justify-center font-semibold shrink-0", sizes[size], color)}>
      {initials}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = "bg-brand-500", className }: { value: number; max?: number; color?: string; className?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn("h-1.5 w-full bg-[var(--surface-2)] rounded-full overflow-hidden", className)}>
      <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-[var(--border)]", className)} />;
}
