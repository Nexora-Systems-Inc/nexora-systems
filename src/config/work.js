/**
 * Portfolio entries for the Our Work page.
 * Live URLs come from each project's Vercel domains. Unlaunched work has no URL.
 */
export const WORK_ITEMS = [
  {
    id: 'surface-renaud',
    key: 'surfaceRenaud',
    section: 'websites',
    url: 'https://www.surfacerenaud.ca',
    shots: [
      { id: 'desktop', src: '/work/surface-renaud-desktop.webp' },
      { id: 'mobile', src: '/work/surface-renaud-mobile.webp' },
    ],
  },
  {
    id: 'manon-lalonde',
    key: 'manonLalonde',
    section: 'websites',
    url: 'https://www.mlalondeartistepeintre.ca',
    shots: [
      { id: 'desktop', src: '/work/manon-lalonde-desktop.webp' },
      { id: 'mobile', src: '/work/manon-lalonde-mobile.webp' },
    ],
  },
  {
    id: 'red-samurai',
    key: 'redSamurai',
    section: 'websites',
    comingSoon: true,
    shots: [
      { id: 'menu', src: '/work/red-samurai-menu.webp' },
      { id: 'desktop', src: '/work/red-samurai-desktop.webp' },
      { id: 'mobile', src: '/work/red-samurai-mobile.webp' },
    ],
  },
  {
    id: 'crewpilot',
    key: 'crewpilot',
    section: 'software',
    fit: 'contain',
    shots: [
      { id: 'desktop', src: '/products/crewpilot/crewpilot-tablet-hero.webp' },
    ],
  },
  {
    id: 'nexora-hq',
    key: 'nexoraHq',
    section: 'software',
    fit: 'contain',
    shots: [
      { id: 'desktop', src: '/work/nexora-hq-desktop.webp' },
      { id: 'mobile', src: '/work/nexora-hq-mobile.webp' },
    ],
  },
  {
    id: 'client-workspace',
    key: 'clientWorkspace',
    section: 'software',
    fit: 'contain',
    shots: [
      { id: 'desktop', src: '/work/client-workspace-desktop.webp' },
      { id: 'mobile', src: '/work/client-workspace-mobile.webp' },
    ],
  },
  {
    id: 'joeys-finance',
    key: 'joeysFinance',
    section: 'software',
    fit: 'contain',
    shots: [
      { id: 'desktop', src: '/work/joeys-finance-desktop.webp' },
      { id: 'mobile', src: '/work/joeys-finance-mobile.webp' },
    ],
  },
];

export const RECENT_WORK_IDS = ['surface-renaud', 'manon-lalonde', 'red-samurai'];

export function workBySection(section) {
  return WORK_ITEMS.filter((item) => item.section === section);
}
