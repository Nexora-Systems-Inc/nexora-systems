import { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { usePageMeta } from '../../hooks/usePageMeta';

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading page">
      <span className="page-loader-dot" />
    </div>
  );
}

export default function Layout({ children }) {
  usePageMeta();

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content" style={{ paddingTop: '72px' }}>
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
