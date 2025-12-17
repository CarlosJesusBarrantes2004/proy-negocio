import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="text-primary h-8 w-8" />
            <span className="text-foreground text-xl font-bold">DevStudio</span>
          </div>

          {/* Navegación de Escritorio */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botones de Escritorio */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            {/**
             * <Button variant="ghost" size="sm" className="hover:cursor-pointer">
              Iniciar Sesión
            </Button>
            <Button size="sm">Cotizar Proyecto</Button>
             */}
          </div>

          {/* Menú Móvil (Botón y Toggle) */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle></ThemeToggle>
            <button
              className="text-foreground p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        {isMenuOpen && (
          <div className="border-border border-t py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {/**
               * <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
                <Button size="sm">Cotizar Proyecto</Button>
              </div>
               * 
               */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
