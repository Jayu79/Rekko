import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import RekkoDashboard from './Dashboard'

export default function DashboardPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('rekko_auth') !== 'true') {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('rekko_auth')
    navigate('/')
  }, [navigate])

  if (sessionStorage.getItem('rekko_auth') !== 'true') {
    return null
  }

  return <RekkoDashboard onLogout={handleLogout} />
}
