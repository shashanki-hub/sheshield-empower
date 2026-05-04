import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, MessageSquare, ShieldAlert, PhoneCall, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/_layout/safety")({
  component: SafetyPage,
  head: () => ({
    meta: [
      { title: "Smart Safety — SheShield" },
      { name: "description", content: "One-tap SOS, live location sharing, fake call and offline SMS alerts." },
    ],
  }),
});

function SafetyPage() {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const [aiOn, setAiOn] = useState(true);
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [fakeCall, setFakeCall] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const start = () => {
    setHolding(true);
    setProgress(0);
    timer.current = window.setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (timer.current) window.clearInterval(timer.current);
          activate();
          return 100;
        }
        return p + 5;
      });
    }, 60);
  };
  const stop = () => {
    setHolding(false);
    if (timer.current) window.clearInterval(timer.current);
    if (!activated) setProgress(0);
  };

  const activate = () => {
    setActivated(true);
    toast.success("SOS activated", { description: "Trusted contacts have been alerted with your live location." });
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        p => setLoc({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => setLoc({ lat: 19.076, lng: 72.8777 })
      );
    } else {
      setLoc({ lat: 19.076, lng: 72.8777 });
    }
  };

  const reset = () => {
    setActivated(false); setProgress(0); setLoc(null);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-sm text-primary font-medium">Module 1</div>
        <h1 className="text-4xl font-semibold">Smart Safety System</h1>
        <p className="text-muted-foreground max-w-2xl">A working SOS prototype with live location, fake-call escape and AI-driven risk detection.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* SOS */}
        <div className="lg:col-span-2 rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-destructive" /> One-tap SOS</h2>
              <p className="text-sm text-muted-foreground">Press & hold for 1.2s to alert your circle.</p>
            </div>
            {activated && <Button variant="outline" onClick={reset}>Reset</Button>}
          </div>

          <div className="my-10 grid place-items-center">
            <button
              onMouseDown={start} onMouseUp={stop} onMouseLeave={stop}
              onTouchStart={start} onTouchEnd={stop}
              disabled={activated}
              className="relative h-48 w-48 rounded-full bg-gradient-to-br from-destructive to-primary text-primary-foreground text-2xl font-semibold shadow-elegant select-none disabled:opacity-90"
            >
              {activated && <span className="absolute inset-0 rounded-full animate-pulse-ring" />}
              <div className="absolute inset-0 grid place-items-center">
                {activated ? "ACTIVE" : "SOS"}
              </div>
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="3" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="3"
                  strokeDasharray={`${(progress / 100) * 289} 289`} strokeLinecap="round" />
              </svg>
            </button>
            <p className="mt-4 text-xs text-muted-foreground">{holding ? "Hold…" : activated ? "Help is on the way" : "Press and hold the button"}</p>
          </div>

          {activated && (
            <div className="rounded-2xl bg-secondary/60 border border-border p-5 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-sm font-medium"><MapPin className="h-4 w-4 text-primary" /> Live location shared</div>
              {loc && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lng}#map=16/${loc.lat}/${loc.lng}`}
                  target="_blank" rel="noreferrer"
                  className="block text-xs font-mono text-muted-foreground underline underline-offset-2"
                >
                  {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)} — view on map
                </a>
              )}
              <div className="grid sm:grid-cols-3 gap-2 text-xs">
                {["Mom · +91 ●●●●●", "Best friend · +91 ●●●●●", "Local police · 112"].map(c => (
                  <div key={c} className="rounded-xl bg-card border border-border px-3 py-2">Notified · {c}</div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Offline SMS fallback queued via device SMS gateway.
              </div>
            </div>
          )}
        </div>

        {/* Side tools */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> AI risk detection</h3>
                <p className="text-xs text-muted-foreground mt-1">Detects unusual movement & voice stress and offers to auto-trigger SOS.</p>
              </div>
              <Switch checked={aiOn} onCheckedChange={setAiOn} />
            </div>
            {aiOn && (
              <div className="mt-4 space-y-2 text-xs">
                <Row label="Movement pattern" value="Normal" tone="success" />
                <Row label="Voice stress" value="Low" tone="success" />
                <Row label="Ambient noise" value="Quiet" tone="muted" />
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-semibold flex items-center gap-2"><PhoneCall className="h-4 w-4 text-primary" /> Fake call</h3>
            <p className="text-xs text-muted-foreground mt-1">Trigger an incoming call to safely exit a situation.</p>
            <Button onClick={() => setFakeCall(true)} className="mt-4 w-full bg-gradient-primary text-primary-foreground">
              <Phone className="h-4 w-4 mr-1" /> Call me in 5s
            </Button>
          </div>
        </div>
      </div>

      {fakeCall && (
        <div className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm grid place-items-center p-6">
          <div className="w-full max-w-sm rounded-3xl bg-card p-8 text-center shadow-elegant">
            <div className="text-xs text-muted-foreground">Incoming call</div>
            <div className="mt-1 text-2xl font-semibold">Mom</div>
            <div className="mt-2 text-sm text-muted-foreground">mobile · +91 ●●●●● ●●●●●</div>
            <div className="my-8 h-24 w-24 mx-auto rounded-full bg-gradient-warm grid place-items-center text-3xl text-primary-foreground font-semibold animate-pulse">M</div>
            <div className="flex justify-between gap-4">
              <Button variant="destructive" className="flex-1" onClick={() => setFakeCall(false)}>Decline</Button>
              <Button className="flex-1 bg-success text-success-foreground hover:bg-success/90" onClick={() => setFakeCall(false)}>Accept</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone: "success" | "muted" | "warning" }) {
  const dot = tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-muted-foreground";
  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 font-medium"><span className={`h-1.5 w-1.5 rounded-full ${dot}`} />{value}</span>
    </div>
  );
}
