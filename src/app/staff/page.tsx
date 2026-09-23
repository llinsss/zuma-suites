"use client";
import { useApp } from "@/store/AppContext";
import { Card, Badge, Button, Avatar, SectionHeader } from "@/components/ui";
import { formatDate, cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const ROLE_CONFIG: Record<UserRole, { label: string; color: string; bg: string }> = {
  super_admin:             { label: "Super Admin",    color: "text-red-700 dark:text-red-400",     bg: "bg-red-50 dark:bg-red-950/40" },
  front_desk:              { label: "Front Desk",     color: "text-blue-700 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-950/40" },
  housekeeping_supervisor: { label: "HK Supervisor",  color: "text-violet-700 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/40" },
  housekeeper:             { label: "Housekeeper",    color: "text-teal-700 dark:text-teal-400",   bg: "bg-teal-50 dark:bg-teal-950/40" },
  maintenance:             { label: "Maintenance",    color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/40" },
  storekeeper:             { label: "Storekeeper",    color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40" },
  accountant:              { label: "Accountant",     color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  night_auditor:           { label: "Night Auditor",  color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950/40" },
  guest:                   { label: "Guest",          color: "text-stone-600 dark:text-stone-400", bg: "bg-stone-100 dark:bg-stone-800/40" },
};

const SHIFT_CONFIG = {
  morning:   { label: "Morning (6am–2pm)",   color: "text-amber-600 dark:text-amber-400" },
  afternoon: { label: "Afternoon (2pm–10pm)", color: "text-blue-600 dark:text-blue-400" },
  night:     { label: "Night (10pm–6am)",    color: "text-indigo-600 dark:text-indigo-400" },
};

const DEPT_COLORS: Record<string, string> = {
  "Front Office": "bg-blue-500",
  "Housekeeping": "bg-teal-500",
  "Engineering":  "bg-orange-500",
  "Finance":      "bg-emerald-500",
};

export default function StaffPage() {
  const { staff } = useApp();

  const departments = [...new Set(staff.map(s => s.department))];
  const byDept = departments.reduce((acc, dept) => {
    acc[dept] = staff.filter(s => s.department === dept);
    return acc;
  }, {} as Record<string, typeof staff>);

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Staff Management"
        subtitle="Team members, roles, shifts, and performance"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Shift Schedule</Button>
            <Button size="sm">+ Add Staff</Button>
          </div>
        }
      />

      {/* Dept summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {departments.map(dept => (
          <Card key={dept} className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-sm", DEPT_COLORS[dept] || "bg-stone-500")}>
                {dept[0]}
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{byDept[dept].length}</p>
                <p className="text-xs text-[var(--text-muted)]">{dept}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Staff by department */}
      {departments.map(dept => (
        <div key={dept}>
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("h-2 w-2 rounded-full", DEPT_COLORS[dept] || "bg-stone-500")} />
            <h2 className="font-semibold text-[var(--text-primary)]">{dept}</h2>
            <span className="text-xs text-[var(--text-muted)]">({byDept[dept].length} members)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {byDept[dept].map(member => {
              const roleCfg = ROLE_CONFIG[member.role];
              const shiftCfg = member.shift ? SHIFT_CONFIG[member.shift] : null;
              return (
                <Card key={member.id} hover className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar name={`${member.firstName} ${member.lastName}`} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[var(--text-primary)] truncate">
                        {member.firstName} {member.lastName}
                      </p>
                      <Badge color={roleCfg.color} bg={roleCfg.bg} className="mt-0.5">{roleCfg.label}</Badge>
                    </div>
                    <div className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", member.isActive ? "bg-emerald-500" : "bg-stone-400")} />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <span>📧</span>
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <span>📱</span>
                      <span>{member.phone}</span>
                    </div>
                    {shiftCfg && (
                      <div className={cn("flex items-center gap-1.5 font-medium", shiftCfg.color)}>
                        <span>🕐</span>
                        <span>{shiftCfg.label}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <span>📅</span>
                      <span>Since {formatDate(member.hireDate)}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[var(--border)] flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">Edit</Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">Schedule</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
