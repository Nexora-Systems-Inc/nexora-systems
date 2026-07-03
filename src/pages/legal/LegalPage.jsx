import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './LegalPage.css';

const INTERNAL_LINKS = {
  './privacy_policy.md': '/privacy',
  './terms_of_service.md': '/terms',
  './account_deletion.md': '/account-deletion',
};

function MarkdownLink({ href, children }) {
  const resolved = INTERNAL_LINKS[href] || href;

  if (resolved.startsWith('/') && !resolved.startsWith('//')) {
    return <Link to={resolved}>{children}</Link>;
  }

  const isExternal = resolved.startsWith('http') || resolved.startsWith('mailto:');
  return (
    <a
      href={resolved}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

export default function LegalPage({ content, pageTitle }) {
  useEffect(() => {
    document.title = `${pageTitle} | Nexora Systems`;
    return () => {
      document.title = 'Nexora Systems';
    };
  }, [pageTitle]);

  return (
    <div className="legal-page">
      <section className="page-hero legal-hero">
        <div className="container">
          <p className="section-label">Legal</p>
          <div className="gold-divider" style={{ margin: '12px 0 0', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
        </div>
      </section>

      <section className="legal-content">
        <div className="container legal-content-inner">
          <ReactMarkdown
            components={{
              a: MarkdownLink,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </section>
    </div>
  );
}
