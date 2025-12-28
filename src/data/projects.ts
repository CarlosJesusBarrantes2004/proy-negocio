import urmotors from "../assets/urmotors.png";
import veterinaria from "../assets/veterinaria.png";
import pizzeria from "../assets/pizzeria.png";
import inmobiliaria from "../assets/inmobiliaria.png";
import grupoAses from "../assets/grupo-ases.png";

export const projects = [
  {
    title: "UR Motors",
    category: "web",
    description:
      "Sistema para la gestión de una tienda de venta de repuestos para motos.",
    tags: ["Django", "React"],
    image: urmotors,
    size: "large",
  },
  {
    title: "Veterinaria",
    category: "web",
    description: "Sistema para gestión de una veterinaria.",
    tags: ["Django", "React"],
    image: veterinaria,
    size: "medium",
  },
  {
    title: "Pizzeria",
    category: "web",
    description: "Aplicación Web para una pizzería.",
    tags: ["Django", "Next.js"],
    image: pizzeria,
    size: "medium",
  },
  {
    title: "Inmobiliaria",
    category: "web",
    description: "Landing Page para una Inmobiliaria.",
    tags: ["React"],
    image: inmobiliaria,
    size: "small",
  },
  {
    title: "Grupo Ases",
    category: "web",
    description: "Landing Page para una Empresa.",
    tags: ["Next.js"],
    image: grupoAses,
    size: "small",
  },
];
