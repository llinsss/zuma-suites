"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { Room, Reservation, HousekeepingTask, FolioItem } from "@/types";
import {
  ROOMS, RESERVATIONS, HOUSEKEEPING_TASKS, MAINTENANCE_TICKETS,
  GUESTS, INVENTORY_ITEMS, STAFF, DASHBOARD_METRICS, FOLIO_ITEMS,
} from "@/lib/data";
import { calculateVAT } from "@/lib/utils";

interface AppState {
  rooms: Room[];
  reservations: Reservation[];
  housekeepingTasks: HousekeepingTask[];
  maintenanceTickets: typeof MAINTENANCE_TICKETS;
  folioItems: FolioItem[];
  theme: "light" | "dark";
  sidebarOpen: boolean;
  currentUser: { id: string; name: string; role: string } | null;
}

type Action =
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_USER"; payload: AppState["currentUser"] }
  | { type: "UPDATE_ROOM_STATUS"; payload: { roomId: string; status: Room["status"] } }
  | { type: "CHECK_IN"; payload: { reservationId: string } }
  | { type: "CHECK_OUT"; payload: { reservationId: string } }
  | { type: "CANCEL_RESERVATION"; payload: { reservationId: string; reason: string } }
  | { type: "CREATE_RESERVATION"; payload: Omit<Reservation, "id" | "confirmationNumber" | "createdAt"> }
  | { type: "RECORD_PAYMENT"; payload: { reservationId: string; amount: number; method: string; reference?: string } }
  | { type: "POST_CHARGE"; payload: { reservationId: string; description: string; category: FolioItem["category"]; amount: number; quantity: number } }
  | { type: "UPDATE_TASK_STATUS"; payload: { taskId: string; status: HousekeepingTask["status"] } }
  | { type: "TOGGLE_CHECKLIST_ITEM"; payload: { taskId: string; itemId: string } };

