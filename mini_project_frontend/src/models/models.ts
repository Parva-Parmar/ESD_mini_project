// Shared frontend models aligned with Spring Boot backend and database

// --- Auth ---
export interface AuthRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  tokenType: string // e.g. "Bearer"
}

// --- Users / Accounts ---
export interface UserAccount {
  id: number
  email: string
  password: string
  roles: string // comma-separated, e.g. "ACCOUNTS"
}

// --- Employees ---
export interface Department {
  id: number
  // Add more fields here later if you expose them via an endpoint
}

export interface Employee {
  employeeId: number
  firstName: string | null
  lastName: string | null
  email: string
  title: string | null
  photographPath: string | null
  department: Department | null
}

// --- Salaries ---
export interface EmployeeSalary {
  id: number
  employee: Employee
  paymentDate: string // ISO date string, e.g. "2025-11-24"
  amount: string // use string for BigDecimal
  description: string | null
}

export interface SalaryDisbursementItem {
  employeeId: number
  amount: number
}

export interface SalaryDisbursementBatchRequest {
  items: SalaryDisbursementItem[]
  paymentDate: string
  description: string | null
}

export interface SalaryDisbursementResult {
  processedIds: number[]
  skippedIds: number[]
  errors: Record<string, string>
}

export interface PendingSalaryEmployee {
  employeeId: number
  firstName: string | null
  lastName: string | null
  email: string
  title: string | null
}

export interface SalaryStatus {
  employeeId: number
  firstName: string | null
  lastName: string | null
  email: string
  title: string | null
  amount: string
  status: 'PAID' | 'PENDING'
}
