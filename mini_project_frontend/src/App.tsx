import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SingleDisbursementPage from './pages/SingleDisbursementPage'
import BatchDisbursementPage from './pages/BatchDisbursementPage'
import OAuthSuccessPage from './pages/OAuthSuccessPage'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/success" element={<OAuthSuccessPage />} />
        <Route
          path="/dashboard"
          element={(
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/salaries/disburse"
          element={(
            <RequireAuth>
              <SingleDisbursementPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/salaries/disburse-batch"
          element={(
            <RequireAuth>
              <BatchDisbursementPage />
            </RequireAuth>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
