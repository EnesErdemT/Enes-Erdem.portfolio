'use client';

import Script from 'next/script';

/**
 * Google Analytics component
 * Loads Google Analytics script and initializes tracking
 * 
 * Setup:
 * 1. Get your Measurement ID from Google Analytics (format: G-XXXXXXXXXX)
 * 2. Add to environment variables: NEXT_PUBLIC_GA_MEASUREMENT_ID
 * 3. Import and add this component to your root layout
 * 
 * @see https://analytics.google.com/
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't load analytics if measurement ID is not configured
  if (!measurementId) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Google Analytics not configured. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to enable.');
    }
    return null;
  }

  return (
    <>
      {/* Load Google Analytics script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      
      {/* Initialize Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
