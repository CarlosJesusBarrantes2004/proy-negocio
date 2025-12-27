import React, { useState } from "react";
import { Send, User, AtSign, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <form className="space-y-10">
      <div className="space-y-8">
        {/* Campo: Nombre */}
        <div className="relative">
          <div
            className={`flex items-center gap-3 border-b-2 py-3 transition-all duration-500 ${focused === "name" ? "border-blue-600" : "border-slate-100 dark:border-slate-800"}`}
          >
            <User
              size={18}
              className={`${focused === "name" ? "text-blue-600" : "text-slate-400"}`}
            />
            <input
              type="text"
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              placeholder="Tu nombre"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
            />
          </div>
          <span
            className={`absolute -top-4 left-0 text-[10px] font-bold tracking-widest uppercase transition-all ${focused === "name" ? "text-blue-600 opacity-100" : "opacity-0"}`}
          >
            Nombre Completo
          </span>
        </div>

        {/* Campo: Email */}
        <div className="relative">
          <div
            className={`flex items-center gap-3 border-b-2 py-3 transition-all duration-500 ${focused === "email" ? "border-blue-600" : "border-slate-100 dark:border-slate-800"}`}
          >
            <AtSign
              size={18}
              className={`${focused === "email" ? "text-blue-600" : "text-slate-400"}`}
            />
            <input
              type="email"
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              placeholder="Email de contacto"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
            />
          </div>
          <span
            className={`absolute -top-4 left-0 text-[10px] font-bold tracking-widest uppercase transition-all ${focused === "email" ? "text-blue-600 opacity-100" : "opacity-0"}`}
          >
            Correo Electrónico
          </span>
        </div>

        {/* Campo: Mensaje */}
        <div className="relative">
          <div
            className={`flex items-start gap-3 border-b-2 py-3 transition-all duration-500 ${focused === "message" ? "border-blue-600" : "border-slate-100 dark:border-slate-800"}`}
          >
            <MessageSquare
              size={18}
              className={`mt-1 ${focused === "message" ? "text-blue-600" : "text-slate-400"}`}
            />
            <textarea
              rows={3}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder="Háblanos de tu proyecto..."
              className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
            ></textarea>
          </div>
          <span
            className={`absolute -top-4 left-0 text-[10px] font-bold tracking-widest uppercase transition-all ${focused === "message" ? "text-blue-600 opacity-100" : "opacity-0"}`}
          >
            Tu Idea
          </span>
        </div>
      </div>

      {/* Botón Compacto y Elegante */}
      <div className="flex justify-end pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:cursor-pointer hover:bg-blue-700 dark:shadow-none"
        >
          Enviar Propuesta
          <Send
            size={14}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.button>
      </div>
    </form>
  );
}
