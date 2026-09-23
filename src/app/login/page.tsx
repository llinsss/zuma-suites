"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useApp } from "@/store/AppContext";

const DEMO_ROLES = [
  { role: "super_admin",             name: "Owner Admin",    label: "Owner / Admin", email: "owner@houzzhills.com",  icon: "👑" },
  { role: "front_desk",              name: "Adaeze Eze",     label: "Front Desk",    email: "adaeze@houzzhills.com", icon: "🛎️" },
  { role: "housekeeping_supervisor", name: "Grace Okonkwo",  label: "Housekeeping",  email: "grace@houzzhills.com",  icon: "🧹" },
  { role: "accountant",              name: "Ngozi Obi",      label: "Accountant",    email: "ngozi@houzzhills.com",  icon: "📊" },
];

export default function LoginPage() {
  const router = useRouter();
  const { dispatch } = useApp();
  const [email, setEmail] = useState("adaeze@houzzhills.com");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== "demo1234") {
      setError("Incorrect password. Use: demo1234");
      return;
    }
    const matched = DEMO_ROLES.find(r => r.email === email);
    if (!matched) {
      setError("Email not recognised. Pick a demo account above.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    dispatch({ type: "SET_USER", payload: { id: matched.role, name: matched.name, role: matched.role } });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-900 dark:bg-brand-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-brand-300"
              style={{
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Houzzhills HMS</p>
              <p className="text-brand-300 text-sm">Property Management System · Kaduna</p>
            </div>
          </div>
        </div>

        <div className="relative space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Manage your property<br />with confidence.
            </h1>
            <p className="mt-4 text-brand-200 text-lg leading-relaxed">
              Built for Kaduna&apos;s finest apartment hotels. Offline-capable, mobile-first, and designed for Nigerian hospitality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Rooms", value: "12" },
              { label: "Occupancy", value: "58%" },
              { label: "Today's Revenue", value: "₦675k" },
              { label: "Guests In-House", value: "9" },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-brand-300 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-brand-400 text-sm">
          © 2026 Houzzhills HMS · Kaduna, Nigeria · NDPR Compliant
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <p className="font-bold text-xl text-[var(--text-primary)]">Houzzhills HMS</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Welcome back</h2>
            <p className="mt-1 text-[var(--text-muted)]">Sign in to your account to continue</p>
          </div>

          {/* Demo role quick-select */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ROLES.map(r => (
                <button
                  key={r.role}
                  onClick={() => setEmail(r.email)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    email === r.email
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                      : "border-[var(--border)] hover:bg-[var(--surface-1)]"
                  }`}
                >
                  <span className="text-lg">{r.icon}</span>
                  <p className="text-xs font-medium text-[var(--text-primary)] mt-0.5">{r.label}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface-0)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded accent-brand-500" />
                <span className="text-sm text-[var(--text-muted)]">Remember me</span>
              </label>
              <button type="button" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                Forgot password?
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-[var(--text-muted)]">
            Password: <code className="bg-[var(--surface-1)] px-1.5 py-0.5 rounded">demo1234</code> for all demo accounts
          </p>
        </div>
      </div>
    </div>
  );
}
