import * as React from "react";
// Importa la utilidad para combinar y resolver clases de Tailwind
import { cn } from "../../lib/utils";

// --- 1. Definición de Estilos ---
// Nota: Las clases deben reflejar tu configuración de Tailwind (colores primario, secundario, etc.)

const buttonVariants = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

// --- 2. Tipos de Props ---
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  // asChild se utiliza para forzar que el componente renderice su hijo,
  // útil para envolver enlaces <a> o componentes de router.
  asChild?: boolean;
}

// --- 3. El Componente Button ---
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    // Por defecto renderiza un botón
    // Si usas asChild, podrías querer usar un componente wrapper (como Slot de Radix)
    const Comp = asChild ? "div" : "button";

    return (
      <Comp
        className={cn(
          // Clases base para todos los botones
          "focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          // Clases para el estilo (variant)
          buttonVariants[variant],
          // Clases para el tamaño (size)
          buttonSizes[size],
          // Clases personalizadas que anulan las anteriores (className)
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
