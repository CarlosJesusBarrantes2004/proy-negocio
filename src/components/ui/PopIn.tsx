import React from "react";
import { motion } from "framer-motion";

interface PopInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const PopIn: React.FC<PopInProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} // Empieza pequeño y borroso
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} // Crece y se enfoca
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: delay,
        duration: 0.4,
        type: "spring",
        bounce: 0.4, // Rebote elástico "boing"
        stiffness: 150,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
};

export default PopIn;