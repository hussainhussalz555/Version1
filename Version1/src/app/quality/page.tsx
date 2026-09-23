import { qualityStatements } from "@/lib/site-config";

export default function QualityPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">Quality</p>
      <h1 className="mt-3 text-4xl">Built for Confidence and Daily Reliability</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {qualityStatements.map((item) => (
          <article key={item.title} className="border border-black/10 bg-white p-6">
            <h2 className="text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">{item.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
