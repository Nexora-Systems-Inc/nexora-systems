import { Link } from 'react-router-dom';
import './InternalLandingPage.css';

const SECTIONS = [
  {
    id: 'documents',
    title: 'Documents',
    tools: [
      {
        name: 'Proposal Renderer',
        description: 'Preview branded proposals from Markdown and export print-ready PDFs.',
        href: '/internal/proposal-renderer',
        status: 'available',
      },
      {
        name: 'Statement of Work',
        description: 'Generate scoped statements of work from engagement templates.',
        status: 'coming-soon',
      },
      {
        name: 'Contract Generator',
        description: 'Assemble client contracts from approved Nexora templates.',
        status: 'coming-soon',
      },
      {
        name: 'Completion Reports',
        description: 'Produce delivery and project completion summaries for clients.',
        status: 'coming-soon',
      },
    ],
  },
  {
    id: 'sales',
    title: 'Sales',
    tools: [
      {
        name: 'Service Catalog',
        description: 'Reference current packages, positioning, and commercial options.',
        status: 'coming-soon',
      },
      {
        name: 'Website Care Plans',
        description: 'Present maintenance plans and ongoing website support options.',
        status: 'coming-soon',
      },
      {
        name: 'Sales Assets',
        description: 'Access decks, one-pagers, and reusable commercial materials.',
        status: 'coming-soon',
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    tools: [
      {
        name: 'Internal Documentation',
        description: 'Process guides and operating standards for the Nexora team.',
        status: 'coming-soon',
      },
      {
        name: 'Knowledge Base',
        description: 'Searchable answers for delivery, support, and implementation.',
        status: 'coming-soon',
      },
      {
        name: 'Future Internal Tools',
        description: 'Reserved for the next wave of Nexora operational tooling.',
        status: 'placeholder',
      },
    ],
  },
];

function ToolCard({ tool }) {
  const available = tool.status === 'available' && tool.href;
  const badge =
    tool.status === 'available'
      ? 'Available'
      : tool.status === 'placeholder'
        ? null
        : 'Coming Soon';

  const content = (
    <>
      <div className="internal-tool-card-top">
        <h3 className="internal-tool-card-name">{tool.name}</h3>
        {badge ? (
          <span
            className={`internal-tool-badge ${
              available
                ? 'internal-tool-badge--available'
                : 'internal-tool-badge--soon'
            }`}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <p className="internal-tool-card-desc">{tool.description}</p>
      {available ? (
        <span className="internal-tool-card-cta">
          Open tool
          <span aria-hidden="true">→</span>
        </span>
      ) : null}
    </>
  );

  if (available) {
    return (
      <Link
        to={tool.href}
        className="internal-tool-card internal-tool-card--available"
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`internal-tool-card ${
        tool.status === 'placeholder'
          ? 'internal-tool-card--placeholder'
          : 'internal-tool-card--soon'
      }`}
      aria-disabled="true"
    >
      {content}
    </div>
  );
}

export default function InternalLandingPage() {
  return (
    <div className="internal-landing-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Internal</p>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--white)',
              marginTop: 8,
              marginBottom: 16,
            }}
          >
            Nexora Internal Tools
          </h1>
          <div
            className="gold-divider"
            style={{ margin: '12px 0 20px', maxWidth: 400 }}
          >
            <div className="gold-divider-diamond" />
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'var(--gold)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              marginBottom: 16,
            }}
          >
            Business tools for documents, sales, and operations.
          </p>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 560,
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Central entry point for Nexora internal tooling. Not linked from the
            public site — bookmark this page for team use.
          </p>
        </div>
      </section>

      <section className="internal-landing-body">
        <div className="container">
          {SECTIONS.map((section) => (
            <div key={section.id} className="internal-tool-section">
              <p className="section-label">{section.title}</p>
              <div className="internal-tool-grid">
                {section.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
