import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { disburseSingle, getPendingSalaries } from '../utils/api'
import type { PendingSalaryEmployee, SalaryDisbursementItem } from '../models/models'
import './SingleDisbursementPage.css'

function SingleDisbursementPage() {
  const [employeeId, setEmployeeId] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<PendingSalaryEmployee[]>([])
  const [employeesError, setEmployeesError] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    const loadEmployees = async () => {
      try {
        const data = await getPendingSalaries(year, month)
        setEmployees(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setEmployeesError(err.message)
        } else {
          setEmployeesError('Failed to load employees.')
        }
      }
    }

    void loadEmployees()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!employeeId || !amount) {
      setError('Please select an employee and enter an amount.')
      return
    }

    setLoading(true)
    try {
      const empIdNum = Number(employeeId)
      const amountNum = Number(amount)
      if (!Number.isFinite(empIdNum) || !Number.isFinite(amountNum)) {
        setError('Employee ID and amount must be valid numbers.')
        return
      }
      const payload: SalaryDisbursementItem = { employeeId: empIdNum, amount: amountNum }
      await disburseSingle(payload)
      setMessage('Salary disbursed successfully.')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to disburse salary.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="single-root">
      <div className="single-card">
        <h1>Single Salary Disbursement</h1>
        <form onSubmit={handleSubmit} className="single-form">
          <label>
            Employee
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="single-input"
            >
              <option value="">Select an employee...</option>
              {employees.map((emp) => {
                const name = [emp.firstName, emp.lastName].filter(Boolean).join(' ') || emp.email
                return (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {`ID-${emp.employeeId} Name: ${name}`}
                  </option>
                )
              })}
            </select>
          </label>
          <label>
            Amount
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="single-input"
              placeholder="e.g. 50000"
            />
          </label>
          {employeesError && <div className="single-error">{employeesError}</div>}
          {error && <div className="single-error">{error}</div>}
          {message && <div className="single-message">{message}</div>}
          <button className="single-button" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Disburse'}
          </button>
          <Link to="/dashboard" className="single-back-button">
            Back to Dashboard
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SingleDisbursementPage
