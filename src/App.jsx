import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Layout from './components/layout/Layout';
import Analytics from './components/analytics/Analytics';
import {
  WebApplicationsPage,
  WorkflowAutomationPage,
  AIConstructionPage,
  AIReceptionistsPage,
  CustomSolutionsPage,
} from './pages/services/OtherServicePages';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const WebsiteDevelopment = lazy(() => import('./pages/services/WebsiteDevelopment'));
const CrewPilotPage = lazy(() => import('./pages/products/CrewPilotPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const AccountDeletionPage = lazy(() => import('./pages/legal/AccountDeletionPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Analytics />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/services/web-applications" element={<WebApplicationsPage />} />
            <Route path="/services/workflow-automation" element={<WorkflowAutomationPage />} />
            <Route path="/services/ai-construction" element={<AIConstructionPage />} />
            <Route path="/services/ai-receptionists" element={<AIReceptionistsPage />} />
            <Route path="/services/custom-solutions" element={<CustomSolutionsPage />} />
            <Route path="/products/crewpilot" element={<CrewPilotPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/account-deletion" element={<AccountDeletionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LangProvider>
  );
}
