import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Wallet, TrendingUp, AlertTriangle, PiggyBank } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_layout/finance")({
  component: FinancePage,
  head: () => ({
    meta: [
      { title: "Financial Independence — SheShield" },
      { name: "description", content: "Track budgets, plan savings, and learn investing — safely." },
    ],
  }),
});

function FinancePage() {
  const [income, setIncome] = useState(40000);
  const [expenses, setExpenses] = useState(26000);
  const [goal, setGoal] = useState(100000);
  const [saved, setSaved] = useState(38000);

  const savings = Math.max(income - expenses, 0);
  const rate = income ? Math.round((savings / income) * 100) : 0;
  const goalPct = useMemo(() => Math.min(100, Math.round((saved / goal) * 100)), [saved, goal]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-sm text-primary font-medium">Module 3</div>
        <h1 className="text-4xl font-semibold">Financial Independence</h1>
        <p className="text-muted-foreground max-w-2xl">Simple budgets. Smart goals. Beginner-friendly investing — with scam alerts built in.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-card border border-border p-6 shadow-soft lg:col-span-2 space-y-6">
          <h2 className="font-semibold flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> Monthly budget</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Income (₹)" value={income} onChange={setIncome} />
            <Field label="Expenses (₹)" value={expenses} onChange={setExpenses} />
          </div>

          <div className="rounded-2xl bg-secondary/60 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Savings this month</span>
              <span className="font-semibold">₹{savings.toLocaleString("en-IN")} ({rate}%)</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-card overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: `${Math.min(rate, 100)}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {rate >= 20 ? "Great pace — you're hitting the 20% rule." : "Aim for 20%+ to build a safety net first."}
            </p>
          </div>

          <div>
            <h3 className="font-semibold flex items-center gap-2"><PiggyBank className="h-4 w-4 text-primary" /> Savings goal</h3>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              <Field label="Goal (₹)" value={goal} onChange={setGoal} />
              <Field label="Saved so far (₹)" value={saved} onChange={setSaved} />
            </div>
            <div className="mt-4">
              <Progress value={goalPct} />
              <div className="mt-2 text-xs text-muted-foreground">{goalPct}% of goal · {Math.max(0, Math.ceil((goal - saved) / Math.max(savings, 1)))} months at current pace</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Start investing</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { t: "Emergency fund", d: "3–6 months expenses in a liquid fund." },
                { t: "Index SIP", d: "₹500/mo in a Nifty 50 index fund." },
                { t: "PPF / NPS", d: "Tax-saving long-term wealth." },
              ].map(s => (
                <li key={s.t} className="rounded-xl bg-secondary/60 p-3">
                  <div className="font-medium">{s.t}</div>
                  <div className="text-xs text-muted-foreground">{s.d}</div>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full mt-4">Open learning path</Button>
          </div>

          <div className="rounded-3xl bg-card border border-warning/40 p-6 shadow-soft">
            <h3 className="font-semibold flex items-center gap-2 text-warning-foreground">
              <AlertTriangle className="h-4 w-4 text-warning" /> Scam alerts
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="rounded-lg bg-warning/15 p-2">"Guaranteed 30% returns in 7 days" — high-risk pyramid pattern.</li>
              <li className="rounded-lg bg-warning/15 p-2">Brand "GlowKart" flagged: delayed payouts to creators.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Input type="number" value={value} onChange={e => onChange(Number(e.target.value) || 0)} className="mt-1" />
    </label>
  );
}
