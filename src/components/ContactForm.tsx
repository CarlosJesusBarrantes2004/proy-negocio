import { useState, useCallback } from "react";
import { Send, User, AtSign, MessageSquare } from "lucide-react";
// 1. Importación optimizada
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null);

  // 2. Memorizamos los handlers para evitar recrearlos si el componente re-renderiza
  const handleFocus = useCallback((id: string) => setFocused(id), []);
  const handleBlur = useCallback(() => setFocused(null), []);

  return (
    <LazyMotion features={domAnimation}>
      <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-8">
          {/* Campo: Nombre */}
          <div className="relative">
            <div
              className={`flex items-center gap-3 border-b-2 py-3 transition-all duration-500 ${
                focused === "name"
                  ? "border-blue-600"
                  : "border-slate-100 dark:border-slate-800"
              }`}
            >
              <User
                size={18}
                className={`${focused === "name" ? "text-blue-600" : "text-slate-400"} transition-colors duration-300`}
              />
              <input
                type="text"
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                placeholder="Tu nombre"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>
            <span
              className={`absolute -top-4 left-0 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                focused === "name"
                  ? "translate-y-0 text-blue-600 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              Nombre Completo
            </span>
          </div>

          {/* Campo: Email */}
          <div className="relative">
            <div
              className={`flex items-center gap-3 border-b-2 py-3 transition-all duration-500 ${
                focused === "email"
                  ? "border-blue-600"
                  : "border-slate-100 dark:border-slate-800"
              }`}
            >
              <AtSign
                size={18}
                className={`${focused === "email" ? "text-blue-600" : "text-slate-400"} transition-colors duration-300`}
              />
              <input
                type="email"
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                placeholder="Email de contacto"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>
            <span
              className={`absolute -top-4 left-0 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                focused === "email"
                  ? "translate-y-0 text-blue-600 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              Correo Electrónico
            </span>
          </div>

          {/* Campo: Mensaje */}
          <div className="relative">
            <div
              className={`flex items-start gap-3 border-b-2 py-3 transition-all duration-500 ${
                focused === "message"
                  ? "border-blue-600"
                  : "border-slate-100 dark:border-slate-800"
              }`}
            >
              <MessageSquare
                size={18}
                className={`mt-1 ${focused === "message" ? "text-blue-600" : "text-slate-400"} transition-colors duration-300`}
              />
              <textarea
                rows={3}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                placeholder="Háblanos de tu proyecto..."
                className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
              ></textarea>
            </div>
            <span
              className={`absolute -top-4 left-0 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                focused === "message"
                  ? "translate-y-0 text-blue-600 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              Tu Idea
            </span>
          </div>
        </div>

        {/* Botón con m.button y willChange */}
        <div className="flex justify-end pt-4">
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: "transform" }}
            className="group flex items-center gap-3 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:cursor-pointer hover:bg-blue-700 dark:shadow-none"
          >
            Enviar Propuesta
            <Send
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </m.button>
        </div>
      </form>
    </LazyMotion>
  );
}
