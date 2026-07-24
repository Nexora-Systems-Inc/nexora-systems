import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ReportPage } from './pages/ReportPage'
import { DemoPlaceholderPage } from './pages/DemoPlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:slug" element={<ReportPage />} />
      <Route path="/:slug/demo" element={<DemoPlaceholderPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
