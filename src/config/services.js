/** Canonical service order — used by nav, footer, and contact form. */
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
  aiConstruction: '/services/ai-construction',
  websiteDev: '/services/website-development',
  customSolutions: '/services/custom-solutions',
  crewpilot: '/products/crewpilot',
  ashley: '/ashley',
};

export const SERVICE_NAV_ITEMS = SERVICE_NAV_ORDER.map((key) => ({
  key,
  path: SERVICE_PATHS[key],
}));

/** Contact form service labels (CrewPilot product listed first, then services in nav order). */
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
