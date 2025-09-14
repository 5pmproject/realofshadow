/**
 * Performance Utilities - Production-ready Performance Monitoring
 * 
 * @description
 * Utility functions for performance monitoring and optimization
 * 
 * @features
 * - Core Web Vitals monitoring
 * - Resource loading metrics
 * - Memory usage tracking
 * - Performance debugging
 */

// Core Web Vitals monitoring
export const measureCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // First Contentful Paint (FCP)
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    });
  });
  
  observer.observe({ entryTypes: ['paint'] });

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  });
  
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('CLS:', clsValue);
      }
    });
  });
  
  clsObserver.observe({ entryTypes: ['layout-shift'] });
};

// Resource loading performance
export const measureResourceTiming = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource');

    console.log('Navigation Timing:', {
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
      domProcessing: navigation.domContentLoadedEventStart - navigation.responseEnd,
      load: navigation.loadEventStart - navigation.navigationStart
    });

    // Log slow resources (> 1s)
    resources.forEach((resource) => {
      const duration = resource.responseEnd - resource.startTime;
      if (duration > 1000) {
        console.warn('Slow resource:', resource.name, duration + 'ms');
      }
    });
  });
};

// Memory usage monitoring
export const measureMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as any).memory;
  return {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
  };
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Initialize performance monitoring in production
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'production') {
    measureCoreWebVitals();
    measureResourceTiming();
    
    // Log memory usage every 30 seconds
    setInterval(() => {
      const memory = measureMemoryUsage();
      if (memory && memory.used > memory.limit * 0.8) {
        console.warn('High memory usage:', memory);
      }
    }, 30000);
  }
};
