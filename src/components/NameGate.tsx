import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const KEY = "sheshield.name";

export function useUserName() {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    setName(localStorage.getItem(KEY));
  }, []);
  return {
    name,
    setName: (n: string) => {
      localStorage.setItem(KEY, n);
      setName(n);
    },
    clear: () => {
      localStorage.removeItem(KEY);
      setName(null);
    },
  };
}

export function NameGate({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const { name, setName } = useUserName();
  const [input, setInput] = useState("");

  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;
  if (name) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-hero p-6">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-elegant">
        <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-soft">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-5 text-3xl font-semibold">Welcome to SheShield</h1>
        <p className="mt-2 text-muted-foreground">What should we call you?</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const v = input.trim();
            if (v.length >= 2) setName(v);
          }}
          className="mt-6 space-y-3"
        >
          <Input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your first name"
            maxLength={40}
          />
          <Button
            type="submit"
            disabled={input.trim().length < 2}
            className="w-full bg-gradient-primary text-primary-foreground"
          >
            Continue
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            Stored privately on your device. No account needed for the demo.
          </p>
        </form>
      </div>
    </div>
  );
}
