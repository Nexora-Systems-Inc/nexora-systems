/**
 * Header services menu only (desktop dropdown and mobile menu).
 * The AI Receptionist page, homepage Ashley card, footer link, contact
 * option, sitemap entry, and page meta stay public while this is false.
 * Set to true to show AI Receptionists in the top navigation.
 */
export const AI_RECEPTIONISTS_NAV_ENABLED = false;

/** Public service order — footer links. The header uses HEADER_SERVICE_NAV_ITEMS. */
export const SERVICE_NAV_ORDER = [
  'webApps',
  'websiteDev',
  'aiReceptionists',
  'workflow',
  'customSolutions',
];

/** Homepage services grid — core services (top) + Nexora ecosystem (bottom). */
export const HOME_SERVICES_GRID_ORDER = [
  'webApps',
  'websiteDev',
  'workflow',
  'crewpilot',
  'ashley',
  'customSolutions',
];

export const SERVICE_PATHS = {
  webApps: '/services/web-applications',
  aiReceptionists: '/services/ai-receptionists',
  workflow: '/services/workflow-automation',
  websiteDev: '/services/website-development',
  customSolutions: '/services/custom-solutions',
  crewpilot: '/products/crewpilot',
  ashley: '/ashley',
};

export const SERVICE_NAV_ITEMS = SERVICE_NAV_ORDER.map((key) => ({
  key,
  path: SERVICE_PATHS[key],
}));

/** Header/top navigation. Omits AI Receptionist while the nav flag is off. */
export const HEADER_SERVICE_NAV_ITEMS = AI_RECEPTIONISTS_NAV_ENABLED
  ? SERVICE_NAV_ITEMS
  : SERVICE_NAV_ITEMS.filter((item) => item.key !== 'aiReceptionists');

/** Contact form service labels (CrewPilot product listed first, then services in public order). */
export const CONTACT_SERVICE_LABELS = {
  en: [
    'CrewPilot',
    'Web Applications',
    'Website Development',
    'AI Receptionists',
    'Workflow Automation',
    'AI Construction',
    'Custom Solutions',
  ],
  fr: [
    'CrewPilot',
    'Applications Web',
    'Développement Web',
    'Réceptionnistes IA',
    'Automatisation',
    'IA Construction',
    'Solutions sur mesure',
  ],
};
