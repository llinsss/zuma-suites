import { forwardToHms } from "@/lib/houzzhills-api";
export async function GET(request: Request) { return forwardToHms(request, "/api/public/availability"); }
