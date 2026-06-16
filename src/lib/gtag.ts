export const GA_MEASUREMENT_ID = 'G-64DYKHP9Y0';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = (
  action: string,
  params?: Record<string, string | number | boolean>,
) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', action, params);
};
