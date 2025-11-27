import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { disburseBatch, getPendingSalaries } from '../utils/api'
import type {
  PendingSalaryEmployee,
  SalaryDisbursementBatchRequest,
  SalaryDisbursementItem,
} from '../models/models'
import './BatchDisbursementPage.css'

interface BatchItemInput {
  employeeId: string
  amount: string
}

function BatchDisbursementPage() {
  const [items, setItems] = useState<BatchItemInput[]>([{ employeeId: '', amount: '' }])
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

  const updateItem = (index: number, field: keyof BatchItemInput, value: string) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const addRow = () => setItems((prev) => [...prev, { employeeId: '', amount: '' }])

  const removeRow = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    const parsedItems: SalaryDisbursementItem[] = []
    for (const item of items) {
      if (!item.employeeId || !item.amount) continue
      const empId = Number(item.employeeId)
      const amt = Number(item.amount)
      if (!Number.isFinite(empId) || !Number.isFinite(amt)) {
        setError('All employee IDs and amounts must be valid numbers.')
        return
      }
      parsedItems.push({ employeeId: empId, amount: amt })
    }

    if (!parsedItems.length) {
      setError('Please enter at least one valid row.')
      return
    }

    setLoading(true)
    try {
      const today = new Date().toISOString().slice(0, 10)
      const payload: SalaryDisbursementBatchRequest = {
        paymentDate: today,
        description: null,
        items: parsedItems,
      }
      await disburseBatch(payload)
      setMessage('Batch salary disbursement completed successfully.')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to disburse batch salaries.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="batch-root">
      <div className="batch-card">
        <h1>Batch Salary Disbursement</h1>
        <form className="batch-form" onSubmit={handleSubmit}>
          <div className="batch-items">
            {items.map((item, index) => (
              <div className="batch-item-row" key={index}>
                <select
                  className="batch-input"
                  value={item.employeeId}
                  onChange={(e) => updateItem(index, 'employeeId', e.target.value)}
                >
                  <option value="">Add employee for disbursement...</option>
                  {employees.map((emp) => {
                    const name = [emp.firstName, emp.lastName].filter(Boolean).join(' ') || emp.email
                    return (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {`ID-${emp.employeeId} Name: ${name}`}
                      </option>
                    )
                  })}
                </select>
                <input
                  className="batch-input"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => updateItem(index, 'amount', e.target.value)}
                />
                <button
                  type="button"
                  className="batch-remove"
                  onClick={() => removeRow(index)}
                  disabled={items.length === 1}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="batch-clear"
                  onClick={() => {
                    updateItem(index, 'employeeId', '')
                    updateItem(index, 'amount', '0')
                  }}
                >
                  Clear
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="batch-add" onClick={addRow}>
            Add Row
          </button>

          {employeesError && <div className="batch-error">{employeesError}</div>}
          {error && <div className="batch-error">{error}</div>}
          {message && <div className="batch-message">{message}</div>}

          <button type="submit" className="batch-submit" disabled={loading}>
            {loading ? 'Processing...' : 'Disburse Batch'}
          </button>
          <Link to="/dashboard" className="batch-back-button">
            Back to Dashboard
          </Link>
        </form>
      </div>
    </div>
  )
}

export default BatchDisbursementPage
