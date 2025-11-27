import { type FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { login } from '../utils/api'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const oauthError = params.get('oauthError')
    if (oauthError) {
      setError(oauthError)
      navigate('/login', { replace: true })
    }
  }, [location.search, navigate])

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)
    try {
      const response = await login(email, password)
      localStorage.setItem('authToken', JSON.stringify(response))
      localStorage.setItem('currentUserEmail', email)
      const state = location.state as { from?: Location } | undefined
      const target = state?.from?.pathname ?? '/dashboard'
      navigate(target, { replace: true })
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Enter your credentials to continue.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="you@example.com"
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" className="login-button" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
