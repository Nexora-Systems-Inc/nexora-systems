/**
 * Group heading/intro + image sequences into figure blocks so print/PDF
 * keeps diagrams with their context and avoids orphaned blank space.
 */

const IMAGE_LINE = /^!\[.*\]\(.*\)\s*$/;
const HEADING_LINE = /^#{2,6}\s+\S/;
const HR_LINE = /^(-{3,}|\*{3,}|_{3,})\s*$/;
const TABLE_LINE = /^\|/;
const LIST_LINE = /^(\s*[-*+]|\s*\d+\.)\s+/;
const PAGE_BREAK_LINE = /^¶pagebreak¶\s*$/;

/**
 * @param {string} markdown
 * @returns {{ type: 'content' | 'figure', markdown: string }[]}
 */
export function groupProposalBodyBlocks(markdown) {
  const source = String(markdown || '').replace(/\r\n/g, '\n');
  if (!source.trim()) return [];

  const lines = source.split('\n');
  const blocks = [];
  let buffer = [];
  let i = 0;

  const flush = () => {
    const text = buffer.join('\n').trim();
    if (text) blocks.push({ type: 'content', markdown: text });
    buffer = [];
  };

  while (i < lines.length) {
    const matched = tryMatchFigureGroup(lines, i);
    if (matched) {
      flush();
      blocks.push({ type: 'figure', markdown: matched.markdown });
      i = matched.nextIndex;
      continue;
    }
    buffer.push(lines[i]);
    i += 1;
  }

  flush();
  return blocks;
}

/**
 * Match: optional heading, optional short intro paragraphs, then an image.
 * @param {string[]} lines
 * @param {number} start
 */
function tryMatchFigureGroup(lines, start) {
  let i = start;

  while (i < lines.length && !lines[i].trim()) i += 1;
  if (i >= lines.length) return null;

  const chunk = [];
  let sawHeading = false;
  let paragraphCount = 0;

  if (HEADING_LINE.test(lines[i])) {
    chunk.push(lines[i]);
    sawHeading = true;
    i += 1;
    while (i < lines.length && !lines[i].trim()) {
      chunk.push(lines[i]);
      i += 1;
    }
  }

  while (i < lines.length && paragraphCount < 2) {
    if (!lines[i].trim()) {
      chunk.push(lines[i]);
      i += 1;
      continue;
    }
    if (IMAGE_LINE.test(lines[i])) break;
    if (
      HEADING_LINE.test(lines[i]) ||
      HR_LINE.test(lines[i]) ||
      TABLE_LINE.test(lines[i]) ||
      LIST_LINE.test(lines[i]) ||
      PAGE_BREAK_LINE.test(lines[i]) ||
      lines[i].trim().startsWith('```')
    ) {
      return null;
    }

    // Consume one paragraph (consecutive non-blank lines)
    while (i < lines.length && lines[i].trim()) {
      if (IMAGE_LINE.test(lines[i]) || HEADING_LINE.test(lines[i])) break;
      chunk.push(lines[i]);
      i += 1;
    }
    paragraphCount += 1;

    while (i < lines.length && !lines[i].trim()) {
      chunk.push(lines[i]);
      i += 1;
    }
  }

  while (i < lines.length && !lines[i].trim()) {
    chunk.push(lines[i]);
    i += 1;
  }

  if (i >= lines.length || !IMAGE_LINE.test(lines[i])) {
    // Lone image with no preceding context still counts as a figure block
    if (!sawHeading && paragraphCount === 0) {
      let j = start;
      while (j < lines.length && !lines[j].trim()) j += 1;
      if (j < lines.length && IMAGE_LINE.test(lines[j])) {
        return {
          markdown: lines[j],
          nextIndex: j + 1,
        };
      }
    }
    return null;
  }

  chunk.push(lines[i]);
  i += 1;

  // Optional blank lines after image (keep inside block)
  while (i < lines.length && !lines[i].trim()) {
    chunk.push(lines[i]);
    i += 1;
  }

  const markdown = chunk.join('\n').trim();
  if (!markdown) return null;

  return { markdown, nextIndex: i };
}
