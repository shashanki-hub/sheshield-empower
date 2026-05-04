import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Megaphone, ShieldAlert, IndianRupee, Plus, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_layout/creator")({
  component: CreatorPage,
  head: () => ({
    meta: [
      { title: "Creator & Small Business — SheShield" },
      { name: "description", content: "Track collabs, affiliate income and detect scam brands." },
    ],
  }),
});

type Collab = { brand: string; amount: number; status: "Paid" | "Pending" | "Overdue"; risk: "low" | "medium" | "high" };

const initial: Collab[] = [
  { brand: "Nykaa", amount: 18000, status: "Paid", risk: "low" },
  { brand: "MyGlamm", amount: 12000, status: "Pending", risk: "low" },
  { brand: "GlowKart", amount: 8000, status: "Overdue", risk: "high" },
  { brand: "Mamaearth", amount: 22000, status: "Paid", risk: "low" },
];

function CreatorPage() {
  const [items] = useState<Collab[]>(initial);
  const total = items.reduce((s, i) => s + i.amount, 0);
  const paid = items.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = total - paid;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-sm text-primary font-medium">Module 5</div>
        <h1 className="text-4xl font-semibold">Creator & Small Business</h1>
        <p className="text-muted-foreground max-w-2xl">Manage brand collaborations, get paid on time, and avoid scam offers.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="Total tracked" value={total} tone="primary" />
        <Stat label="Paid" value={paid} tone="success" />
        <Stat label="Pending" value={pending} tone="warning" />
      </div>

      <div className="rounded-3xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border">
          <h2 className="font-semibold flex items-center gap-2"><Megaphone className="h-4 w-4 text-primary" /> Collaborations</h2>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
        <ul className="divide-y divide-border">
          {items.map((c, i) => (
            <li key={i} className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-secondary grid place-items-center text-sm font-semibold">{c.brand[0]}</div>
              <div className="flex-1">
                <div className="font-medium">{c.brand}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1"><IndianRupee className="h-3 w-3" />{c.amount.toLocaleString("en-IN")}</div>
              </div>
              {c.risk === "high" && (
                <Badge className="bg-destructive/15 text-destructive hover:bg-destructive/15"><ShieldAlert className="h-3 w-3 mr-1" />Scam risk</Badge>
              )}
              <StatusBadge status={c.status} />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl bg-gradient-soft border border-border p-6 shadow-soft">
        <h3 className="font-semibold flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-destructive" /> Scam detection</h3>
        <p className="text-sm text-muted-foreground mt-1">
          We cross-check brand domains, payment history shared by creators, and contract red flags (no-fee asks, gifted-only with usage rights, vague deliverables).
        </p>
        <ul className="mt-3 grid sm:grid-cols-3 gap-2 text-xs">
          <li className="rounded-xl bg-card border border-border p-3">Domain age & WHOIS check</li>
          <li className="rounded-xl bg-card border border-border p-3">Community payment reports</li>
          <li className="rounded-xl bg-card border border-border p-3">Contract clause analyzer</li>
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "primary" | "success" | "warning" }) {
  const cls = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-primary";
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${cls}`}>₹{value.toLocaleString("en-IN")}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Collab["status"] }) {
  if (status === "Paid") return <Badge className="bg-success/15 text-success hover:bg-success/15"><Check className="h-3 w-3 mr-1" />Paid</Badge>;
  if (status === "Pending") return <Badge className="bg-warning/15 text-warning-foreground hover:bg-warning/15"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
  return <Badge className="bg-destructive/15 text-destructive hover:bg-destructive/15"><Clock className="h-3 w-3 mr-1" />Overdue</Badge>;
}
