"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { ProjectCard } from "@/components/shared/ProjectCard";

// Dynamically import ProjectModal - only load when needed (when user clicks a project)
const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((mod) => ({ default: mod.ProjectModal })),
  {
    loading: () => null, // No loading state for modals
    ssr: false, // Modals don't need SSR
  }
);

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Simple intersection observer
  useEffect(() => {
    if (typeof window !== "undefined" && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16"
        >
          Projects
        </motion.h2>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
