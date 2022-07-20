import { PropsWithChildren, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getToken } from '@/utils/token'
import { whitePaths } from '@/router'
import { observer } from 'mobx-react'
import userStore from '@/store/user'

let isExec = false
const RouterAuth = (props: PropsWithChildren) => {
  const location = useLocation()
  const isWhite = whitePaths.includes(location.pathname)
  if (!getToken() && !isWhite) return <Navigate to="/login" replace={true} />

  if (getToken() && !userStore.userInfo.id && !isExec) {
    (async () => {
      isExec = true
      await userStore.getUserByToken()
      isExec = false
    })()
  }

  return <div>{userStore.userInfo.id || isWhite ? props.children : ''}</div>
}

export default observer(RouterAuth)
