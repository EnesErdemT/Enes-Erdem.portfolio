"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hoverLift } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  isInView: boolean;
}

export function ProjectCard({
  project,
  index,
  onClick,
  isInView,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={hoverLift}
      className={cn(
        "relative group cursor-pointer",
        project.featured && "md:col-span-2 md:row-span-2"
      )}
      onClick={onClick}
    >
      <Card className="overflow-hidden h-full hover:shadow-2xl active:shadow-xl transition-shadow duration-300 flex flex-col">
        {/* Project Info */}
        <div className="p-4 sm:p-5 md:p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 line-clamp-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs sm:text-sm">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.githubUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs sm:text-sm"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    GitHub
                  </a>
                </Button>
              </motion.div>
            )}
            {project.liveUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm" 
                  asChild 
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs sm:text-sm"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Demo
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
