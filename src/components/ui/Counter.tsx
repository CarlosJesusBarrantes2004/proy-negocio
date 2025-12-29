import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, motion, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
}

export default function Counter({ value, duration = 2 }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); 
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: duration, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, value, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}