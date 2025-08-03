import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RestaurantProvider } from './context/RestaurantContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import AuditPage from './pages/AuditPage'
import OptimizationPage from './pages/OptimizationPage'
import SubscriptionPage from './pages/SubscriptionPage'
import { ToastContainer } from './components/ui'
import { useToast } from './hooks/useToast'

function App() {
  const { toasts, removeToast } = useToast()
  
  return (
    <RestaurantProvider>
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/optimization" element={<OptimizationPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
          </Routes>
        </main>
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </RestaurantProvider>
  )
}

export default App
