/** Canonical service order — used by nav, footer, homepage cards, and contact form. */
export const SERVICE_NAV_ORDER = [
  'webApps',
  'aiReceptionists',
  'workflow',
  'aiConstruction',
  'websiteDev',
  'customSolutions',
];

export const SERVICE_PATHS = {
  webApps: '/services/web-applications',
  aiReceptionists: '/services/ai-receptionists',
  workflow: '/services/workflow-automation',
  aiConstruction: '/services/ai-construction',
  websiteDev: '/services/website-development',
  customSolutions: '/services/custom-solutions',
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
    'AI Receptionists',
    'Workflow Automation',
    'AI Construction',
    'Website Development',
    'Custom Solutions',
  ],
  fr: [
    'CrewPilot',
    'Applications Web',
    'Réceptionnistes IA',
    'Automatisation',
    'IA Construction',
    'Développement Web',
    'Solutions sur mesure',
  ],
};
