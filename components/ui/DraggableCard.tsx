"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { playDragStart, playSnapBack } from "@/lib/audio";

interface DraggableCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableCard({ children, className }: DraggableCardProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={constraintsRef} className={`relative ${className ?? ""}`}>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileDrag={{ scale: 1.03, zIndex: 50 }}
        onDragStart={() => playDragStart()}
        onDragEnd={() => playSnapBack()}
        className="cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </div>
  );
}
