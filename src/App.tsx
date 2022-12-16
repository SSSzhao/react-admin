import { useEffect } from 'react'
import { useLocation, Navigate, Routes, Route, Outlet } from 'react-router-dom'

import RouteLoading from '@/components/RouteLoading'
import Error404 from '@/pages/error/404'
import Layout from '@/layouts'
import { getToken } from '@/utils/token'
import { whitePaths } from '@/router'
import { observer } from 'mobx-react'
import userStore from '@/store/user'
import { AuthTypeEnum } from '@/api/types/role'
import PageIndex from '@/pages/views/index'
import type { AuthInfo } from '@/api/types/role'

const App = () => {
  const location = useLocation()
  const isWhite = whitePaths.includes(location.pathname)
  if (!getToken() && !isWhite) return <Navigate to="/login" replace={true} />

  useEffect(() => {
    (async () => {
      if (getToken() && !userStore.userInfo.id) {
        await userStore.getUserByToken()
      }
      await userStore.getUserAuthList()
    })()
  }, [])

  const getModule = require.context('@/pages/views', true, /[^components]/)

  const renderRoutes = (list: AuthInfo[], path: AuthInfo['url'] = '') => {
    if (!list || !list.length) return
    return [...list].filter(i => i.type === AuthTypeEnum.MENU).map(item => {
      const routePath = path + '/' + item.url
      const haveChild = item.children.filter(i => i.type === AuthTypeEnum.MENU).length
      let Component = null
      try {
        Component = haveChild ? Outlet : getModule('.' + routePath).default || Error404
      } catch {
        Component = Error404
      }

      return <Route path={routePath} key={routePath} element={<Component />}>
        {
          renderRoutes(item.children, routePath)
        }
      </Route>
    })
  }

  const LayoutPage = <Layout>
    <Routes>
      <Route path="/" element={<PageIndex />} />
      {renderRoutes(userStore.authList)}
    </Routes>
  </Layout>

  const render = userStore.authList.length
    ? LayoutPage
    : <RouteLoading />

  return render
}

export default observer(App)
