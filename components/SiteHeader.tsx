const navItems = [
  { href: "#biotopo", label: "Biotopo" },
  { href: "#quetzal", label: "Quetzal" },
  { href: "#senderos", label: "Senderos" },
  { href: "#visita", label: "Visita" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Inicio Biotopo del Quetzal">
        <span className="brand-mark" aria-hidden="true">
          BQ
        </span>
        <span>Biotopo del Quetzal</span>
      </a>
      <nav className="site-nav" aria-label="Navegacion principal">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
