import { SITE_NAME, DEFAULT_OG_IMAGE } from '../config/site';
import {
  buildCanonicalUrl,
  defaultOgImageUrl,
} from '../../platform/seo/urls.mjs';

const OG_IMAGE = defaultOgImageUrl();

const DEFAULT = {
  title: `${SITE_NAME} — Where Intelligence Comes to Life`,
  description:
    'Nexora Systems builds production software — including CrewPilot, our flagship workforce management platform — and custom technology solutions for Ontario and Quebec businesses.',
};

/** Per-route SEO metadata. Keys match React Router paths. */
export const PAGE_META = {
  '/': {
    title: DEFAULT.title,
    description: DEFAULT.description,
  },
  '/services/website-development': {
    title: `Website Development | ${SITE_NAME}`,
    description:
      'Professional website development packages for Ontario and Quebec businesses — from standard sites to e-commerce and custom solutions.',
  },
  '/services/web-applications': {
    title: `Web Applications | ${SITE_NAME}`,
    description:
      'Nexora Systems builds production web applications — starting with CrewPilot workforce management and extending to custom business software.',
  },
  '/services/workflow-automation': {
    title: `Workflow Automation | ${SITE_NAME}`,
    description:
      'Automate scheduling, lead management, reporting, and core business processes so your team can focus on high-value work.',
  },
  '/services/ai-receptionists': {
    title: `AI Receptionists | ${SITE_NAME}`,
    description:
      'Meet Ashley — Nexora\'s AI receptionist for SMS booking, voice intake, and 24/7 customer support automation.',
  },
  '/services/custom-solutions': {
    title: `Custom Solutions | ${SITE_NAME}`,
    description:
      'Discovery-led custom development for membership sites, booking systems, client portals, and specialized business requirements.',
  },
  '/products/crewpilot': {
    title: `CrewPilot — Workforce Management for Field Crews | ${SITE_NAME}`,
    description:
      'CrewPilot is Nexora\'s flagship workforce management platform — time tracking, payroll, scheduling, offline mode, and AI assistance for contractors and service teams.',
  },
  '/ashley': {
    title: `Meet Ashley | ${SITE_NAME}`,
    description:
      'Meet Ashley Sterling — Nexora\'s cognitive interface agent. Ashley brings intelligence to life across Nexora products and client experiences.',
  },
  '/about': {
    title: `About | ${SITE_NAME}`,
    description:
      'Meet the team behind Nexora — human leadership enhanced by specialized AI professionals who accelerate planning, development, testing, and support.',
  },
  '/contact': {
    title: `Contact | ${SITE_NAME}`,
    description:
      'Get in touch with Nexora Systems. Every project starts with a conversation about your business and goals.',
  },
  '/privacy': {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'CrewPilot Privacy Policy — how Nexora Systems collects, uses, stores, and protects your information.',
  },
  '/terms': {
    title: `Terms of Service | ${SITE_NAME}`,
    description:
      'CrewPilot Terms of Service governing use of the Nexora Systems workforce management application.',
  },
  '/account-deletion': {
    title: `Account Deletion | ${SITE_NAME}`,
    description:
      'How to request deletion of your CrewPilot account and associated personal information.',
  },
  '/internal': {
    title: `Internal Tools | ${SITE_NAME}`,
    description: 'Nexora internal business tools for documents, sales, and operations.',
    noindex: true,
  },
  '/internal/proposal-renderer': {
    title: `Proposal Renderer | ${SITE_NAME}`,
    description: 'Internal Nexora proposal Markdown preview and PDF export.',
    noindex: true,
  },
};

export function resolvePageMeta(pathname) {
  const meta = PAGE_META[pathname];
  if (meta) {
    return { ...meta, ogImage: OG_IMAGE, noindex: Boolean(meta.noindex) };
  }
  return {
    title: `Page Not Found | ${SITE_NAME}`,
    description: DEFAULT.description,
    ogImage: OG_IMAGE,
    noindex: true,
  };
}

export { buildCanonicalUrl };
