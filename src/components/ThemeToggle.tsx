import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:cursor-pointer ${
        theme === "light"
          ? "border-blue-100 bg-blue-50/50 text-blue-600 shadow-sm hover:bg-blue-100"
          : "border-slate-800 bg-slate-900 text-yellow-400 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      } `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ y: 10, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 10, opacity: 0, rotate: 40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: -40 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5 fill-yellow-400/20" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Cambiar tema</span>
    </motion.button>
  );
}
