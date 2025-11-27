import type {
  AuthRequest,
  AuthResponse,
  SalaryDisbursementBatchRequest,
  SalaryDisbursementItem,
  SalaryDisbursementResult,
  PendingSalaryEmployee,
  SalaryStatus,
} from '../models/models'

const BASE_URL = 'http://localhost:8080'

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password } satisfies AuthRequest),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid email or password.')
    }
    throw new Error('Unable to login. Please try again later.')
  }

  return (await response.json()) as AuthResponse
}

function getAuthHeader(): HeadersInit {
  const stored = localStorage.getItem('authToken')
  if (!stored) return {}

  try {
    const parsed = JSON.parse(stored) as AuthResponse
    return { Authorization: `${parsed.tokenType} ${parsed.token}` }
  } catch {
    return {}
  }
}

export async function disburseSingle(body: SalaryDisbursementItem): Promise<SalaryDisbursementResult> {
  const response = await fetch(`${BASE_URL}/api/salaries/disburse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Not authorized to disburse salaries.')
    }
    throw new Error('Failed to disburse salary.')
  }

  return (await response.json()) as SalaryDisbursementResult
}

export async function getPendingSalaries(year: number, month: number): Promise<PendingSalaryEmployee[]> {
  const params = new URLSearchParams({ year: String(year), month: String(month) })
  const response = await fetch(`${BASE_URL}/api/salaries/pending?${params.toString()}`, {
    method: 'GET',
    headers: {
      ...getAuthHeader(),
    },
  })

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Not authorized to view pending salaries.')
    }
    throw new Error('Failed to load pending salaries.')
  }

  return (await response.json()) as PendingSalaryEmployee[]
}

export async function getSalaryStatus(year: number, month: number): Promise<SalaryStatus[]> {
  const params = new URLSearchParams({ year: String(year), month: String(month) })
  const response = await fetch(`${BASE_URL}/api/salaries/status?${params.toString()}`, {
    method: 'GET',
    headers: {
      ...getAuthHeader(),
    },
  })

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Not authorized to view salary status.')
    }
    throw new Error('Failed to load salary status.')
  }

  return (await response.json()) as SalaryStatus[]
}

export async function disburseBatch(body: SalaryDisbursementBatchRequest): Promise<SalaryDisbursementResult> {
  const response = await fetch(`${BASE_URL}/api/salaries/disburse-batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Not authorized to disburse salaries.')
    }
    throw new Error('Failed to disburse batch salaries.')
  }

  return (await response.json()) as SalaryDisbursementResult
}