const initialState: AppState = {
  rooms: ROOMS,
  reservations: RESERVATIONS,
  housekeepingTasks: HOUSEKEEPING_TASKS,
  maintenanceTickets: MAINTENANCE_TICKETS,
  folioItems: FOLIO_ITEMS,
  theme: "light",
  sidebarOpen: true,
  currentUser: { id: "staff1", name: "Adaeze Eze", role: "front_desk" },
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {

    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case "SET_USER":
      return { ...state, currentUser: action.payload };

    case "UPDATE_ROOM_STATUS":
      return {
        ...state,
        rooms: state.rooms.map(r =>
          r.id === action.payload.roomId ? { ...r, status: action.payload.status } : r
        ),
      };

    case "CHECK_IN": {
      const res = state.reservations.find(r => r.id === action.payload.reservationId);
      if (!res) return state;
      return {
        ...state,
        reservations: state.reservations.map(r =>
          r.id === res.id
            ? { ...r, status: "checked_in", actualCheckIn: new Date().toISOString() }
            : r
        ),
        rooms: state.rooms.map(r =>
          r.id === res.roomId
            ? { ...r, status: "occupied", currentReservationId: res.id }
            : r
        ),
      };
    }

    case "CHECK_OUT": {
      const res = state.reservations.find(r => r.id === action.payload.reservationId);
      if (!res) return state;
      return {
        ...state,
        reservations: state.reservations.map(r =>
          r.id === res.id
            ? { ...r, status: "checked_out", actualCheckOut: new Date().toISOString() }
            : r
        ),
        rooms: state.rooms.map(r =>
          r.id === res.roomId
            ? { ...r, status: "dirty", currentReservationId: undefined }
            : r
        ),
        // Auto-create a checkout housekeeping task
        housekeepingTasks: [
          ...state.housekeepingTasks,
          {
            id: `hk-auto-${Date.now()}`,
            roomId: res.roomId,
            room: state.rooms.find(r => r.id === res.roomId),
            type: "checkout_clean" as const,
            status: "pending" as const,
            priority: "high" as const,
            scheduledFor: new Date().toISOString(),
            beforePhotos: [],
            afterPhotos: [],
            checklist: [
              { id: "ac1", label: "Strip and replace all linens", checked: false },
              { id: "ac2", label: "Clean bathroom thoroughly", checked: false },
              { id: "ac3", label: "Vacuum and mop floors", checked: false },
              { id: "ac4", label: "Restock minibar", checked: false },
              { id: "ac5", label: "Check all appliances", checked: false },
              { id: "ac6", label: "Replace toiletries", checked: false },
              { id: "ac7", label: "Empty all bins", checked: false },
              { id: "ac8", label: "Wipe all surfaces", checked: false },
            ],
          },
        ],
      };
    }

    case "CANCEL_RESERVATION": {
      const res = state.reservations.find(r => r.id === action.payload.reservationId);
      if (!res) return state;
      return {
        ...state,
        reservations: state.reservations.map(r =>
          r.id === res.id
            ? { ...r, status: "cancelled", internalNotes: action.payload.reason }
            : r
        ),
        rooms: state.rooms.map(r =>
          r.id === res.roomId && res.status === "checked_in"
            ? { ...r, status: "dirty", currentReservationId: undefined }
            : r.id === res.roomId && res.status === "confirmed"
            ? { ...r, currentReservationId: undefined }
            : r
        ),
      };
    }

    case "CREATE_RESERVATION": {
      const id = `res-${Date.now()}`;
      const num = `HLM-2025-${String(state.reservations.length + 1).padStart(4, "0")}`;
      const newRes: Reservation = {
        ...action.payload,
        id,
        confirmationNumber: num,
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        reservations: [...state.reservations, newRes],
      };
    }

    case "RECORD_PAYMENT": {
      const { reservationId, amount } = action.payload;
      return {
        ...state,
        reservations: state.reservations.map(r => {
          if (r.id !== reservationId) return r;
          const newPaid = r.amountPaid + amount;
          const newBalance = Math.max(0, r.grandTotal - newPaid);
          const paymentStatus =
            newBalance === 0 ? "paid" : newPaid > 0 ? "partial" : "pending";
          return { ...r, amountPaid: newPaid, balance: newBalance, paymentStatus };
        }),
      };
    }

    case "POST_CHARGE": {
      const { reservationId, description, category, amount, quantity } = action.payload;
      const newItem: FolioItem = {
        id: `fi-${Date.now()}`,
        reservationId,
        date: new Date().toISOString().split("T")[0],
        description,
        category,
        quantity,
        unitPrice: amount,
        amount: amount * quantity,
        postedBy: "staff",
        isVoided: false,
      };
      const chargeTotal = amount * quantity;
      const newVat = calculateVAT(chargeTotal);
      return {
        ...state,
        folioItems: [...state.folioItems, newItem],
        reservations: state.reservations.map(r => {
          if (r.id !== reservationId) return r;
          const newExtras = r.extrasTotal + chargeTotal;
          const newGrand = r.grandTotal + chargeTotal + newVat;
          const newBalance = newGrand - r.amountPaid;
          return {
            ...r,
            extrasTotal: newExtras,
            vatAmount: r.vatAmount + newVat,
            grandTotal: newGrand,
            balance: newBalance,
            paymentStatus: newBalance > 0 ? (r.amountPaid > 0 ? "partial" : "pending") : "paid",
          };
        }),
      };
    }

    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        housekeepingTasks: state.housekeepingTasks.map(t => {
          if (t.id !== action.payload.taskId) return t;
          const updates: Partial<HousekeepingTask> = { status: action.payload.status };
          if (action.payload.status === "in_progress") updates.startedAt = new Date().toISOString();
          if (action.payload.status === "completed") updates.completedAt = new Date().toISOString();
          return { ...t, ...updates };
        }),
        // When a task completes, mark the room as clean
        rooms: action.payload.status === "completed"
          ? state.rooms.map(r => {
              const task = state.housekeepingTasks.find(t => t.id === action.payload.taskId);
              if (!task || r.id !== task.roomId) return r;
              return { ...r, status: "clean" as Room["status"], lastCleaned: new Date().toISOString() };
            })
          : state.rooms,
      };

    case "TOGGLE_CHECKLIST_ITEM":
      return {
        ...state,
        housekeepingTasks: state.housekeepingTasks.map(t =>
          t.id !== action.payload.taskId ? t : {
            ...t,
            checklist: t.checklist.map(c =>
              c.id !== action.payload.itemId ? c : { ...c, checked: !c.checked }
            ),
          }
        ),
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  guests: typeof GUESTS;
  inventory: typeof INVENTORY_ITEMS;
  staff: typeof STAFF;
  metrics: typeof DASHBOARD_METRICS;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("houzzhills-theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferredDark ? "dark" : "light";
    dispatch({ type: "SET_THEME", payload: theme });
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
  useEffect(() => window.localStorage.setItem("houzzhills-theme", state.theme), [state.theme]);
  const liveMetrics = useMemo(() => {
    const occupiedRooms = state.rooms.filter(room => room.status === "occupied").length;
    const activeReservations = state.reservations.filter(reservation => reservation.status === "checked_in");
    return {
      ...DASHBOARD_METRICS,
      totalRooms: state.rooms.length,
      occupiedRooms,
      occupancyRate: state.rooms.length ? Math.round((occupiedRooms / state.rooms.length) * 100) : 0,
      guestsInHouse: activeReservations.reduce((total, reservation) => total + reservation.adults + reservation.children, 0),
      pendingHousekeeping: state.housekeepingTasks.filter(task => task.status === "pending" || task.status === "in_progress").length,
      monthRevenue: state.reservations.reduce((total, reservation) => total + reservation.amountPaid, 0),
    };
  }, [state.rooms, state.reservations, state.housekeepingTasks]);
  return (
    <AppContext.Provider value={{ state, dispatch, guests: GUESTS, inventory: INVENTORY_ITEMS, staff: STAFF, metrics: liveMetrics }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
