import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// 1. Importación optimizada
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

export default function PortfolioSection() {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 2. Memorizamos los proyectos filtrados para evitar cálculos en cada render
  const filteredProjects = useMemo(() => {
    return filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);
  }, [filter]);

  const handleExpand = useCallback((img: string) => setSelectedImage(img), []);
  const handleClose = useCallback(() => setSelectedImage(null), []);

  return (
    <LazyMotion features={domAnimation}>
      <section id="catalogo" className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Encabezado */}
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
              {["all", "web", "mobile"].map((val) => (
                <TabsTrigger
                  key={val}
                  value={val}
                  className="rounded-lg px-6 capitalize shadow-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  {val === "all" ? "Todos" : val === "web" ? "Web" : "Móvil"}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Grid Animado - Usamos m.div */}
        <m.div
          layout
          className="grid auto-rows-[300px] grid-cols-1 gap-8 md:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onExpand={handleExpand}
              />
            ))}
          </AnimatePresence>
        </m.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
              onClick={handleClose}
            >
              <button className="absolute top-6 right-6 text-white transition-transform hover:rotate-90">
                <X size={40} />
              </button>
              <m.img
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                src={selectedImage}
                className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
              />
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
}

// 3. ProjectCard memorizado para evitar re-renders innecesarios al filtrar
const ProjectCard = memo(
  ({
    project,
    onExpand,
  }: {
    project: any;
    onExpand: (img: string) => void;
  }) => {
    const [currentImg, setCurrentImg] = useState(0);
    const images = useMemo(
      () => project.images || [project.image.src],
      [project],
    );

    useEffect(() => {
      if (images.length <= 1) return;
      const interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
      }, 4500); // Un poco más lento para reducir el estrés de CPU
      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <m.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "transform, opacity" }}
        className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-xl dark:border-slate-800 ${
          project.size === "large"
            ? "md:col-span-2 md:row-span-2"
            : project.size === "medium"
              ? "md:col-span-1 md:row-span-2"
              : ""
        }`}
      >
        {/* Carrusel de Imágenes */}
        <div className="absolute inset-0 h-full w-full">
          <AnimatePresence mode="wait">
            <m.img
              key={currentImg}
              src={images[currentImg]}
              loading="lazy" // 4. Carga perezosa de imágenes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
          </AnimatePresence>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />

        {/* Botón Expansión */}
        <button
          onClick={() => onExpand(images[currentImg])}
          className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-3 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-blue-600"
        >
          <Maximize2 size={18} />
        </button>

        {/* Contenido */}
        <div className="absolute right-0 bottom-0 left-0 translate-y-6 p-8 transition-transform duration-500 group-hover:translate-y-0">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <Badge
                key={tag}
                className="border-blue-500/30 bg-blue-600/20 text-[10px] text-blue-400"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="mb-2 text-3xl font-black text-white">
            {project.title}
          </h3>
          <p className="mb-6 line-clamp-2 text-sm text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
            {project.description}
          </p>
          <Button className="rounded-full bg-white text-slate-950 hover:bg-blue-600 hover:text-white">
            Ver Detalles →
          </Button>
        </div>
      </m.div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
