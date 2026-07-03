import LegalPage from './LegalPage';
import content from '../../../docs/legal/account_deletion.md?raw';

export default function AccountDeletionPage() {
  return <LegalPage content={content} pageTitle="Account Deletion Policy" />;
}
