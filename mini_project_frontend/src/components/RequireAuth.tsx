import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation()
  const stored = localStorage.getItem('authToken')

  if (!stored) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
