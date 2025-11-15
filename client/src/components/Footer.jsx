export default function Footer() {
  return (
    <footer className="border-t border-border py-8 bg-black/20">
      <div className="container text-muted text-sm">
        © {new Date().getFullYear()} Josh Creations. All rights reserved.
        <a href="/admin" className="ml-2 text-gray-400 hover:text-white">
          Admin
        </a>
      </div>
    </footer>
  );
}
