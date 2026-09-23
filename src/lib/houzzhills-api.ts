const hmsUrl = () => process.env.HOUZZHILLS_HMS_URL ?? "http://localhost:3001";

export async function forwardToHms(request: Request, path: string) {
  const url = new URL(path, hmsUrl());
  if (request.method === "GET") url.search = new URL(request.url).search;
  const body = request.method === "GET" ? undefined : await request.text();
  const response = await fetch(url, { method: request.method, headers: { "content-type": "application/json", "x-houzzhills-public-key": process.env.HOUZZHILLS_PUBLIC_API_KEY ?? "" }, body, cache: "no-store" });
  return new Response(await response.text(), { status: response.status, headers: { "content-type": "application/json" } });
}
