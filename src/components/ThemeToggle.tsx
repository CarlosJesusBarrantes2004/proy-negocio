import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  // 1. Estado para saber si ya estamos en el cliente
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light"); // O tu valor por defecto

  // 2. useEffect solo corre en el cliente
  useEffect(() => {
    // Leemos el tema real del localStorage o del HTML
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    
    // Marcamos que ya estamos montados
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Actualizamos el DOM y localStorage manualmente
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // 3. LA CLAVE: Si no está montado, renderizamos un "esqueleto" o nada.
  // Esto evita que el servidor envíe un icono que luego choque con el cliente.
  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-transparent opacity-50 dark:border-slate-800">
        {/* Renderiza un espacio vacío o un spinner invisible para mantener el tamaño */}
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-500/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/50"
      aria-label="Cambiar tema"
    >
      {/* Animación suave entre iconos */}
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-5 w-5 fill-yellow-400/20 text-yellow-400" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-5 w-5 fill-orange-400/20 text-orange-500" />
      </motion.div>
    </motion.button>
  );
}
