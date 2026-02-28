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
 * Automatically sends to Google Analytics if configured.
 */
export const reportWebVitals = (metric: WebVitalsMetric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric.name, {
      value: metric.value,
      rating: metric.rating,
    });
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

/**
 * Initialize Web Vitals tracking.
 * Call this in App.tsx or main.tsx after analytics is initialized.
 */
export const initWebVitals = async () => {
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

    onCLS((m) => reportWebVitals(m as WebVitalsMetric));
    onFCP((m) => reportWebVitals(m as WebVitalsMetric));
    onINP((m) => reportWebVitals(m as WebVitalsMetric));
    onLCP((m) => reportWebVitals(m as WebVitalsMetric));
    onTTFB((m) => reportWebVitals(m as WebVitalsMetric));
  } catch (error) {
    console.warn('Web Vitals initialization failed:', error);
  }
};
