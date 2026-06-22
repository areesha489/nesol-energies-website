"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && rect.bottom > 0) {
      setVisible(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (isInView) setVisible(true);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
