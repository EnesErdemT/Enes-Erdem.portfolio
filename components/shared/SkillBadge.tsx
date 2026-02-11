"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level?: number; // 1-5
  icon?: React.ReactNode;
  delay?: number;
  isInView?: boolean;
}

export function SkillBadge({
  name,
  level,
  icon,
  delay = 0,
  isInView = true,
}: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <span className="font-medium text-sm">{name}</span>
        </div>
        {level && (
          <div className="flex gap-1" aria-label={`Skill level: ${level} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.2,
                  delay: delay + i * 0.05,
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  i < level ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            ))}
          </div>
        )}
      </div>
      {level && (
        <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(level / 5) * 100}%` } : {}}
            transition={{
              duration: 0.8,
              delay,
              ease: "easeOut",
            }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
            aria-label={`Progress: ${(level / 5) * 100}%`}
          />
        </div>
      )}
    </motion.div>
  );
}
