import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Shield, Briefcase, Wallet, Sparkles, Megaphone, Home, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { NameGate, useUserName } from "@/components/NameGate";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/safety", label: "Safety", icon: Shield },
  { to: "/careers", label: "Careers", icon: Briefcase },
  { to: "/finance", label: "Finance", icon: Wallet },
  { to: "/assistant", label: "Assistant", icon: Sparkles },
  { to: "/creator", label: "Creator", icon: Megaphone },
];

export function AppShell() {
  const { pathname } = useLocation();
  const { name, clear } = useUserName();

  return (
    <NameGate>
      <div className="min-h-screen bg-hero" suppressHydrationWarning>
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="SheShield logo" width={36} height={36} className="h-9 w-9 rounded-xl shadow-soft" suppressHydrationWarning />
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold">SheShield</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Empower · Protect · Grow</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {name && (
              <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-border">
                <div className="h-8 w-8 rounded-full bg-gradient-warm grid place-items-center text-xs font-semibold text-primary-foreground">
                  {name[0]?.toUpperCase()}
                </div>
                <div className="text-sm">
                  <div className="text-muted-foreground text-[10px] leading-none">Welcome</div>
                  <div className="font-medium leading-tight">{name}</div>
                </div>
                <button onClick={clear} title="Sign out" className="text-muted-foreground hover:text-foreground ml-1">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          <nav className="hidden md:flex items-center gap-1">
            {nav.slice(1).map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:pt-10">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-40 rounded-2xl bg-background/90 backdrop-blur-xl border border-border shadow-elegant">
        <ul className="grid grid-cols-6">
          {nav.map((n) => {
            const active = pathname === n.to;
            const Icon = n.icon;
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5", active && "drop-shadow")} />
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
