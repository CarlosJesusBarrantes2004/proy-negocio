import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from "next-themes";
import * as React from "react"; // Asegúrate de importar React

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Nota: Mantenemos la lógica de next-themes intacta
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export { useTheme };
