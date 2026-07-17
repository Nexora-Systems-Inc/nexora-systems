import { SITE_NAME, DEFAULT_OG_IMAGE } from '../config/site';
import {
  buildCanonicalUrl,
  defaultOgImageUrl,
} from '../../platform/seo/urls.mjs';

const OG_IMAGE = defaultOgImageUrl();

const DEFAULT = {
  title: `${SITE_NAME} — Where Intelligence Comes to Life`,
  description:
    'Nexora Systems designs and engineers business systems — custom websites, progressive web apps, automation, AI assistants, and operational software including CrewPilot — for Ontario and Quebec businesses.',
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
      'Professional website development that fits into a larger business system — from standard sites to e-commerce and custom platforms for Ontario and Quebec businesses.',
  },
  '/services/web-applications': {
    title: `Web Applications | ${SITE_NAME}`,
    description:
      'Nexora Systems engineers production web applications and business systems — starting with CrewPilot, our workforce platform built to grow with your business, and extending to custom operational software.',
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
      'Discovery-led custom development for membership sites, booking systems, client portals, and specialized business systems.',
  },
  '/products/crewpilot': {
    title: `CrewPilot — Workforce Management Built to Grow With Your Business | ${SITE_NAME}`,
    description:
      'CrewPilot is Nexora\'s production workforce platform — secure company data, role-based access, offline-first field workflows, time tracking, payroll, and AI assistance for growing field businesses.',
  },
  '/ashley': {
    title: `Meet Ashley | ${SITE_NAME}`,
    description:
      'Meet Ashley Sterling — Nexora\'s cognitive interface agent. Ashley brings intelligence to life across Nexora products and client experiences.',
  },
  '/about': {
    title: `About | ${SITE_NAME}`,
    description:
      'Nexora Systems builds production software including CrewPilot, and delivers custom technology for serious businesses across Ontario and Quebec.',
  },
  '/contact': {
    title: `Contact | ${SITE_NAME}`,
    description:
      'Get in touch with Nexora Systems. Every engagement starts with a conversation about your business and operations.',
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
};

export function resolvePageMeta(pathname) {
  const meta = PAGE_META[pathname];
  if (meta) {
    return { ...meta, ogImage: OG_IMAGE };
  }
  return {
    title: `Page Not Found | ${SITE_NAME}`,
    description: DEFAULT.description,
    ogImage: OG_IMAGE,
    noindex: true,
  };
}

export { buildCanonicalUrl };
