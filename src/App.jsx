import { lazy } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { AI_RECEPTIONISTS_ENABLED } from './config/services';
import { LangProvider } from './context/LangContext';
import Layout from './components/layout/Layout';
import Analytics from './components/analytics/Analytics';
import ScrollToTop from './components/ScrollToTop';
import {
  WebApplicationsPage,
  WorkflowAutomationPage,
  AIReceptionistsPage,
  CustomSolutionsPage,
} from './pages/services/OtherServicePages';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const WebsiteDevelopment = lazy(() => import('./pages/services/WebsiteDevelopment'));
const CrewPilotPage = lazy(() => import('./pages/products/CrewPilotPage'));
const AshleyPage = lazy(() => import('./pages/AshleyPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const HolidayLaunchPage = lazy(() => import('./pages/HolidayLaunchPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const AccountDeletionPage = lazy(() => import('./pages/legal/AccountDeletionPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/services/web-applications" element={<WebApplicationsPage />} />
            <Route path="/services/workflow-automation" element={<WorkflowAutomationPage />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            <Route
              path="/services/ai-receptionists"
              element={
                AI_RECEPTIONISTS_ENABLED
                  ? <AIReceptionistsPage />
                  : <Navigate to="/services" replace />
              }
            />
            <Route path="/services/custom-solutions" element={<CustomSolutionsPage />} />
            <Route path="/products/crewpilot" element={<CrewPilotPage />} />
            <Route path="/ashley" element={<AshleyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/holiday-launch" element={<HolidayLaunchPage />} />
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
