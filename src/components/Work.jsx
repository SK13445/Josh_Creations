import { useEffect, useState } from 'react'
import { getProjects } from '../api.js'

export default function Work(){
  const [projects, setProjects] = useState([])
  useEffect(() => {
    getProjects().then(d => setProjects(d.projects || [])).catch(() => setProjects([]))
  }, [])
  return (
    <section id="work" className="section">
      <div className="container">
        <h2 className="text-[clamp(24px,2.6vw,36px)] font-bold mb-6">Selected Work</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map(p => (
            <a key={p._id} className="block bg-panel border border-border rounded-[14px] overflow-hidden hover:-translate-y-0.5 transition" href={p.url || '#'}>
              <div className="h-40 bg-[linear-gradient(120deg,rgba(139,91,255,0.35),rgba(91,140,255,0.35)),repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_10px,rgba(255,255,255,0.02)_10px_20px)]"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-muted text-sm">{p.description}</p>
              </div>
            </a>
          ))}
          {projects.length === 0 && (
            <div className="card">No projects yet. Add some in MongoDB <code>projects</code> collection.</div>
          )}
        </div>
      </div>
    </section>
  )
}


