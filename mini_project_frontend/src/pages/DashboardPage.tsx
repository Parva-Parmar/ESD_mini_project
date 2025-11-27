import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSalaryStatus } from '../utils/api'
import type { SalaryStatus } from '../models/models'
import './DashboardPage.css'

function DashboardPage() {
  const navigate = useNavigate()
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [rows, setRows] = useState<SalaryStatus[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const storedEmail = localStorage.getItem('currentUserEmail')
    if (storedEmail) {
      setCurrentUserEmail(storedEmail)
    }

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getSalaryStatus(year, month)
        setRows(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Failed to load pending salaries.')
        }
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [year, month])

  const monthLabel = new Date(year, month - 1, 1).toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUserEmail')
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard-root">
      <div className="dashboard-profile-wrapper">
        <button type="button" className="dashboard-profile">
          {(currentUserEmail && currentUserEmail.charAt(0).toUpperCase()) || 'A'}
        </button>
        <div className="dashboard-profile-tooltip">
          {currentUserEmail || 'Unknown account'}
        </div>
      </div>
      <header className="dashboard-header">
        <h1 className="dashboard-title">Accounts Dashboard</h1>
        <button type="button" className="dashboard-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>Monthly Salary Status</h2>
          <p className="dashboard-subtitle">Per-employee salary amount and status for the selected month.</p>

          <div className="dashboard-filters">
            <label>
              Month
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="dashboard-select"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(year, m - 1, 1).toLocaleString(undefined, { month: 'long' })}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Year
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="dashboard-input"
              />
            </label>
            <div className="dashboard-current">Showing for {monthLabel}</div>
          </div>

          {loading && <div className="dashboard-info">Loading salary status...</div>}
          {error && <div className="dashboard-error">{error}</div>}

          {!loading && !error && (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="dashboard-empty">
                      No salary records for {monthLabel}.
                    </td>
                  </tr>
                ) : (
                  rows.map((e) => (
                    <tr key={e.employeeId}>
                      <td>{e.employeeId}</td>
                      <td>{[e.firstName, e.lastName].filter(Boolean).join(' ') || '-'}</td>
                      <td>{e.email}</td>
                      <td>{e.title ?? '-'}</td>
                      <td>{e.amount}</td>
                      <td>{e.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </section>

        <nav className="dashboard-nav">
          <Link to="/salaries/disburse" className="dashboard-link">
            Disburse Single Salary
          </Link>
          <Link to="/salaries/disburse-batch" className="dashboard-link">
            Disburse Batch Salaries
          </Link>
        </nav>
      </main>
    </div>
  )
}

export default DashboardPage
