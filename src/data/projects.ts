import urmotors1 from "../assets/urmotors_1.png";
import urmotors2 from "../assets/urmotors_2.png";
import urmotors3 from "../assets/urmotors_3.png";
import urmotors4 from "../assets/urmotors_4.png";
import veterinaria from "../assets/veterinaria.png";
import pizzeria from "../assets/pizzeria.png";
import inmobiliaria from "../assets/inmobiliaria.png";
import grupoAses from "../assets/grupo-ases.png";
import sistemaventas from "../assets/sistema-ventas.jpeg";
import sistemaventas1 from "../assets/sistema-ventas-1.jpeg";
import sistemaventas2 from "../assets/sistema-ventas-2.jpeg";

export const projects = [
  {
    title: "UR Motors",
    category: "web",
    description:
      "Sistema para la gestión de una tienda de venta de repuestos para motos.",
    tags: ["Django", "React"],
    images: [urmotors1.src, urmotors2.src, urmotors3.src, urmotors4.src],
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
    tags: ["Django", "Next.js", "Tailwind"],
    image: pizzeria,
    size: "medium",
  },
  {
    title: "Sistema de Ventas",
    category: "web",
    description: "Sistema de ventas para un negocio de comida rápida.",
    tags: ["Django", "React", "Tailwind"],
    images: [sistemaventas.src, sistemaventas1.src, sistemaventas2.src],
    size: "large",
  },
  {
    title: "Grupo Ases",
    category: "web",
    description: "Landing Page para una Empresa.",
    tags: ["Next.js", "Tailwind"],
    image: grupoAses,
    size: "large",
  },
  {
    title: "Inmobiliaria",
    category: "web",
    description: "Landing Page para una Inmobiliaria.",
    tags: ["React", "Tailwind"],
    image: inmobiliaria,
    size: "medium",
  },
];
