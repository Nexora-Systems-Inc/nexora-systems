/**
 * Lightweight proposal Markdown preprocessing.
 * Extracts cover metadata and normalizes page-break markers.
 * Does not depend on Mission Control's parser.
 */

const PAGE_BREAK_TOKEN = '¶pagebreak¶';

const META_KEYS = {
  client: 'client',
  'prepared for': 'preparedFor',
  'prepared by': 'preparedBy',
  date: 'date',
  classification: 'classification',
  reference: 'reference',
  version: 'version',
};

/**
 * @param {string} markdown
 * @returns {{
 *   title: string,
 *   meta: Record<string, string>,
 *   bodyMarkdown: string,
 * }}
 */
export function parseProposalMarkdown(markdown) {
  const raw = String(markdown || '').replace(/\r\n/g, '\n');
  const withBreaks = raw.replace(
    /<!--\s*pagebreak\s*-->/gi,
    `\n\n${PAGE_BREAK_TOKEN}\n\n`,
  );

  const lines = withBreaks.split('\n');
  let title = '';
  let titleIndex = -1;

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^#\s+(.+)$/);
    if (match) {
      title = match[1].trim();
      titleIndex = i;
      break;
    }
  }

  const meta = {};
  let bodyStart = titleIndex >= 0 ? titleIndex + 1 : 0;

  if (titleIndex >= 0) {
    let i = titleIndex + 1;
    while (i < lines.length) {
      const trimmed = lines[i].trim();
      if (!trimmed) {
        i += 1;
        continue;
      }
      if (trimmed === '---' || trimmed.startsWith('##') || trimmed === PAGE_BREAK_TOKEN) {
        break;
      }
      const metaMatch = trimmed.match(/^\*\*(.+?):\*\*\s*(.+)$/);
      if (metaMatch) {
        const key = metaMatch[1].trim().toLowerCase();
        const field = META_KEYS[key];
        if (field) {
          meta[field] = metaMatch[2].trim();
        }
        i += 1;
        bodyStart = i;
        continue;
      }
      break;
    }
    while (bodyStart < lines.length && !lines[bodyStart].trim()) {
      bodyStart += 1;
    }
    if (lines[bodyStart]?.trim() === '---') {
      bodyStart += 1;
      while (bodyStart < lines.length && !lines[bodyStart].trim()) {
        bodyStart += 1;
      }
    }
  }

  const bodyLines = titleIndex >= 0 ? lines.slice(bodyStart) : lines;
  const bodyMarkdown = bodyLines.join('\n').trim();

  return {
    title: title || 'Proposal',
    meta,
    bodyMarkdown,
  };
}

export { PAGE_BREAK_TOKEN };
