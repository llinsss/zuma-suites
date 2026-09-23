import { forwardToHms } from "@/lib/houzzhills-api";
export async function POST(request: Request) { return forwardToHms(request, "/api/public/reservation-intents"); }
