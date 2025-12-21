import { useState } from "react";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PortfolioSection() {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div className="w-full md:w-auto">
          <h2 className="text-foreground text-4xl font-bold tracking-tight">
            Nuestro Catálogo
          </h2>
          <p className="text-muted-foreground mt-2">
            Soluciones digitales a medida.
          </p>
        </div>

        {/* Implementación de Tabs de Shadcn */}
        <Tabs
          defaultValue="all"
          onValueChange={(value) => setFilter(value)}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 md:w-[300px]">
            <TabsTrigger value="all" className="hover:cursor-pointer">
              Todos
            </TabsTrigger>
            <TabsTrigger value="web" className="hover:cursor-pointer">
              Web
            </TabsTrigger>
            <TabsTrigger value="mobile" className="hover:cursor-pointer">
              Móvil
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`group border-border bg-card hover:shadow-primary/20 relative overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-2xl ${project.size === "large" ? "md:col-span-2 md:row-span-2" : ""} ${project.size === "medium" ? "md:col-span-1 md:row-span-2" : ""} `}
          >
            {/* Imagen con zoom suave */}
            <img
              src={project.image.src}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* OVERLAY DE LEGIBILIDAD: Gradiente más denso en la base */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

            {/* Contenido con mejoras de contraste */}
            <div className="absolute bottom-0 w-full p-6 transition-all duration-300">
              <div className="mb-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-primary text-primary-foreground border-none px-2 py-0 text-[10px] font-bold tracking-wider uppercase"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Forzamos texto claro para que siempre resalte sobre el overlay oscuro */}
              <h3 className="mb-1 text-2xl font-bold text-white">
                {project.title}
              </h3>

              <p className="line-clamp-2 text-sm text-gray-200 opacity-0 transition-all duration-300 group-hover:opacity-100">
                {project.description}
              </p>

              <Button
                variant="link"
                className="mt-4 h-auto p-0 font-semibold text-gray-200 opacity-0 group-hover:opacity-100 hover:cursor-pointer"
              >
                Ver proyecto →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
