import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, BadgeCheck, Heart, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_layout/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Career & Opportunity Hub — SheShield" },
      { name: "description", content: "Verified jobs, internships, mentorship and women-friendly companies." },
    ],
  }),
});

const jobs = [
  { title: "Frontend Engineer", company: "Atlassian", location: "Bengaluru · Remote", tags: ["Remote", "Returnee-friendly"], badge: "Verified" },
  { title: "UX Designer (Internship)", company: "Zoho", location: "Chennai · Hybrid", tags: ["Internship", "Mentorship"], badge: "Verified" },
  { title: "Product Marketing Lead", company: "Razorpay", location: "Remote · India", tags: ["Remote", "Flex hours"], badge: "Verified" },
  { title: "Data Analyst", company: "Swiggy", location: "Bengaluru", tags: ["Women-friendly"], badge: "Verified" },
  { title: "Content Strategist", company: "Nykaa", location: "Mumbai · Hybrid", tags: ["Returnee-friendly"], badge: "Verified" },
  { title: "Backend Engineer", company: "Postman", location: "Remote", tags: ["Remote", "Mentorship"], badge: "Verified" },
];

const filters = ["All", "Remote", "Internship", "Mentorship", "Returnee-friendly", "Women-friendly"];

function CareersPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const results = useMemo(() => jobs.filter(j =>
    (filter === "All" || j.tags.includes(filter)) &&
    (q === "" || (j.title + j.company).toLowerCase().includes(q.toLowerCase()))
  ), [q, filter]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="text-sm text-primary font-medium">Module 2</div>
        <h1 className="text-4xl font-semibold">Career & Opportunity Hub</h1>
        <p className="text-muted-foreground max-w-2xl">Curated, verified roles. Mentors who've been there. Companies that walk the talk.</p>
      </header>

      <div className="rounded-2xl bg-card border border-border p-4 shadow-soft flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search role, company…" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/70"
              }`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {results.map((j, i) => (
          <article key={i} className="rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{j.title}</h3>
                <p className="text-sm text-muted-foreground">{j.company}</p>
              </div>
              <Badge className="bg-success/15 text-success hover:bg-success/15"><BadgeCheck className="h-3 w-3 mr-1" />{j.badge}</Badge>
            </div>
            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{j.location}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {j.tags.map(t => <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>)}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button className="text-muted-foreground hover:text-primary"><Heart className="h-4 w-4" /></button>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground">Apply</Button>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-3xl bg-gradient-soft border border-border p-8 shadow-soft">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center"><Users className="h-6 w-6 text-primary-foreground" /></div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Find a mentor</h2>
            <p className="text-muted-foreground mt-1">We match you with experienced women in tech, design, finance and more — based on goals and stage.</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">Get matched</Button>
        </div>
      </section>
    </div>
  );
}
