export default function Header(){
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-[4%] py-3 bg-black/60 backdrop-blur border-b border-border">
      <a className="inline-flex items-center gap-2 text-text" href="#home"><span className="font-bold">Josh Creations</span></a>
      <nav className="hidden md:flex items-center gap-4">
        <a className="text-muted hover:text-text" href="#services">Services</a>
        <a className="text-muted hover:text-text" href="#tech">Technologies</a>
        <a className="text-muted hover:text-text" href="#work">Work</a>
        <a href="#contact" className="btn btn-primary">Contact</a>
      </nav>
    </header>
  )
}


