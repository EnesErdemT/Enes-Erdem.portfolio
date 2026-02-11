"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Target,
  User,
  Download,
} from "lucide-react";
import { trackCVDownload } from "@/lib/analytics";

interface AboutProps {
  bio: string;
  education: Array<{
    institution: string;
    degree: string;
    location: string;
    years: string;
    type: "university" | "preparatory" | "high-school";
  }>;
  goals: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

export function About({ bio, education, goals, contact }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCVDownload = () => {
    trackCVDownload();
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Biography Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="p-5 sm:p-6 h-full hover:shadow-lg active:shadow-md transition-shadow touch-manipulation relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Biography
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-playfair italic">{bio}</p>
              </div>
            </Card>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card className="p-5 sm:p-6 h-full hover:shadow-lg active:shadow-md transition-shadow touch-manipulation relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full -ml-16 -mb-16" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Education
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {education.map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-semibold text-base sm:text-lg">{edu.institution}</p>
                      <p className="text-sm sm:text-base text-muted-foreground">{edu.degree}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground/80">{edu.location}</p>
                      <Badge variant="secondary" className="mt-2">{edu.years}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Career Goals Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-5 sm:p-6 h-full hover:shadow-lg active:shadow-md transition-shadow touch-manipulation relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full -ml-20 -mt-20" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Career Goals
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-playfair italic">{goals}</p>
              </div>
            </Card>
          </motion.div>

          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-5 sm:p-6 h-full hover:shadow-lg active:shadow-md transition-shadow touch-manipulation relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/5 to-transparent rounded-full -mr-20 -mb-20" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Contact Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary active:text-primary transition-colors break-all touch-manipulation"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary active:text-primary transition-colors touch-manipulation"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">
                      {contact.location}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CV Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-8 md:mt-12"
        >
          <Button size="lg" asChild className="text-sm sm:text-base">
            <a href="/cv/enes-talha-erdem-cv.pdf" download onClick={handleCVDownload}>
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Download CV
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
