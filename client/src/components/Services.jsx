export default function Services(){
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="text-[clamp(24px,2.6vw,36px)] font-bold mb-6">Services</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="card"><h3 className="font-semibold mb-1">Website Building & Hosting</h3><p className="text-muted">Fast, secure, and responsive websites with modern stacks.</p></article>
          <article className="card"><h3 className="font-semibold mb-1">Social Media Handling</h3><p className="text-muted">Planning, design, scheduling, analytics across major platforms.</p></article>
          <article className="card"><h3 className="font-semibold mb-1">Digital Marketing</h3><p className="text-muted">SEO, ads, funnels — measurable ROI.</p></article>
        </div>
      </div>
    </section>
  )
}


