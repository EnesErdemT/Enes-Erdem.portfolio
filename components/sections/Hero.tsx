'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Globe, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypewriterEffect } from '@/components/shared/typewriter-effect';
import { PersonalInfo } from '@/types';
import { personalInfoData, socialLinksData } from '@/lib/data/personal-info';

interface HeroProps {
  personalInfo?: PersonalInfo;
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  website: Globe,
  email: Mail,
};

export function Hero({ personalInfo: propPersonalInfo }: HeroProps) {
  // Build personalInfo with icons
  const personalInfo: PersonalInfo = propPersonalInfo || {
    ...personalInfoData,
    socialLinks: socialLinksData.map((link) => ({
      ...link,
      icon: null, // Will be rendered directly in component
    })),
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="rounded-full object-cover border-4 border-primary"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center md:text-left order-1 md:order-2">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypewriterEffect
                words={personalInfo.titles}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary mb-4 md:mb-6"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0 font-playfair italic leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3 sm:gap-4 justify-center md:justify-start mb-6 md:mb-8"
            >
              {socialLinksData.map((link) => {
                const IconComponent = iconMap[link.platform];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
                    aria-label={link.platform}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
            >
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto active:scale-95 transition-transform touch-manipulation"
              >
                Projelerime Göz At
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto active:scale-95 transition-transform touch-manipulation"
              >
                İletişime Geç
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
