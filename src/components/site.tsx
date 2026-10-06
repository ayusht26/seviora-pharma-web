import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/seviora-logo.jpg.asset.json";

export const CONTACT = {
  email: "info@seviorapharma.com",
  phone: "+91 94529 48453",
  phoneHref: "+919452948453",
  city: "Lucknow, Uttar Pradesh",
};

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Logo({ className = "" }: { className?: string }) {
  return <img src={logo.url} alt="Seviora Pharma Private Limited" className={`object-cover mix-blend-multiply ${className}`} />;
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Our Products" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 shadow-soft backdrop-blur-md" : "bg-background"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo className="h-16 w-36 object-[50%_45%] [object-fit:cover] scale-[1.35]" />
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="group relative py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-foreground" }}>
              {({ isActive }) => (<>
                {n.label}
                <span className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-gradient-brand transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </>)}
            </Link>
          ))}
          <Link to="/contact" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft">Enquire now</Link>
        </nav>
        <button aria-label="Menu" className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className={`h-0.5 w-6 bg-foreground transition ${open ? "translate-y-1 rotate-45" : ""}`} />
          <div className={`mt-1.5 h-0.5 w-6 bg-foreground transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>
      <div className={`overflow-hidden border-t md:hidden transition-[max-height] duration-500 ${open ? "max-h-72" : "max-h-0 border-transparent"}`}>
        <div className="flex flex-col px-6 py-4">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-display text-lg">{n.label}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-block overflow-hidden rounded-xl bg-card">
            <Logo className="h-24 w-56 scale-[1.25]" />
          </div>
          <p className="mt-6 max-w-sm text-sm text-deep-foreground/70">
            A trusted pharmaceutical company delivering quality medicines, medical goods and solutions to healthcare providers.
          </p>
          <span className="mt-5 inline-block rounded-full border border-deep-foreground/20 px-4 py-1.5 text-xs tracking-wide text-deep-foreground/80">ISO 9001:2015 Certified Company</span>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-deep-foreground/50">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="text-deep-foreground/80 transition hover:text-brand-green">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-deep-foreground/50">Reach us</h4>
          <ul className="space-y-2.5 text-sm text-deep-foreground/80">
            <li>{CONTACT.city}</li>
            <li><a href={`tel:${CONTACT.phoneHref}`} className="hover:text-brand-green">{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-brand-green">{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-deep-foreground/10 px-6 py-6 text-xs text-deep-foreground/50">
        <span>© {new Date().getFullYear()} Seviora Pharma Private Limited. All rights reserved.</span>
        <span>seviorapharma.com</span>
      </div>
    </footer>
  );
}

export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <section className="relative overflow-hidden border-b bg-secondary/60">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <p className="overflow-hidden text-xs font-semibold uppercase tracking-[0.2em] text-primary"><span className="rise">{eyebrow}</span></p>
        <h1 className="mt-4 overflow-hidden text-4xl font-semibold md:text-6xl"><span className="rise" style={{ animationDelay: "100ms" }}>{title}</span></h1>
        <p className="rise mt-5 max-w-2xl text-muted-foreground" style={{ animationDelay: "250ms" }}>{lede}</p>
      </div>
    </section>
  );
}
