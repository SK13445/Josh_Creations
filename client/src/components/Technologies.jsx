export default function Technologies() {
  const items = [
    "MERN Stack",
    "React",
    "JavaScript (ES202x)",
    "Node.js & Express",
    "MongoDB",
    "Tailwind / CSS Modules",
    "Git & GitHub",
    "BitBucket",
    "",
  ];
  return (
    <section id="tech" className="section">
      <div className="container">
        <h2 className="text-[clamp(24px,2.6vw,36px)] font-bold mb-6">
          Technologies
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((x) => (
            <div
              key={x}
              className="bg-panel border border-border rounded-xl p-4 text-muted"
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
