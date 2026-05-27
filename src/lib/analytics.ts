import { event } from './gtag';

export type WhatsAppIntent = 'reservar_turno' | 'consulta_general';

export const trackWhatsAppClick = (
  buttonLocation: string,
  intent: WhatsAppIntent = 'consulta_general',
) => {
  event('whatsapp_click', {
    button_location: buttonLocation,
    intent,
    page_path: window.location.pathname,
  });
};
