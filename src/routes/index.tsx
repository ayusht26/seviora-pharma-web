import { createFileRoute, Link } from "@tanstack/react-router";
import { Counter, Reveal } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seviora Pharma — Quality Medicines & Medical Supplies, Lucknow" },
      { name: "description", content: "Seviora Pharma is a trusted Lucknow-based pharmaceutical company delivering quality medicines, medical goods and solutions to healthcare providers." },
      { property: "og:title", content: "Seviora Pharma — Trusted Pharmaceutical Partner" },
      { property: "og:description", content: "Quality medicines, medical goods and solutions for healthcare providers, from Lucknow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const divisions = [
  { t: "Pharmaceutical Formulations", d: "Branded generics and ethical formulations across key therapeutic segments, with full batch documentation.", tags: ["Antibiotics", "Cardiology", "Gastro", "Diabetes"] },
  { t: "Medical Consumables", d: "Everyday essentials — gloves, syringes, masks, IV cannulae and PPE — kept in steady supply.", tags: ["Gloves", "Syringes", "Masks", "PPE"] },
  { t: "Devices & Diagnostics", d: "Reliable devices and rapid diagnostics for clinics, nursing homes and pathology labs.", tags: ["Glucometers", "Oximeters", "Rapid tests"] },
  { t: "Institutional Supply", d: "Scheduled replenishment and dedicated support for hospitals and healthcare institutions.", tags: ["Bulk orders", "Scheduled supply"] },
];

const commitments = [
  { t: "Quality assured", d: "Every product is sourced from verified manufacturers and checked before dispatch." },
  { t: "ISO 9001:2015 certified", d: "Our processes follow internationally recognised quality management standards." },
  { t: "Dependable supply", d: "Planned inventory so healthcare providers are never left waiting on essentials." },
  { t: "Documentation ready", d: "Licences, certificates and invoices travel with every consignment." },
];

const marquee = ["ISO 9001:2015 Certified", "Quality Medicines", "Medical Consumables", "Diagnostics", "Institutional Supply", "Based in Lucknow"];

function Molecule() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-blue)" />
          <stop offset=".5" stopColor="var(--brand-teal)" />
          <stop offset="1" stopColor="var(--brand-green)" />
        </linearGradient>
      </defs>
      <g className="orbit">
        <circle cx="200" cy="200" r="170" fill="none" stroke="var(--border)" strokeDasharray="2 8" />
      </g>
      <circle cx="200" cy="200" r="120" fill="none" stroke="var(--border)" />
      <g stroke="url(#g)" strokeWidth="10" strokeLinecap="round" fill="none">
        <path className="draw" d="M200 200 L120 110" />
        <path className="draw" d="M200 200 L285 115" />
        <path className="draw" d="M200 200 L125 290" />
        <path className="draw" d="M200 200 L280 290" />
      </g>
      <circle cx="200" cy="200" r="52" fill="var(--card)" stroke="url(#g)" strokeWidth="12" />
      <g className="floaty">
        <circle cx="120" cy="110" r="28" fill="var(--brand-blue)" />
        <circle cx="285" cy="115" r="26" fill="var(--brand-teal)" />
      </g>
      <g className="floaty" style={{ animationDelay: "-3s" }}>
        <circle cx="125" cy="290" r="26" fill="var(--brand-green)" opacity=".75" />
        <circle cx="280" cy="290" r="24" fill="var(--brand-green)" />
      </g>
    </svg>
  );
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-green/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.15fr_1fr] md:pt-24">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> ISO 9001:2015 Certified · Lucknow
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] md:text-6xl">
              {["Quality medicines.", "Reliable supply.", "Trusted care."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-1">
                  <span className={`rise ${i === 2 ? "text-gradient" : ""}`} style={{ animationDelay: `${150 + i * 130}ms` }}>{l}</span>
                </span>
              ))}
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "600ms" }}>
              Seviora Pharma is a trusted pharmaceutical company delivering quality medicines, medical goods and solutions to healthcare providers.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "750ms" }}>
              <Link to="/products" className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft">Explore products</Link>
              <Link to="/contact" className="rounded-full border bg-card px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-primary">Talk to our team</Link>
            </div>
          </div>
          <div className="rise mx-auto aspect-square w-full max-w-md" style={{ animationDelay: "300ms" }}>
            <Molecule />
          </div>
        </div>
        <div className="border-y bg-card py-5 overflow-hidden">
          <div className="marquee flex w-max">
            {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-8 px-8 text-sm font-medium text-muted-foreground whitespace-nowrap">
                {m}<span className="h-1 w-1 rounded-full bg-brand-teal" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What we supply</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold md:text-5xl">Four divisions, one standard of quality.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {divisions.map((d, i) => (
            <Reveal key={d.t} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-700 group-hover:scale-x-100" />
                <span className="text-sm font-medium text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{d.t}</h3>
                <p className="mt-3 text-muted-foreground">{d.d}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {d.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Why Seviora</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Why healthcare providers trust us.</h2>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div><div className="font-display text-5xl font-semibold text-brand-green"><Counter to={100} suffix="%" /></div><p className="mt-2 text-sm text-deep-foreground/60">Commitment to quality</p></div>
              <div><div className="font-display text-5xl font-semibold text-brand-green"><Counter to={4} /></div><p className="mt-2 text-sm text-deep-foreground/60">Product divisions</p></div>
            </div>
          </Reveal>
          <div className="space-y-2">
            {commitments.map((c, i) => (
              <Reveal key={c.t} delay={i * 100}>
                <div className="flex gap-5 border-t border-deep-foreground/10 py-6">
                  <span className="text-xs font-semibold text-brand-green">0{i + 1}</span>
                  <div><h3 className="font-sans text-lg font-semibold tracking-normal">{c.t}</h3><p className="mt-1 text-sm text-deep-foreground/65">{c.d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 text-primary-foreground md:p-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-primary-foreground/10" />
            <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">Looking for a dependable pharmaceutical supply partner?</h2>
            <p className="mt-4 max-w-xl text-primary-foreground/85">Send us an enquiry about products, pricing or partnerships — our team will get back to you promptly.</p>
            <Link to="/contact" className="mt-8 inline-block rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5">Contact us</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
