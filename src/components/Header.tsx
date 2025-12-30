import { useState, useEffect, useCallback } from "react";
import { Code2 } from "lucide-react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleNavClick = useCallback((href: string) => {
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsMenuOpen(false);
    }
  }, []);

  const variantTop = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 8 },
  };
  const variantCenter = { closed: { opacity: 1 }, opened: { opacity: 0 } };
  const variantBottom = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -8 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 py-2 shadow-lg backdrop-blur-lg dark:bg-slate-950/80"
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <m.div
              whileHover={{ scale: 1.05 }}
              className="flex cursor-pointer items-center gap-2"
              style={{ willChange: "transform" }} // Optimización GPU
            >
              <div className="rounded-xl bg-blue-600 p-2 shadow-lg shadow-blue-200 dark:shadow-none">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Mambo<span className="text-blue-600">Dev</span>
              </span>
            </m.div>

            {/* Navegación Escritorio */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 transform bg-blue-600 transition-transform group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            {/* Botones */}
            <div className="hidden items-center gap-4 md:flex">
              <ThemeToggle />
              {/*<m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 dark:shadow-none"
              >
                Cotizar <Rocket className="h-4 w-4" />
              </m.button>*/}
            </div>

            {/* Menú Móvil Botón */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg bg-slate-100 hover:cursor-pointer dark:bg-slate-800"
              >
                <m.span
                  variants={variantTop}
                  animate={isMenuOpen ? "opened" : "closed"}
                  className="h-0.5 w-6 bg-slate-900 dark:bg-white"
                />
                <m.span
                  variants={variantCenter}
                  animate={isMenuOpen ? "opened" : "closed"}
                  className="h-0.5 w-6 bg-slate-900 dark:bg-white"
                />
                <m.span
                  variants={variantBottom}
                  animate={isMenuOpen ? "opened" : "closed"}
                  className="h-0.5 w-6 bg-slate-900 dark:bg-white"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`overflow-hidden border-b md:hidden ${
              scrolled
              ? "bg-transparent"
              : "border-slate-200 bg-white/5 dark:border-slate-800 dark:bg-slate-950/5 backdrop-blur-lg"
            }`}
            >
              <nav className="flex flex-col gap-2 p-6">
                {navItems.map((item, i) => (
                  <m.a
                    key={item.label}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      // 1. Cerramos el menú primero
                      setIsMenuOpen(false);
                      
                      // 2. SOLUCIÓN DEL SCROLL:
                      // Esperamos 100ms a que React comience a cerrar el menú,
                      // y ENTONCES disparamos el scroll. Esto evita que se cancele.
                        setTimeout(() => {
                          handleNavClick(item.href);
                       }, 100);
                      }
                    }
                    className="block w-full rounded-lg py-3 text-lg font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {item.label}
                  </m.a>
                ))}
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
