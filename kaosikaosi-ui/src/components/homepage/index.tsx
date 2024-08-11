
export function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="hero min-h-96 bg-miku-hero">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">热爱</h1>
            <section className="space-y-2">
              <p>任何人都可以 cosplay</p>
              <p className="text-sm">没有网络小警察</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
