import { event } from './gtag';

type EventParams = Record<string, string | number | boolean>;

const getPagePath = () =>
  typeof window !== 'undefined' ? window.location.pathname : '';

const track = (name: string, params: EventParams) => {
  event(name, {
    page_path: getPagePath(),
    ...params,
  });
};

export type WhatsAppIntent = 'reservar_turno' | 'consulta_general';

export const trackWhatsAppClick = (
  buttonLocation: string,
  intent: WhatsAppIntent = 'consulta_general',
) => {
  track('whatsapp_click', {
    button_location: buttonLocation,
    intent,
  });
};

export type InstagramProfile = 'nutricion_consciente' | 'estelar';

export const trackInstagramClick = (
  clickLocation: string,
  profile: InstagramProfile,
) => {
  track('instagram_click', {
    click_location: clickLocation,
    profile,
  });
};

export const trackMapsClick = (clickLocation: string) => {
  track('maps_click', {
    click_location: clickLocation,
  });
};

export const trackCreatorLinkClick = (clickLocation: string) => {
  track('creator_link_click', {
    click_location: clickLocation,
    link_label: 'glomun.com',
  });
};

export const trackNavigationClick = (
  clickLocation: 'desktop_menu' | 'mobile_menu',
  section: string,
) => {
  track('navigation_click', {
    click_location: clickLocation,
    section,
  });
};

export const trackFaqClick = (
  questionId: number,
  questionLabel: string,
  action: 'open' | 'close',
) => {
  track('faq_click', {
    click_location: `faq_${questionId}`,
    question_id: questionId,
    question_label: questionLabel,
    action,
  });
};
