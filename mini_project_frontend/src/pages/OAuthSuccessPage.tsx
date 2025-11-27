import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function OAuthSuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const tokenType = params.get('tokenType')
    const email = params.get('email')

    if (token && tokenType) {
      localStorage.setItem('authToken', JSON.stringify({ token, tokenType }))
      if (email) {
        localStorage.setItem('currentUserEmail', email)
      }
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }, [location.search, navigate])

  return null
}

export default OAuthSuccessPage
