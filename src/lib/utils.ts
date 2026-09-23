import type { RoomStatus, RoomType, ReservationStatus, TaskStatus, TaskPriority, PaymentStatus } from "@/types";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNGN(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-NG", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-NG", {
    hour: "2-digit", minute: "2-digit",
  });
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function calculateVAT(amount: number): number {
  return Math.round(amount * 0.075);
}

export function calculateServiceCharge(amount: number): number {
  return Math.round(amount * 0.10);
}

// ─── Status Configs ───────────────────────────────────────────────────────────

export const ROOM_STATUS_CONFIG: Record<RoomStatus, { label: string; color: string; bg: string; dot: string }> = {
  available:    { label: "Available",    color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40",  dot: "bg-emerald-500" },
  occupied:     { label: "Occupied",     color: "text-blue-700 dark:text-blue-400",       bg: "bg-blue-50 dark:bg-blue-950/40",         dot: "bg-blue-500" },
  dirty:        { label: "Dirty",        color: "text-orange-700 dark:text-orange-400",   bg: "bg-orange-50 dark:bg-orange-950/40",     dot: "bg-orange-500" },
  clean:        { label: "Clean",        color: "text-teal-700 dark:text-teal-400",       bg: "bg-teal-50 dark:bg-teal-950/40",         dot: "bg-teal-500" },
  inspected:    { label: "Inspected",    color: "text-violet-700 dark:text-violet-400",   bg: "bg-violet-50 dark:bg-violet-950/40",     dot: "bg-violet-500" },
  maintenance:  { label: "Maintenance",  color: "text-red-700 dark:text-red-400",         bg: "bg-red-50 dark:bg-red-950/40",           dot: "bg-red-500" },
  out_of_order: { label: "Out of Order", color: "text-stone-600 dark:text-stone-400",     bg: "bg-stone-100 dark:bg-stone-800/40",      dot: "bg-stone-500" },
};

export const ROOM_TYPE_CONFIG: Record<RoomType, { label: string; shortLabel: string }> = {
  studio:      { label: "Studio",      shortLabel: "STD" },
  one_bedroom: { label: "1 Bedroom",   shortLabel: "1BR" },
  two_bedroom: { label: "2 Bedroom",   shortLabel: "2BR" },
};

export const RESERVATION_STATUS_CONFIG: Record<ReservationStatus, { label: string; color: string; bg: string }> = {
  confirmed:   { label: "Confirmed",   color: "text-blue-700 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-950/40" },
  checked_in:  { label: "Checked In",  color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  checked_out: { label: "Checked Out", color: "text-stone-600 dark:text-stone-400",   bg: "bg-stone-100 dark:bg-stone-800/40" },
  cancelled:   { label: "Cancelled",   color: "text-red-700 dark:text-red-400",       bg: "bg-red-50 dark:bg-red-950/40" },
  no_show:     { label: "No Show",     color: "text-amber-700 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-950/40" },
  waitlist:    { label: "Waitlist",    color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/40" },
};

export const TASK_STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  pending:     { label: "Pending",     color: "text-amber-700 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-950/40" },
  in_progress: { label: "In Progress", color: "text-blue-700 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-950/40" },
  completed:   { label: "Completed",   color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  blocked:     { label: "Blocked",     color: "text-red-700 dark:text-red-400",       bg: "bg-red-50 dark:bg-red-950/40" },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string }> = {
  low:    { label: "Low",    color: "text-stone-500" },
  medium: { label: "Medium", color: "text-amber-600 dark:text-amber-400" },
  high:   { label: "High",   color: "text-orange-600 dark:text-orange-400" },
  urgent: { label: "Urgent", color: "text-red-600 dark:text-red-400" },
};

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { label: string; color: string; bg: string }> = {
  pending:  { label: "Pending",  color: "text-amber-700 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-950/40" },
  partial:  { label: "Partial",  color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/40" },
  paid:     { label: "Paid",     color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  refunded: { label: "Refunded", color: "text-blue-700 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-950/40" },
  void:     { label: "Void",     color: "text-stone-600 dark:text-stone-400",   bg: "bg-stone-100 dark:bg-stone-800/40" },
};

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
