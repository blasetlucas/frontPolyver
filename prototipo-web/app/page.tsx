export default function Home() {
  return (
    <main className="site-shell">
      <iframe
        className="prototype-frame"
        src="/prototype/index.html"
        title="Prototipo interactivo de Polyver"
        allow="geolocation; clipboard-read; clipboard-write"
      />
    </main>
  );
}
