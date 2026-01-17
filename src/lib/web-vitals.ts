/**
 * Web Vitals tracking for performance monitoring.
 * Integrates with analytics to track Core Web Vitals metrics.
 */

export interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Reports Web Vitals metrics to analytics service.
 * Currently logs to console, but can be extended to send to analytics.
 */
export const reportWebVitals = (metric: WebVitalsMetric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric.name, {
      value: metric.value,
      rating: metric.rating,
    });
  }

  // Send to analytics (uncomment when analytics is configured)
  /*
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
  */
};

/**
 * Initialize Web Vitals tracking.
 * Call this in App.tsx or main.tsx after analytics is initialized.
 * 
 * To enable Web Vitals tracking:
 * 1. Install: npm install web-vitals
 * 2. Uncomment the import and code below
 */
export const initWebVitals = async () => {
  if (typeof window !== 'undefined') {
    // Web Vitals is an optional dependency
    // Uncomment the code below after installing: npm install web-vitals
    /*
    try {
      const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');
      
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
    } catch (error) {
      console.warn('Web Vitals initialization failed:', error);
    }
    */
    // Silently skip if web-vitals is not installed
  }
};
