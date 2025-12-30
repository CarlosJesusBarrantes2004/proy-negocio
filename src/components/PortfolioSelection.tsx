import React, { useState, useEffect, useMemo, useCallback } from "react";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// OPTIMIZACIÓN: LazyMotion para reducir coste de bundle de animaciones
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

type Project = (typeof projects)[number];

function getImages(project?: Project | null): string[] {
  if (!project) return [];
  if (Array.isArray(project.images) && project.images.length) return project.images as string[];
  const img = (project as any).image;
  if (!img) return [];
  if (typeof img === "string") return [img];
  if (img?.src) return [img.src];
  return [String(img)];
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const filteredProjects = useMemo(() => {
    return filter === "all" ? projects : projects.filter((p) => p.category === filter);
  }, [filter]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject) return;
    const images = getImages(selectedProject);
    setCurrentImageIndex((prev) => (prev + 1) % Math.max(1, images.length));
  }, [selectedProject]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject) return;
    const images = getImages(selectedProject);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % Math.max(1, images.length));
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") setSelectedProject(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNext, handlePrev]);

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
              Explora cómo ayudamos a negocios a escalar con software de alta precisión.
            </p>
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
            <TabsList className="rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              {[("all"), ("web"), ("mobile")].map((val) => (
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

        {/* Grid Animado */}
        <m.div layout className="grid auto-rows-[300px] grid-cols-1 gap-8 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onExpand={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
              />
            ))}
          </AnimatePresence>
        </m.div>

        {/* Lightbox / Modal Completo */}
        <AnimatePresence>
          {selectedProject && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <button type="button" aria-label="Cerrar galería" onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 text-white transition-transform hover:rotate-90 hover:cursor-pointer">
                <X size={40} />
              </button>

              <div className="relative flex h-full w-full max-w-6xl items-center justify-center">
                {/* Flecha Izquierda */}
                {(getImages(selectedProject).length > 1) && (
                  <button onClick={handlePrev} aria-label="Anterior" className="absolute left-2 md:-left-12 z-50 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110">
                    <ChevronLeft size={32} />
                  </button>
                )}

                {/* Imagen */}
                <div className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait">
                    <m.img
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        src={getImages(selectedProject)[currentImageIndex]}
                        alt={selectedProject.title}
                        className="max-h-[85vh] max-w-full object-contain shadow-2xl"
                    />
                  </AnimatePresence>
                </div>

                {/* Flecha Derecha */}
                {(getImages(selectedProject).length > 1) && (
                  <button onClick={handleNext} aria-label="Siguiente" className="absolute right-2 md:-right-12 z-50 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110">
                    <ChevronRight size={32} />
                  </button>
                )}

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/80">
                  {currentImageIndex + 1} / {getImages(selectedProject).length || 1}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
}

// COMPONENTE TARJETA OPTIMIZADO
function ProjectCard({ project, onExpand }: { project: Project; onExpand: () => void }) {
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Normalizamos imágenes
  const images = useMemo(() => getImages(project), [project]);

  // Solo corre el intervalo si isHovered es TRUE
  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <m.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImg(0);
      }}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir galería ${project.title}`}
      style={{ willChange: "transform, opacity" }}
      className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-xl dark:border-slate-800 cursor-pointer
        ${project.size === "large" ? "md:col-span-2 md:row-span-2" : ""} 
        ${project.size === "medium" ? "md:col-span-1 md:row-span-2" : ""} 
      `}
    >
      <div className="group absolute inset-0 h-full w-full bg-slate-800">
        <AnimatePresence mode="popLayout">
          <m.img
            key={currentImg}
            src={images[currentImg]}
            alt={project.title}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="group-hover:scale-105 transition-transform absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

      <div className="absolute top-4 right-4 z-20 translate-y-[-10px] rounded-full bg-white/10 p-3 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-blue-600">
        <Maximize2 size={18} />
      </div>

      <div className="absolute right-0 bottom-0 left-0 translate-y-6 transform p-8 transition-transform duration-300 group-hover:translate-y-0">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <Badge key={tag} className="border border-blue-500/30 bg-blue-600/20 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-400 uppercase backdrop-blur-md">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="mb-2 text-3xl font-black text-white drop-shadow-lg">{project.title}</h3>
        <p className="mb-6 line-clamp-2 text-sm text-slate-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.description}
        </p>
        <div className="inline-block">
            <Button type="button" aria-label={`Ver detalles ${project.title}`} onClick={(e) => { e.stopPropagation(); onExpand(); }} className="rounded-full bg-white text-slate-950 hover:bg-blue-600 hover:text-white">
                Ver Detalles →
            </Button>
        </div>
      </div>
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {images.map((_: any, i: number) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentImg ? "w-6 bg-blue-500" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      )}
    </m.div>
  );
}