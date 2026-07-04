import { copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_ROOT = path.resolve(ROOT, '../../voice-intake-app/marketing/screenshots');
const DEST_ROOT = path.join(ROOT, 'public/products/crewpilot/screenshots');

const WEBSITE_GALLERY = [
  '02-kpi-dashboard-full.png',
  '03-projects-hub-portfolio.png',
  '07-estimate-pipeline.png',
  '09-payroll-queue-unpaid-week.png',
  '11-invoice-horizon-draft.png',
  '14-estimate-pdf-header.png',
];

mkdirSync(DEST_ROOT, { recursive: true });

for (const file of WEBSITE_GALLERY) {
  copyFileSync(path.join(SOURCE_ROOT, file), path.join(DEST_ROOT, file));
  console.log(`synced ${file}`);
}

console.log(`[sync-crewpilot-screenshots] ${WEBSITE_GALLERY.length} website gallery assets updated.`);
