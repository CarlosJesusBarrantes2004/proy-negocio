import { useState, useEffect } from "react";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PortfolioSection() {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="catalogo" className="relative mx-auto max-w-7xl px-6 py-24">
      {/* Encabezado con estilo moderno */}
      <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-600 uppercase dark:bg-blue-900/30">
            Casos de Éxito
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Nuestro{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Catálogo
            </span>
          </h2>
          <p className="max-w-md text-slate-600 dark:text-slate-400">
            Explora cómo ayudamos a negocios a escalar con software de alta
            precisión.
          </p>
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={setFilter}
          className="w-full md:w-auto"
        >
          <TabsList className="rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <TabsTrigger
              value="all"
              className="rounded-lg px-6 shadow-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              value="web"
              className="rounded-lg px-6 shadow-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Web
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              className="rounded-lg px-6 shadow-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Móvil
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid con animaciones de Framer Motion */}
      <motion.div
        layout
        className="grid auto-rows-[300px] grid-cols-1 gap-8 md:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onExpand={(img) => setSelectedImage(img)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Pantalla Completa */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white transition-transform hover:rotate-90 hover:cursor-pointer">
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={selectedImage}
              className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-componente para la tarjeta con carrusel interno
function ProjectCard({
  project,
  onExpand,
}: {
  project: any;
  onExpand: (img: string) => void;
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const images = project.images || [project.image.src]; // Fallback si no hay array

  // Efecto carrusel automático
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-xl dark:border-slate-800 ${project.size === "large" ? "md:col-span-2 md:row-span-2" : ""} ${project.size === "medium" ? "md:col-span-1 md:row-span-2" : ""} `}
    >
      {/* Carrusel de Imágenes */}
      <div className="absolute inset-0 h-full w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={images[currentImg]}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
        </AnimatePresence>
      </div>

      {/* Overlays y Contenido */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

      {/* Botón de Pantalla Completa */}
      <button
        onClick={() => onExpand(images[currentImg])}
        className="absolute top-4 right-4 z-20 translate-y-2 rounded-full bg-white/10 p-3 text-white opacity-0 backdrop-blur-md transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:cursor-pointer hover:bg-blue-600"
      >
        <Maximize2 size={18} />
      </button>

      <div className="absolute right-0 bottom-0 left-0 translate-y-4 transform p-8 transition-transform duration-500 group-hover:translate-y-0">
        <div className="mb-4 flex gap-2">
          {project.tags.map((tag: string) => (
            <Badge
              key={tag}
              className="border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-400 uppercase backdrop-blur-md"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="mb-2 text-3xl leading-tight font-black text-white">
          {project.title}
        </h3>

        <p className="mb-6 line-clamp-2 text-sm text-slate-300 opacity-0 transition-opacity delay-100 group-hover:opacity-100">
          {project.description}
        </p>

        <Button className="rounded-full bg-white px-6 text-xs font-bold tracking-widest text-slate-950 uppercase transition-colors hover:bg-blue-600 hover:text-white">
          Ver Detalles →
        </Button>
      </div>

      {/* Indicadores de carrusel (puntos) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_: any, i: number) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${i === currentImg ? "w-6 bg-blue-500" : "w-1.5 bg-white/30"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
