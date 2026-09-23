"use client";
import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { Card, Badge, Button, Avatar, SectionHeader } from "@/components/ui";
import { TASK_STATUS_CONFIG, PRIORITY_CONFIG, formatTime, cn } from "@/lib/utils";
import type { TaskStatus } from "@/types";

const COLUMNS: { status: TaskStatus; label: string; color: string }[] = [
  { status: "pending",     label: "Pending",     color: "border-amber-400" },
  { status: "in_progress", label: "In Progress", color: "border-blue-400" },
  { status: "completed",   label: "Completed",   color: "border-emerald-400" },
  { status: "blocked",     label: "Blocked",     color: "border-red-400" },
];

const TASK_TYPE_LABELS: Record<string, string> = {
  checkout_clean: "Checkout Clean",
  stayover_clean: "Stayover Clean",
  deep_clean: "Deep Clean",
  inspection: "Inspection",
  turndown: "Turndown",
};

export default function HousekeepingPage() {
  const { state, dispatch } = useApp();
  const [view, setView] = useState<"board" | "list">("board");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const tasksByStatus = COLUMNS.reduce((acc, col) => {
    acc[col.status] = state.housekeepingTasks.filter(t => t.status === col.status);
    return acc;
  }, {} as Record<TaskStatus, typeof state.housekeepingTasks>);

  const totalPending = state.housekeepingTasks.filter(t => t.status === "pending").length;
  const totalInProgress = state.housekeepingTasks.filter(t => t.status === "in_progress").length;
  const totalCompleted = state.housekeepingTasks.filter(t => t.status === "completed").length;

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <SectionHeader
        title="Housekeeping"
        subtitle="Task board, room assignments, and cleaning status"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setView(v => v === "board" ? "list" : "board")}>
              {view === "board" ? "List View" : "Board View"}
            </Button>
            <Button size="sm">+ New Task</Button>
          </div>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending", value: totalPending, color: "text-amber-600 dark:text-amber-400" },
          { label: "In Progress", value: totalInProgress, color: "text-blue-600 dark:text-blue-400" },
          { label: "Completed Today", value: totalCompleted, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Dirty Rooms", value: state.rooms.filter(r => r.status === "dirty").length, color: "text-orange-600 dark:text-orange-400" },
        ].map(s => (
          <Card key={s.label} className="p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      {view === "board" ? (
        /* Kanban Board */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map(col => (
            <div key={col.status} className="space-y-3">
              {/* Column header */}
              <div className={cn("flex items-center justify-between px-3 py-2 rounded-lg border-l-4 bg-[var(--surface-1)]", col.color)}>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{col.label}</span>
                <span className="text-xs font-bold text-[var(--text-muted)]">{tasksByStatus[col.status]?.length || 0}</span>
              </div>

              {/* Task cards */}
              <div className="space-y-2 min-h-[200px]">
                {(tasksByStatus[col.status] || []).map(task => {
                  const isExpanded = expandedTask === task.id;
                  const priCfg = PRIORITY_CONFIG[task.priority];
                  const checkedCount = task.checklist.filter(c => c.checked).length;

                  return (
                    <Card key={task.id} className="overflow-hidden">
                      <div
                        className="p-3 cursor-pointer hover:bg-[var(--surface-1)] transition-colors"
                        onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-semibold text-[var(--text-primary)] text-sm">Room {task.room?.number}</p>
                            <p className="text-xs text-[var(--text-muted)]">{TASK_TYPE_LABELS[task.type]}</p>
                          </div>
                          <span className={`text-xs font-semibold ${priCfg.color}`}>{priCfg.label}</span>
                        </div>

                        {task.assignedToName && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <Avatar name={task.assignedToName} size="sm" />
                            <span className="text-xs text-[var(--text-muted)]">{task.assignedToName}</span>
                          </div>
                        )}

                        {/* Checklist progress */}
                        {task.checklist.length > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full transition-all"
                                style={{ width: `${(checkedCount / task.checklist.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[var(--text-muted)]">{checkedCount}/{task.checklist.length}</span>
                          </div>
                        )}
                      </div>

                      {/* Expanded checklist */}
                      {isExpanded && (
                        <div className="border-t border-[var(--border)] p-3 space-y-2 bg-[var(--surface-1)]">
                          {task.checklist.map(item => (
                            <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.checked}
                                readOnly
                                className="rounded border-[var(--border)] accent-brand-500"
                              />
                              <span className={cn("text-xs", item.checked ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]")}>
                                {item.label}
                              </span>
                            </label>
                          ))}
                          <div className="flex gap-2 pt-2">
                            {task.status === "pending" && (
                              <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => dispatch({ type: "UPDATE_TASK_STATUS", payload: { taskId: task.id, status: "in_progress" } })}
                              >
                                Start
                              </Button>
                            )}
                            {task.status === "in_progress" && (
                              <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => dispatch({ type: "UPDATE_TASK_STATUS", payload: { taskId: task.id, status: "completed" } })}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List view */
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Room", "Task Type", "Assigned To", "Priority", "Status", "Scheduled", "Progress", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {state.housekeepingTasks.map(task => {
                const cfg = TASK_STATUS_CONFIG[task.status];
                const priCfg = PRIORITY_CONFIG[task.priority];
                const checkedCount = task.checklist.filter(c => c.checked).length;
                return (
                  <tr key={task.id} className="hover:bg-[var(--surface-1)] transition-colors">
                    <td className="px-4 py-3 font-bold text-[var(--text-primary)]">Room {task.room?.number}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{TASK_TYPE_LABELS[task.type]}</td>
                    <td className="px-4 py-3">
                      {task.assignedToName ? (
                        <div className="flex items-center gap-2">
                          <Avatar name={task.assignedToName} size="sm" />
                          <span className="text-[var(--text-secondary)]">{task.assignedToName}</span>
                        </div>
                      ) : <span className="text-[var(--text-muted)]">Unassigned</span>}
                    </td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold ${priCfg.color}`}>{priCfg.label}</span></td>
                    <td className="px-4 py-3"><Badge color={cfg.color} bg={cfg.bg}>{cfg.label}</Badge></td>
                    <td className="px-4 py-3 text-[var(--text-muted)] whitespace-nowrap">{formatTime(task.scheduledFor)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${task.checklist.length ? (checkedCount / task.checklist.length) * 100 : 0}%` }} />
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">{checkedCount}/{task.checklist.length}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {task.status === "pending" && (
                        <Button size="sm" variant="primary"
                          onClick={() => dispatch({ type: "UPDATE_TASK_STATUS", payload: { taskId: task.id, status: "in_progress" } })}>
                          Start
                        </Button>
                      )}
                      {task.status === "in_progress" && (
                        <Button size="sm" variant="secondary"
                          onClick={() => dispatch({ type: "UPDATE_TASK_STATUS", payload: { taskId: task.id, status: "completed" } })}>
                          Complete
                        </Button>
                      )}
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
