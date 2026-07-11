import ServiceScaffold from './ServiceScaffold';

export { default as WebApplicationsPage } from './WebApplications';

export function WorkflowAutomationPage() {
  return (
    <ServiceScaffold
      titleEn="Workflow Automation"
      titleFr="Automatisation des processus"
      subtitleEn="Eliminate Manual Work. Operate at Scale."
      subtitleFr="Éliminez le travail manuel. Opérez à grande échelle."
      features={[
        {
          titleEn: 'Scheduling Automation',
          titleFr: 'Automatisation de la planification',
          descEn: 'Automate appointment booking, resource scheduling, and calendar management — reducing back-and-forth and missed opportunities.',
          descFr: 'Automatisez la prise de rendez-vous, la gestion des ressources et des calendriers — réduisant les allers-retours et les occasions manquées.',
        },
        {
          titleEn: 'Lead Management',
          titleFr: 'Gestion des prospects',
          descEn: 'Capture, qualify, and route incoming leads automatically. Ensure every inquiry is followed up and every opportunity is tracked through your pipeline.',
          descFr: 'Capturez, qualifiez et orientez automatiquement les prospects entrants. Assurez le suivi de chaque demande et chaque opportunité dans votre entonnoir.',
        },
        {
          titleEn: 'Reporting & Notifications',
          titleFr: 'Rapports et notifications',
          descEn: 'Automated reporting keeps your team informed without manual data compilation. Set up smart notifications that trigger on the events that matter most.',
          descFr: 'Les rapports automatisés tiennent votre équipe informée sans compilation manuelle. Configurez des notifications intelligentes déclenchées par les événements importants.',
        },
        {
          titleEn: 'Business Process Automation',
          titleFr: 'Automatisation des processus d\'affaires',
          descEn: 'Map, optimize, and automate your core business processes — from onboarding to invoicing — so your team can focus on high-value work.',
          descFr: 'Cartographiez, optimisez et automatisez vos processus métier fondamentaux — de l\'intégration à la facturation — pour que votre équipe se concentre sur la valeur ajoutée.',
        },
      ]}
    />
  );
}

export function AIReceptionistsPage() {
  return (
    <ServiceScaffold
      titleEn="AI Receptionists"
      titleFr="Réceptionnistes IA"
      subtitleEn="Your Business, Always Available."
      subtitleFr="Votre entreprise, toujours disponible."
      features={[
        {
          titleEn: 'Meet Ashley',
          titleFr: 'Rencontrez Ashley',
          descEn: 'Ashley is Nexora\'s flagship AI receptionist — an intelligent agent that handles incoming inquiries, qualifies leads, books appointments, and provides support around the clock. No hold times. No missed calls.',
          descFr: 'Ashley est la réceptionniste IA phare de Nexora — un agent intelligent qui traite les demandes entrantes, qualifie les prospects, prend des rendez-vous et offre du soutien 24h/7j.',
        },
        {
          titleEn: 'SMS Booking',
          titleFr: 'Réservation par SMS',
          descEn: 'Allow clients to book appointments directly via text message. Ashley manages the entire conversation flow — confirming availability, sending reminders, and handling rescheduling.',
          descFr: 'Permettez aux clients de réserver des rendez-vous directement par message texte. Ashley gère tout le flux conversationnel, de la confirmation aux rappels.',
        },
        {
          titleEn: 'Voice Intake',
          titleFr: 'Accueil vocal',
          descEn: 'Handle incoming calls intelligently — capturing caller intent, collecting key information, and routing calls or creating records automatically.',
          descFr: 'Gérez les appels entrants de manière intelligente — capturant l\'intention de l\'appelant, collectant des informations clés et acheminant les appels automatiquement.',
        },
        {
          titleEn: 'Customer Support Automation',
          titleFr: 'Automatisation du service client',
          descEn: 'Deploy AI-powered support that answers common questions instantly, escalates complex issues to your team, and maintains a consistent, professional tone on every interaction.',
          descFr: 'Déployez un support propulsé par l\'IA qui répond instantanément aux questions courantes, escalade les problèmes complexes et maintient un ton professionnel constant.',
        },
      ]}
    />
  );
}

export function CustomSolutionsPage() {
  return (
    <ServiceScaffold
      titleEn="Custom Solutions"
      titleFr="Solutions sur mesure"
      subtitleEn="Built Precisely for Your Business Requirements"
      subtitleFr="Conçu précisément pour les besoins de votre entreprise"
      features={[
        {
          titleEn: 'Discovery Consultation',
          titleFr: 'Consultation de découverte',
          descEn: 'Every custom engagement starts with a deep-dive consultation. We take the time to understand your business, your workflows, your team, and your goals before recommending any solution.',
          descFr: 'Chaque engagement personnalisé commence par une consultation approfondie. Nous prenons le temps de comprendre votre entreprise, vos processus et vos objectifs.',
        },
        {
          titleEn: 'Custom Scope Definition',
          titleFr: 'Définition de portée sur mesure',
          descEn: 'We produce a formal scope definition document that outlines exactly what will be built, how it will work, and what success looks like — no ambiguity, no surprises.',
          descFr: 'Nous produisons un document de définition de portée formel décrivant exactement ce qui sera construit, comment cela fonctionnera et à quoi ressemble le succès.',
        },
        {
          titleEn: 'Custom Development Plan',
          titleFr: 'Plan de développement personnalisé',
          descEn: 'A phased, milestone-driven development plan built around your timeline and budget. We keep every phase transparent and every deliverable clearly defined.',
          descFr: 'Un plan de développement par phases et jalons adapté à votre calendrier et budget. Chaque phase est transparente et chaque livrable clairement défini.',
        },
        {
          titleEn: 'Membership Sites, Booking Systems & Client Portals',
          titleFr: 'Sites d\'adhésion, systèmes de réservation et portails clients',
          descEn: 'If your requirement falls outside our standard service categories, it likely falls here. We build membership platforms, booking engines, client portals, automation projects, and more.',
          descFr: 'Si votre besoin dépasse nos catégories standard, il appartient probablement ici. Nous construisons des plateformes d\'adhésion, des moteurs de réservation, des portails clients et plus.',
        },
      ]}
    />
  );
}
