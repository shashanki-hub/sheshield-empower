import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, Scale, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_layout/assistant")({
  component: AssistantPage,
  head: () => ({
    meta: [
      { title: "AI Support Assistant — SheShield" },
      { name: "description", content: "Legal, harassment & mental health guidance for women in India." },
    ],
  }),
});

type Msg = { role: "user" | "bot"; text: string };

const starters = [
  { icon: Scale, label: "Workplace harassment — what are my rights?" },
  { icon: Heart, label: "I'm feeling overwhelmed, what can I do?" },
  { icon: MapPin, label: "Helplines for women in India" },
];

function reply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("harass") || t.includes("workplace")) {
    return "Under India's POSH Act 2013, every workplace with 10+ employees must have an Internal Complaints Committee (ICC). You can file a written complaint within 3 months. I can help you draft it. You're not alone — and the law is on your side.";
  }
  if (t.includes("overwhelm") || t.includes("anxious") || t.includes("stress") || t.includes("sad")) {
    return "I hear you. Try a 4-7-8 breath: inhale 4s, hold 7s, exhale 8s — repeat 4 times. If feelings persist, iCall (9152987821) offers free, confidential counselling in India.";
  }
  if (t.includes("helpline") || t.includes("emergency") || t.includes("number")) {
    return "Key India helplines:\n• Women Helpline: 1091\n• Police: 112\n• Domestic Abuse: 181\n• iCall (mental health): 9152987821";
  }
  return "I'm here for you. Could you share a bit more about what's happening? I can guide on legal rights, safety, or emotional wellbeing.";
}

function AssistantPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi 👋 I'm Shea, your AI companion. Ask me about safety, legal rights, or how you're feeling today." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMsgs(m => [...m, { role: "bot", text: reply(text) }]), 500);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-sm text-primary font-medium">Module 4</div>
        <h1 className="text-4xl font-semibold">AI Support Assistant</h1>
        <p className="text-muted-foreground max-w-2xl">Confidential guidance on legal rights, harassment and mental wellbeing — tailored to India.</p>
      </header>

      <div className="rounded-3xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="p-4 border-b border-border bg-gradient-soft flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center"><Sparkles className="h-4 w-4 text-primary-foreground" /></div>
          <div>
            <div className="font-semibold leading-tight">Shea</div>
            <div className="text-xs text-muted-foreground">Private · Demo responses</div>
          </div>
        </div>

        <div className="h-[420px] overflow-y-auto p-5 space-y-3 bg-background/40">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                m.role === "user" ? "bg-gradient-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex flex-wrap gap-2">
            {starters.map(s => (
              <button key={s.label} onClick={() => send(s.label)}
                className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/70 transition-colors">
                <s.icon className="h-3.5 w-3.5 text-primary" />{s.label}
              </button>
            ))}
          </div>
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything…" />
            <Button type="submit" className="bg-gradient-primary text-primary-foreground"><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </div>
    </div>
  );
}
