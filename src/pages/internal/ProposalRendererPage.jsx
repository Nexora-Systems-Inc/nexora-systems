import { useCallback, useDeferredValue, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProposalDocument from '../../components/proposal/ProposalDocument';
import {
  DEFAULT_ORIENTATION,
  buildPrintPageCss,
} from '../../components/proposal/proposalRendererSettings';
import { SAMPLE_PROPOSAL_MARKDOWN } from '../../components/proposal/sampleProposal';
import './ProposalRendererPage.css';

export default function ProposalRendererPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_PROPOSAL_MARKDOWN);
  const deferredMarkdown = useDeferredValue(markdown);
  /** Renderer setting — landscape by default; portrait reserved for future docs. */
  const [orientation] = useState(DEFAULT_ORIENTATION);

  const handlePrint = useCallback(() => {
    document.body.classList.add('proposal-printing');
    document.body.dataset.proposalOrientation = orientation;
    window.print();
  }, [orientation]);

  useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-proposal-print-page', '');
    style.textContent = buildPrintPageCss(orientation);
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [orientation]);

  useEffect(() => {
    const clear = () => {
      document.body.classList.remove('proposal-printing');
      delete document.body.dataset.proposalOrientation;
    };
    window.addEventListener('afterprint', clear);
    return () => {
      window.removeEventListener('afterprint', clear);
      clear();
    };
  }, []);

  return (
    <div
      className="proposal-renderer-page"
      data-orientation={orientation}
    >
      <header className="proposal-renderer-chrome no-print">
        <div className="proposal-renderer-chrome-inner">
          <div className="proposal-renderer-chrome-copy">
            <p className="section-label">
              <Link to="/internal" className="proposal-renderer-back">
                Internal
              </Link>
            </p>
            <h1 className="proposal-renderer-title">Proposal Renderer</h1>
            <p className="proposal-renderer-desc">
              Paste Markdown, preview the branded landscape document, then print
              or save as PDF.
            </p>
          </div>
          <div className="proposal-renderer-actions">
            <button
              type="button"
              className="btn-outline-dark"
              onClick={() => setMarkdown(SAMPLE_PROPOSAL_MARKDOWN)}
            >
              Load sample
            </button>
            <button type="button" className="btn-gold" onClick={handlePrint}>
              Print / Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className="proposal-renderer-workspace">
        <section
          className="proposal-renderer-editor no-print"
          aria-label="Markdown source"
        >
          <div className="proposal-renderer-panel-label">Markdown</div>
          <textarea
            className="proposal-renderer-textarea"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
            aria-label="Proposal Markdown"
          />
          <p className="proposal-renderer-hint">
            Cover fields use lines like <code>**Client:** Acme Corp</code> under
            the title. Insert <code>&lt;!-- pagebreak --&gt;</code> for print page
            breaks. Images use standard Markdown:{' '}
            <code>![Alt text](/images/proposals/diagram.png)</code>
          </p>
        </section>

        <section
          className="proposal-renderer-preview"
          aria-label="Proposal preview"
        >
          <div className="proposal-renderer-panel-label no-print">Preview</div>
          <div className="proposal-renderer-preview-frame">
            <ProposalDocument
              markdown={deferredMarkdown}
              orientation={orientation}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
