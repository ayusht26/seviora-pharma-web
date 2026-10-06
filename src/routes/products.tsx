import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHead, Reveal } from "@/components/site";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Products — Seviora Pharma" },
      { name: "description", content: "Browse Seviora Pharma's range of pharmaceuticals, nutraceuticals, medical consumables and diagnostics." },
      { property: "og:title", content: "Our Products — Seviora Pharma" },
      { property: "og:description", content: "Pharmaceuticals, nutraceuticals, consumables and diagnostics for healthcare providers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

function Products() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => PRODUCTS.filter((p) =>
    (cat === "All" || p.cat === cat) &&
    (p.name + p.generic).toLowerCase().includes(q.toLowerCase())), [cat, q]);

  return (
    <>
      <PageHead eyebrow="Seviora Pharma · Catalogue" title="Our Products" lede="A selection from our catalogue. Compositions and pack details are listed for healthcare professionals — full documentation is available on request." />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>{c}</button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…"
            className="w-full rounded-full border bg-card px-5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 md:w-72" />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Showing {list.length} of {PRODUCTS.length} products</p>
        <div key={cat + q} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <div key={p.name} className="rise group rounded-2xl border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft" style={{ animationDelay: `${Math.min(i, 9) * 50}ms` }}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.cat}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${p.tag === "Rx" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>{p.tag}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.generic}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
                <div><dt className="text-xs text-muted-foreground">Form</dt><dd className="mt-0.5 font-medium">{p.form}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Pack</dt><dd className="mt-0.5 font-medium">{p.pack}</dd></div>
              </dl>
            </div>
          ))}
          {list.length === 0 && <p className="col-span-full py-16 text-center text-muted-foreground">No products match your search.</p>}
        </div>
        <Reveal className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border bg-secondary/60 p-8">
            <div>
              <h3 className="text-xl font-semibold">Need the full catalogue?</h3>
              <p className="mt-1 text-muted-foreground">Ask us for our complete product list, pricing and documentation.</p>
            </div>
            <Link to="/contact" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-soft">Request catalogue</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
