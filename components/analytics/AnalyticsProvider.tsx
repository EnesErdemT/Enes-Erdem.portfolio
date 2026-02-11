'use client';

import { GoogleAnalytics } from './GoogleAnalytics';

/**
 * Analytics Provider
 * Google Analytics integration
 * 
 * This component should be added to your root layout to enable analytics tracking.
 * 
 * Features:
 * - Google Analytics 4 (GA4) for comprehensive analytics
 * - Automatic page view tracking
 * - Custom event tracking via lib/analytics.ts
 * 
 * Setup:
 * 1. For Google Analytics: Add NEXT_PUBLIC_GA_MEASUREMENT_ID to environment variables
 * 
 * @see ANALYTICS_SETUP.md for detailed setup instructions
 */
export function AnalyticsProvider() {
  return (
    <>
      <GoogleAnalytics />
    </>
  );
}
