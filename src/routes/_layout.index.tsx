import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Briefcase, Wallet, Sparkles, Megaphone, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_layout/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "SheShield — Safety, Career & Financial Independence for Women" },
      { name: "description", content: "SheShield empowers women with one-tap SOS safety, verified careers, financial independence tools, and an AI legal & wellness assistant." },
    ],
  }),
});

const features = [
  { to: "/safety", icon: Shield, title: "Smart Safety", desc: "One-tap SOS, live location, fake call & offline SMS alerts.", tone: "from-rose-500/10 to-rose-500/0" },
  { to: "/careers", icon: Briefcase, title: "Career Hub", desc: "Verified jobs, mentorship & women-friendly companies.", tone: "from-amber-500/10 to-amber-500/0" },
  { to: "/finance", icon: Wallet, title: "Financial Freedom", desc: "Budgets, savings goals & beginner investment guidance.", tone: "from-emerald-500/10 to-emerald-500/0" },
  { to: "/assistant", icon: Sparkles, title: "AI Assistant", desc: "Legal, harassment & mental health support — India focused.", tone: "from-fuchsia-500/10 to-fuchsia-500/0" },
  { to: "/creator", icon: Megaphone, title: "Creator Suite", desc: "Track collabs, payments & detect scam brand offers.", tone: "from-sky-500/10 to-sky-500/0" },
];

function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center pt-4">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Built for women, by design
          </span>
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05]">
            Safer days. <span className="text-gradient">Bolder futures.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            SheShield is your all-in-one companion for personal safety, career growth, financial independence and trusted AI guidance.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-elegant">
              <Link to="/safety">Try SOS demo <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/careers">Explore opportunities</Link>
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground pt-2">
            {["Free to start", "Privacy-first", "Works offline (SOS)"].map(t => (
              <li key={t} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" />{t}</li>
            ))}
          </ul>
        </div>

        {/* Phone mock */}
        <div className="relative mx-auto">
          <div className="absolute -inset-10 bg-gradient-warm opacity-20 blur-3xl rounded-full" />
          <div className="relative w-[280px] h-[560px] rounded-[3rem] bg-card border border-border shadow-elegant p-3">
            <div className="h-full w-full rounded-[2.4rem] bg-gradient-soft p-5 flex flex-col">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>9:41</span><span>SheShield</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="text-sm text-muted-foreground">Good morning, Aanya</div>
                <h3 className="text-2xl font-semibold leading-tight">You're protected today.</h3>
              </div>
              <div className="mt-8 grid place-items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-pulse-ring" />
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-destructive to-primary grid place-items-center text-primary-foreground font-semibold shadow-elegant">
                    SOS
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">Hold to alert trusted contacts</p>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-2 text-[10px]">
                {["Fake Call", "Share Live", "Safe Route"].map(x => (
                  <div key={x} className="rounded-xl bg-card border border-border py-2 text-center">{x}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">Everything she needs, in one place</h2>
            <p className="text-muted-foreground mt-1">Five integrated modules built for real-world impact.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <Link
              key={f.to}
              to={f.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-0.5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.tone} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-soft">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Open <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pitch */}
      <section className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-soft">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Problem</div>
            <p className="mt-2 text-foreground">
              Women face fragmented tools for safety, career, money and mental wellbeing — often unsafe, biased, or hard to trust.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Solution</div>
            <p className="mt-2 text-foreground">
              SheShield unifies safety, opportunities, finances and AI legal/mental support in a private, mobile-first platform.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Impact</div>
            <p className="mt-2 text-foreground">
              Faster help in emergencies, equitable access to careers, scam-resistant earnings and confident financial futures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
