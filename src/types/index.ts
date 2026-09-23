// ─── Enums ────────────────────────────────────────────────────────────────────

export type RoomStatus =
  | "available"
  | "occupied"
  | "dirty"
  | "clean"
  | "inspected"
  | "maintenance"
  | "out_of_order";

export type RoomType = "studio" | "one_bedroom" | "two_bedroom";

export type ReservationStatus =
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled"
  | "no_show"
  | "waitlist";

export type PaymentMethod =
  | "cash"
  | "pos"
  | "bank_transfer"
  | "paystack"
  | "flutterwave"
  | "opay"
  | "palmpay"
  | "complimentary";

export type PaymentStatus = "pending" | "partial" | "paid" | "refunded" | "void";

export type UserRole =
  | "super_admin"
  | "front_desk"
  | "housekeeping_supervisor"
  | "housekeeper"
  | "maintenance"
  | "storekeeper"
  | "accountant"
  | "night_auditor"
  | "guest";

export type TaskStatus = "pending" | "in_progress" | "completed" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type MaintenanceStatus = "open" | "assigned" | "in_progress" | "resolved" | "closed";

export type BookingSource =
  | "direct"
  | "walk_in"
  | "phone"
  | "whatsapp"
  | "booking_com"
  | "airbnb"
  | "corporate"
  | "agent";

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface Room {
  id: string;
  number: string;
  name: string;
  type: RoomType;
  floor: number;
  status: RoomStatus;
  baseRate: number; // NGN per night
  weekendRate: number;
  weeklyRate: number;
  monthlyRate: number;
  maxOccupancy: number;
  amenities: string[];
  photos: string[];
  description: string;
  isActive: boolean;
  currentReservationId?: string;
  lastCleaned?: string;
  lastInspected?: string;
  notes?: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  idType: "passport" | "nin" | "drivers_license" | "voters_card";
  idNumber: string;
  idExpiry?: string;
  idPhotoUrl?: string;
  company?: string;
  designation?: string;
  address?: string;
  preferences?: string;
  isBlacklisted: boolean;
  blacklistReason?: string;
  loyaltyPoints: number;
  totalStays: number;
  totalSpend: number;
  createdAt: string;
  notes?: string;
}

export interface Reservation {
  id: string;
  confirmationNumber: string;
  guestId: string;
  guest?: Guest;
  roomId: string;
  room?: Room;
  status: ReservationStatus;
  source: BookingSource;
  checkIn: string; // ISO date
  checkOut: string;
  actualCheckIn?: string;
  actualCheckOut?: string;
  adults: number;
  children: number;
  nights: number;
  ratePerNight: number;
  totalRoomCharge: number;
  extrasTotal: number;
  discountAmount: number;
  vatAmount: number;
  serviceCharge: number;
  grandTotal: number;
  amountPaid: number;
  balance: number;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  internalNotes?: string;
  corporateAccountId?: string;
  groupId?: string;
  createdAt: string;
  createdBy: string;
}

export interface FolioItem {
  id: string;
  reservationId: string;
  date: string;
  description: string;
  category: "room" | "minibar" | "laundry" | "restaurant" | "extra" | "fee" | "discount" | "tax";
  quantity: number;
  unitPrice: number;
  amount: number;
  postedBy: string;
  isVoided: boolean;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  status: "success" | "pending" | "failed";
  receivedBy: string;
  createdAt: string;
  notes?: string;
}

export interface HousekeepingTask {
  id: string;
  roomId: string;
  room?: Room;
  type: "checkout_clean" | "stayover_clean" | "deep_clean" | "inspection" | "turndown";
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  assignedToName?: string;
  scheduledFor: string;
  startedAt?: string;
  completedAt?: string;
  beforePhotos: string[];
  afterPhotos: string[];
  notes?: string;
  checklist: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface MaintenanceTicket {
  id: string;
  ticketNumber: string;
  roomId?: string;
  room?: Room;
  location: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: TaskPriority;
  assignedTo?: string;
  reportedBy: string;
  estimatedCost?: number;
  actualCost?: number;
  photos: string[];
  createdAt: string;
  resolvedAt?: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  location: "central_store" | "floor_1" | "floor_2" | "housekeeping";
  supplierId?: string;
  lastRestocked?: string;
  isActive: boolean;
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  avatar?: string;
  hireDate: string;
  shift?: "morning" | "afternoon" | "night";
}

export interface DashboardMetrics {
  occupancyRate: number;
  occupiedRooms: number;
  availableRooms: number;
  totalRooms: number;
  adr: number; // Average Daily Rate
  revpar: number; // Revenue Per Available Room
  todayRevenue: number;
  monthRevenue: number;
  checkInsToday: number;
  checkOutsToday: number;
  pendingHousekeeping: number;
  openMaintenanceTickets: number;
  guestsInHouse: number;
}

export interface RoomStatusCount {
  available: number;
  occupied: number;
  dirty: number;
  clean: number;
  inspected: number;
  maintenance: number;
  out_of_order: number;
}
