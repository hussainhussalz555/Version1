"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">Contact</p>
      <h1 className="mt-3 text-4xl">Let’s Plan Your Bathroom Project</h1>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-3 text-sm text-black/75">
          <p>{siteConfig.supportEmail}</p>
          <p>{siteConfig.supportPhone}</p>
          <p>{siteConfig.address}</p>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block border border-black/20 px-4 py-2"
          >
            Chat on WhatsApp
          </a>
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="grid gap-3 border border-black/10 bg-white p-5"
        >
          <input required placeholder="Name" className="border border-black/20 px-3 py-2 text-sm" />
          <input required placeholder="Email" type="email" className="border border-black/20 px-3 py-2 text-sm" />
          <input placeholder="Phone" className="border border-black/20 px-3 py-2 text-sm" />
          <textarea required placeholder="Tell us about your requirements" className="min-h-28 border border-black/20 px-3 py-2 text-sm" />
          <button className="bg-black px-4 py-3 text-sm text-white">Send Inquiry</button>
          {submitted && <p className="text-sm text-emerald-700">Thanks — we’ll get back to you shortly.</p>}
        </form>
      </div>
    </main>
  );
}
