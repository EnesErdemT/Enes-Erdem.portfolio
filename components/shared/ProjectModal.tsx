"use client";

import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold pr-8">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 sm:space-y-6">
          {/* Long Description */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Proje Detayları</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Kullanılan Teknolojiler</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs sm:text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            {project.githubUrl && (
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  GitHub'da Görüntüle
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Canlı Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
