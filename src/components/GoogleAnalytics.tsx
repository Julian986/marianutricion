import { useEffect } from 'react';
import { GA_MEASUREMENT_ID } from '../lib/gtag';

const GoogleAnalytics = () => {
  useEffect(() => {
    const gtag = window.gtag;
    if (typeof gtag !== 'function') return;

    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
    });
  }, []);

  return null;
};

export default GoogleAnalytics;
