/** Ashley artwork — portrait for grid discovery, landscape for presentation. */
export const ASHLEY_ASSETS = {
  /** Service card / grid thumbnail */
  gridSrc: '/services/ashley-card-portrait.webp',
  gridWidth: 720,
  gridHeight: 900,
  /** Detail page, lightbox, and expanded views */
  presentationSrc: '/services/ashley-card.webp',
  presentationWidth: 960,
  presentationHeight: 639,
};

/** Ashley greeting audio — extend `getAshleyWelcomeAudioSrc` when FR is ready. */
export const ASHLEY_AUDIO = {
  en: '/media/audio/ashley/welcome_en.mp3',
  fr: '/media/audio/ashley/welcome_fr.mp3',
};

export function getAshleyWelcomeAudioSrc(lang) {
  // V1: English greeting only. Swap to ASHLEY_AUDIO[lang] when welcome_fr.mp3 is ready.
  void lang;
  return ASHLEY_AUDIO.en;
}
