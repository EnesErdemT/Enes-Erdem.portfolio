/**
 * Analytics utility for tracking user interactions
 * This is a simple implementation that can be extended with Google Analytics, Vercel Analytics, etc.
 */

export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

/**
 * Track an analytics event
 * @param event - The event to track
 */
export function trackEvent(event: AnalyticsEvent): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }

  // Send to Vercel Analytics if available
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', event.action, {
      category: event.category,
      label: event.label,
      value: event.value,
    });
  }
}

/**
 * Track CV download event
 */
export function trackCVDownload(): void {
  trackEvent({
    action: 'cv_download',
    category: 'engagement',
    label: 'CV Download Button',
  });
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmission(): void {
  trackEvent({
    action: 'contact_form_submit',
    category: 'engagement',
    label: 'Contact Form',
  });
}

/**
 * Track project view
 * @param projectTitle - The title of the project
 */
export function trackProjectView(projectTitle: string): void {
  trackEvent({
    action: 'project_view',
    category: 'engagement',
    label: projectTitle,
  });
}

/**
 * Track external link click
 * @param url - The URL being clicked
 * @param label - Optional label for the link
 */
export function trackExternalLink(url: string, label?: string): void {
  trackEvent({
    action: 'external_link_click',
    category: 'engagement',
    label: label || url,
  });
}
