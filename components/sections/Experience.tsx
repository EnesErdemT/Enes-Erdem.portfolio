"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Experience as ExperienceType } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Sort experiences chronologically (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Handle "Present" (current) - should be first
    if (a.endDate === "Present" || a.endDate === "Halen") return -1;
    if (b.endDate === "Present" || b.endDate === "Halen") return 1;
    
    // Parse dates for comparison
    const dateA = parseDate(a.startDate);
    const dateB = parseDate(b.startDate);
    
    return dateB.getTime() - dateA.getTime();
  });

  // Separate full-time/part-time from internships and training
  const professionalExperiences = sortedExperiences.filter(
    (exp) => exp.type === "full-time" || exp.type === "part-time"
  );
  const internships = sortedExperiences.filter(
    (exp) => exp.type === "internship" || exp.type === "training"
  );

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16"
        >
          Experience
        </motion.h2>

        {/* Professional Experience Section */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 md:mb-8 text-center">
            Professional Experience
          </h3>
          <Timeline experiences={professionalExperiences} isInView={isInView} />
        </div>

        {/* Internships Section */}
        {internships.length > 0 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 md:mb-8 text-center">Training & Internships</h3>
            <Timeline experiences={internships} isInView={isInView} />
          </div>
        )}
      </div>
    </section>
  );
}

interface TimelineProps {
  experiences: ExperienceType[];
  isInView: boolean;
}

function Timeline({ experiences, isInView }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />

      {experiences.map((exp, index) => (
        <ExperienceCard
          key={exp.id}
          experience={exp}
          index={index}
          isInView={isInView}
        />
      ))}
    </div>
  );
}

interface ExperienceCardProps {
  experience: ExperienceType;
  index: number;
  isInView: boolean;
}

function ExperienceCard({ experience, index, isInView }: ExperienceCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className={cn(
        "relative mb-8 md:mb-12 md:w-1/2 pl-8 md:pl-0",
        isEven ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
      )}
    >
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute top-6 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full border-2 sm:border-4 border-background z-10",
          "left-0 md:left-auto",
          isEven ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
        )}
      />

      <Card className="p-4 sm:p-5 md:p-6 hover:shadow-lg active:shadow-md transition-shadow duration-300 touch-manipulation">
        <div className="flex flex-col gap-3 mb-4">
          <div className={cn("flex-1", !isEven && "md:order-2")}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{experience.position}</h3>
            <p className="text-base sm:text-lg text-primary">{experience.company}</p>
          </div>
          <Badge
            variant={experience.type === "internship" ? "secondary" : "default"}
            className={cn("whitespace-nowrap self-start md:self-auto", !isEven && "md:order-1")}
          >
            {experience.startDate} - {experience.endDate}
          </Badge>
        </div>

        <ul className="space-y-2 mb-4">
          {experience.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base">{desc}</span>
            </li>
          ))}
        </ul>

        <div className={cn("flex flex-wrap gap-2", isEven && "md:justify-end")}>
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs sm:text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

// Helper function to parse date format
function parseDate(dateStr: string): Date {
  const months: { [key: string]: number } = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    Ocak: 0, Şubat: 1, Mart: 2, Nisan: 3, Mayıs: 4, Haziran: 5,
    Temmuz: 6, Ağustos: 7, Eylül: 8, Ekim: 9, Kasım: 10, Aralık: 11,
  };

  const parts = dateStr.split(" ");
  const month = months[parts[0]];
  const year = parseInt(parts[1]);

  return new Date(year, month);
}
