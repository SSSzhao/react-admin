import { PropsWithChildren } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { getToken } from '@/utils/token'
import { whitePaths } from '@/router'
import { getUserByToken } from '@/api/user'

const RouterAuth = ({ children }: PropsWithChildren) => {
  const token = getToken()
  const location = useLocation()
  const isWhite = whitePaths.includes(location.pathname)
  // getUserByToken()
  if (!token && !isWhite) return <Navigate to="/login" replace={true} />

  return <div>{children}</div>
}

export default RouterAuth
