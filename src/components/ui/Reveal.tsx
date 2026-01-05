import React from "react";
// CAMBIO 1: Importamos 'motion' en lugar de 'm'
import { motion, type MotionProps, type Variants } from "framer-motion";

interface RevealProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down" | "none";
  delay?: number;
  duration?: number;
  offset?: number;
  blur?: boolean;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  direction = "down",
  delay = 0.1,
  duration = 0.5,
  offset = 50,
  blur = false,
  ...props
}) => {
  
  const getInitial = () => {
    switch (direction) {
      case "left": return { x: -offset, y: 0 };
      case "right": return { x: offset, y: 0 };
      case "up": return { x: 0, y: offset };
      case "down": return { x: 0, y: -offset };
      case "none": return { x: 0, y: 0 };
      default: return { x: 0, y: offset };
    }
  };

  const initialVariants: Variants = {
    hidden: { 
      opacity: 0, 
      ...getInitial(),
      filter: blur ? "blur(10px)" : "blur(0px)"
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut" 
      }
    }
  };

  return (
    // CAMBIO 2: Usamos motion.div
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      // Ajusté el margen a -20px para asegurar que dispare más fácil
      viewport={{ once: true, margin: "-50px" }} 
      variants={initialVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;