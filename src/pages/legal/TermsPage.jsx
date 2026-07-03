import LegalPage from './LegalPage';
import content from '../../../docs/legal/terms_of_service.md?raw';

export default function TermsPage() {
  return <LegalPage content={content} pageTitle="Terms of Service" />;
}
