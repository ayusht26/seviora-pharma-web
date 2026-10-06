import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CONTACT, PageHead, Reveal } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Seviora Pharma, Lucknow" },
      { name: "description", content: "Get in touch with Seviora Pharma in Lucknow for product enquiries, catalogues and partnerships. Email info@seviorapharma.com." },
      { property: "og:title", content: "Contact Seviora Pharma" },
      { property: "og:description", content: "Product enquiries, catalogue requests and partnerships — reach our Lucknow team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field = "mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nOrganisation: ${f.get("org")}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(String(f.get("subject")))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const info = [
    { k: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { k: "Phone", v: CONTACT.phone, href: `tel:${CONTACT.phoneHref}` },
    { k: "Location", v: CONTACT.city },
    { k: "Certification", v: "ISO 9001:2015 Certified Company" },
  ];
  return (
    <>
      <PageHead eyebrow="Seviora Pharma · Lucknow" title="Contact Us" lede="Tell us what you need — product pricing, a catalogue, or a partnership conversation. We'll get back to you promptly." />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {info.map((i, n) => (
            <Reveal key={i.k} delay={n * 80}>
              <div className="rounded-2xl border bg-card p-6 transition hover:shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{i.k}</p>
                {i.href ? <a href={i.href} className="mt-1.5 block text-lg font-medium text-primary hover:underline">{i.v}</a> : <p className="mt-1.5 text-lg font-medium">{i.v}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <div className="rounded-2xl border bg-card p-8 shadow-soft md:p-10">
            {sent ? (
              <div className="rise py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-2xl text-primary-foreground">✓</div>
                <h2 className="mt-6 text-2xl font-semibold">Thank you!</h2>
                <p className="mt-2 text-muted-foreground">Your email app should open with your message. You can also write to us directly at {CONTACT.email}.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-primary hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <h2 className="text-2xl font-semibold sm:col-span-2">Send an enquiry</h2>
                <label className="text-sm font-medium">Full name *<input required name="name" className={field} /></label>
                <label className="text-sm font-medium">Organisation<input name="org" className={field} /></label>
                <label className="text-sm font-medium">Email *<input required type="email" name="email" className={field} /></label>
                <label className="text-sm font-medium">Phone *<input required type="tel" name="phone" className={field} /></label>
                <label className="text-sm font-medium sm:col-span-2">Subject
                  <select name="subject" className={field}>
                    <option>General enquiry</option><option>Product enquiry</option><option>Catalogue request</option><option>Distribution partnership</option>
                  </select>
                </label>
                <label className="text-sm font-medium sm:col-span-2">Message *<textarea required name="message" rows={5} className={field} /></label>
                <button className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft sm:col-span-2 sm:justify-self-start">Send enquiry</button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
