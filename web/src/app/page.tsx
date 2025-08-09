export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Icelandic Portfolio Tracker</h1>
          <a
            href="https://data.nasdaq.com"
            className="text-sm text-blue-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            NASDAQ Data Link
          </a>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium">Your Portfolio</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Add positions and view performance. Phase 2 will add charts and metrics.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium">Market Snapshot</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Icelandic quotes via NASDAQ Data Link REST (15m delayed) coming next.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
