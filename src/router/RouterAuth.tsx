import { PropsWithChildren, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import RouteLoading from '@/components/RouteLoading'
import { getToken } from '@/utils/token'
import { whitePaths } from '@/router'
import { observer } from 'mobx-react'
import userStore from '@/store/user'

const RouterAuth = (props: PropsWithChildren) => {
  const location = useLocation()
  const isWhite = whitePaths.includes(location.pathname)
  if (!getToken() && !isWhite) return <Navigate to="/login" replace={true} />

  useEffect(() => {
    if (getToken() && !userStore.userInfo.id) {
      userStore.getUserByToken()
      userStore.getUserAuthList()
    }
  }, [])

  return <>
    <div>{userStore.userInfo.id || isWhite ? props.children : <RouteLoading />}</div>
  </>
}

export default observer(RouterAuth)
