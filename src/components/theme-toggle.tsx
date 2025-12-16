// Ya no se requiere "use client" si lo manejas en Astro
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";

// Si ThemeProvider está en src/providers/ThemeProvider.tsx, la ruta debe ser algo como la anterior.

export function ThemeToggle() {
  // 1. Hook de React
  const { resolvedTheme, setTheme } = useTheme();

  return (
    // 2. Evento onClick de React
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambiar tema"
      className="relative"
    >
      {/* 3. Renderizado condicional basado en estado de React */}
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
