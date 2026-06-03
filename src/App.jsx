import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import WebsiteDevelopment from './pages/services/WebsiteDevelopment';
import {
  WebApplicationsPage,
  WorkflowAutomationPage,
  AIConstructionPage,
  AIReceptionistsPage,
  CustomSolutionsPage,
} from './pages/services/OtherServicePages';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './index.css';

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/services/web-applications" element={<WebApplicationsPage />} />
            <Route path="/services/workflow-automation" element={<WorkflowAutomationPage />} />
            <Route path="/services/ai-construction" element={<AIConstructionPage />} />
            <Route path="/services/ai-receptionists" element={<AIReceptionistsPage />} />
            <Route path="/services/custom-solutions" element={<CustomSolutionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LangProvider>
  );
}
