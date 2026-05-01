import { GA_MEASUREMENT_ID } from '@/config/constants';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Custom event types for Data Lab engagement tracking.
 */
export type AnalyticsEvent =
  | { name: 'tool_launch'; params: { tool_id: string; tool_name: string } }
  | { name: 'study_read'; params: { study_slug: string; study_title: string } }
  | { name: 'search'; params: { search_term: string; tool_id: string } }
  | { name: 'filter_change'; params: { filter_type: string; filter_value: string; tool_id: string } }
  | { name: 'data_export'; params: { export_type: 'csv' | 'pdf'; tool_id: string } }
  | { name: 'draft_submit'; params: { title: string } }
  | { name: 'ai_response_apply'; params: { tool_id: string } }
  | { name: 'snapshot_create'; params: { tool_id: string } };

/**
 * Tracks a page view to Google Analytics 4.
 */
export const trackPageView = (path: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

/**
 * Tracks a custom event to Google Analytics 4.
 */
export const trackEvent = ({ name, params }: AnalyticsEvent) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  window.gtag('event', name, params);
};
