import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PAGE_BREAK_TOKEN, parseProposalMarkdown } from './parseProposalMarkdown';
import {
  DEFAULT_ORIENTATION,
  getOrientationConfig,
} from './proposalRendererSettings';
import './ProposalDocument.css';

function isPageBreakParagraph(children) {
  const text = flattenText(children).trim();
  return text === PAGE_BREAK_TOKEN;
}

function flattenText(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join('');
  if (node.props?.children) return flattenText(node.props.children);
  return '';
}

function MarkdownParagraph({ children }) {
  if (isPageBreakParagraph(children)) {
    return <div className="proposal-page-break" aria-hidden="true" />;
  }
  return <p>{children}</p>;
}

function MarkdownTable({ children }) {
  return (
    <div className="proposal-table-wrap">
      <table>{children}</table>
    </div>
  );
}

function MarkdownImage(props) {
  const { alt = '', ...rest } = props;
  return (
    <figure className="proposal-figure">
      <img alt={alt} {...rest} />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  );
}

const markdownComponents = {
  p: MarkdownParagraph,
  table: MarkdownTable,
  img: MarkdownImage,
};

/**
 * Split cover metadata on the first comma for a two-line presentation.
 * Markdown stays unchanged; only the rendered value is split.
 * @param {string} value
 * @returns {{ primary: string, secondary: string | null }}
 */
function splitMetaValue(value) {
  const text = String(value || '').trim();
  const commaIndex = text.indexOf(',');
  if (commaIndex === -1) {
    return { primary: text, secondary: null };
  }
  const primary = text.slice(0, commaIndex).trim();
  const secondary = text.slice(commaIndex + 1).trim();
  if (!primary || !secondary) {
    return { primary: text, secondary: null };
  }
  return { primary, secondary };
}

function MetaValue({ value }) {
  const { primary, secondary } = splitMetaValue(value);
  if (!secondary) {
    return primary;
  }
  return (
    <span className="proposal-cover-meta-value">
      <span className="proposal-cover-meta-primary">{primary}</span>
      <span className="proposal-cover-meta-secondary">{secondary}</span>
    </span>
  );
}

/**
 * Branded proposal document surface.
 * Renders Markdown into a premium consulting-style layout.
 *
 * @param {{
 *   markdown: string,
 *   orientation?: import('./proposalRendererSettings').ProposalOrientation,
 *   className?: string,
 * }} props
 */
export default function ProposalDocument({
  markdown,
  orientation = DEFAULT_ORIENTATION,
  className = '',
}) {
  const { title, meta, bodyMarkdown } = useMemo(
    () => parseProposalMarkdown(markdown),
    [markdown],
  );

  const page = getOrientationConfig(orientation);
  const preparedBy = meta.preparedBy || 'Nexora Systems';
  const classification = meta.classification || 'Confidential';
  const dateLabel =
    meta.date ||
    new Date().toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <article
      className={`proposal-document proposal-document--${page.id} ${className}`.trim()}
      data-orientation={page.id}
      style={{
        '--proposal-page-width': `${page.pageWidthIn}in`,
        '--proposal-page-height': `${page.pageHeightIn}in`,
      }}
      aria-label={title}
    >
      <header className="proposal-cover">
        <div className="proposal-cover-brand">
          <span className="proposal-cover-mark" aria-hidden="true">
            N
          </span>
          <div className="proposal-cover-brand-text">
            <div className="proposal-cover-name">Nexora Systems</div>
            <div className="proposal-cover-tagline">
              Where intelligence comes to life.
            </div>
          </div>
        </div>

        <div className="proposal-cover-rule" aria-hidden="true" />

        <p className="proposal-cover-eyebrow">Proposal</p>
        <h1 className="proposal-cover-title">{title}</h1>

        <dl className="proposal-cover-meta">
          {meta.client ? (
            <div className="proposal-cover-meta-row">
              <dt>Client</dt>
              <dd>
                <MetaValue value={meta.client} />
              </dd>
            </div>
          ) : null}
          {meta.preparedFor ? (
            <div className="proposal-cover-meta-row">
              <dt>Prepared for</dt>
              <dd>
                <MetaValue value={meta.preparedFor} />
              </dd>
            </div>
          ) : null}
          <div className="proposal-cover-meta-row">
            <dt>Date</dt>
            <dd>
              <MetaValue value={dateLabel} />
            </dd>
          </div>
          <div className="proposal-cover-meta-row">
            <dt>Prepared by</dt>
            <dd>
              <MetaValue value={preparedBy} />
            </dd>
          </div>
          {meta.reference ? (
            <div className="proposal-cover-meta-row">
              <dt>Reference</dt>
              <dd>
                <MetaValue value={meta.reference} />
              </dd>
            </div>
          ) : null}
          {meta.version ? (
            <div className="proposal-cover-meta-row">
              <dt>Version</dt>
              <dd>
                <MetaValue value={meta.version} />
              </dd>
            </div>
          ) : null}
          <div className="proposal-cover-meta-row">
            <dt>Classification</dt>
            <dd>
              <MetaValue value={classification} />
            </dd>
          </div>
        </dl>

        <div className="proposal-cover-footer">
          <span>nexorasystems.ca</span>
        </div>
      </header>

      <div className="proposal-body">
        {bodyMarkdown ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {bodyMarkdown}
          </ReactMarkdown>
        ) : (
          <p className="proposal-empty">
            Add Markdown content to preview the proposal body.
          </p>
        )}
      </div>

      <footer className="proposal-doc-footer">
        <span>Nexora Systems</span>
        <span className="proposal-doc-footer-sep" aria-hidden="true">
          ·
        </span>
        <span>{classification}</span>
        {meta.reference ? (
          <>
            <span className="proposal-doc-footer-sep" aria-hidden="true">
              ·
            </span>
            <span>{meta.reference}</span>
          </>
        ) : null}
      </footer>
    </article>
  );
}
