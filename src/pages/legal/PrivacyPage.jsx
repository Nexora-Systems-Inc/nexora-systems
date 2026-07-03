import LegalPage from './LegalPage';
import content from '../../../docs/legal/privacy_policy.md?raw';

export default function PrivacyPage() {
  return <LegalPage content={content} pageTitle="Privacy Policy" />;
}
