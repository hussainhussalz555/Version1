export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">About</p>
      <h1 className="mt-3 text-4xl">A Premium Bathroom Brand with Architectural Intent</h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-black/75">
        <p>
          BATHAE focuses on modern ceramics and bathroom fixtures with clean geometry, controlled detailing, and a restrained luxury aesthetic.
        </p>
        <p>
          Our product direction is built around practical elegance: finishes that remain timeless, fittings that integrate cleanly into contemporary spaces, and components selected for long-term day-to-day performance.
        </p>
        <p>
          This website is structured to scale: products, inventory logic, and checkout flow are all ready for backend and payment gateway integration in future phases.
        </p>
      </div>
    </main>
  );
}
