import { useState, useEffect } from "react";
import { Code2, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variantes para las líneas del menú hamburguesa
  const variantTop = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 8 },
  };
  const variantCenter = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const variantBottom = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -8 },
  };

  const handleNavClick = (href) => {
    // 1. Obtenemos el ID de la sección (quitando el #)
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      // 2. Realizamos el desplazamiento suave
      elem.scrollIntoView({ behavior: "smooth" });

      // 3. Esperamos un momento a que el desplazamiento inicie/termine y cerramos
      // Esto asegura que la animación de Framer Motion no choque con el scroll
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500); // 500ms es suficiente para que el scroll esté en camino o terminado
    } else {
      // Si no encuentra el elemento (por si acaso), cerramos igual
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 py-2 shadow-lg backdrop-blur-lg dark:bg-slate-950/80"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex cursor-pointer items-center gap-2"
          >
            <div className="rounded-xl bg-blue-600 p-2 shadow-lg shadow-blue-200 dark:shadow-none">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Mambo<span className="text-blue-600">Dev</span>
            </span>
          </motion.div>

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 dark:shadow-none"
            >
              Cotizar <Rocket className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Menú Móvil Botón (Hamburguesa Animada) */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg bg-slate-100 hover:cursor-pointer dark:bg-slate-800"
            >
              <motion.span
                variants={variantTop}
                animate={isMenuOpen ? "opened" : "closed"}
                className="h-0.5 w-6 bg-slate-900 dark:bg-white"
              />
              <motion.span
                variants={variantCenter}
                animate={isMenuOpen ? "opened" : "closed"}
                className="h-0.5 w-6 bg-slate-900 dark:bg-white"
              />
              <motion.span
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <nav className="flex flex-col gap-2 p-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault(); // Bloqueamos el salto brusco nativo
                    handleNavClick(item.href); // Ejecutamos nuestra lógica
                  }}
                  className="block w-full cursor-pointer rounded-lg py-3 text-lg font-semibold text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full rounded-xl bg-blue-600 p-4 font-bold text-white shadow-lg shadow-blue-100 hover:cursor-pointer dark:shadow-none"
              >
                Cotizar Proyecto
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
