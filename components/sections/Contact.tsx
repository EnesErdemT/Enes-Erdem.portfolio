'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16"
        >
          Get In Touch
        </motion.h2>

        <Card className="p-5 sm:p-6 md:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="Your Name"
                className="text-sm sm:text-base"
              />
              {form.formState.errors.name && (
                <p className="text-xs sm:text-sm text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="example@email.com"
                className="text-sm sm:text-base"
              />
              {form.formState.errors.email && (
                <p className="text-xs sm:text-sm text-destructive mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="subject" className="text-sm sm:text-base">Subject</Label>
              <Input
                id="subject"
                {...form.register('subject')}
                placeholder="Message subject"
                className="text-sm sm:text-base"
              />
              {form.formState.errors.subject && (
                <p className="text-xs sm:text-sm text-destructive mt-1">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
              <Textarea
                id="message"
                {...form.register('message')}
                placeholder="Write your message here..."
                rows={6}
                className="text-sm sm:text-base resize-none"
              />
              {form.formState.errors.message && (
                <p className="text-xs sm:text-sm text-destructive mt-1">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            {submitStatus === 'success' && (
              <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                  Your message has been sent successfully!
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                  An error occurred. Please try again.
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <Card className="p-4 sm:p-5 md:p-6 hover:shadow-lg active:shadow-md transition-shadow touch-manipulation">
            <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium text-sm sm:text-base">Email</p>
            <a 
              href="mailto:enesterdem@gmail.com" 
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors break-all touch-manipulation"
            >
              enesterdem@gmail.com
            </a>
          </Card>

          <Card className="p-4 sm:p-5 md:p-6 hover:shadow-lg active:shadow-md transition-shadow touch-manipulation">
            <Phone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium text-sm sm:text-base">Phone</p>
            <a 
              href="tel:+905345803440" 
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors touch-manipulation"
            >
              +90 534 580 3440
            </a>
          </Card>

          <Card className="p-4 sm:p-5 md:p-6 hover:shadow-lg active:shadow-md transition-shadow touch-manipulation">
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium text-sm sm:text-base">Location</p>
            <p className="text-xs sm:text-sm text-muted-foreground">İstanbul, Türkiye</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
