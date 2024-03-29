import React, { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Spin } from 'antd'
// import Layout from '@/layouts'

export const whitePaths = ['/login']

export interface IRouter {
  key: string
  path: string
  element: React.ReactNode
  meta?: {
    title: string
  }
  children?: IRouter[]
}

const router: IRouter[] = [
  {
    key: 'Login',
    path: '/login',
    element: lazyLoad(lazy(() => import('@/pages/views/login'))),
    meta: {
      title: '登录'
    }
  },
  {
    path: '*',
    key: '404',
    element: lazyLoad(lazy(() => import('@/pages/error/404'))),
    meta: {
      title: '404'
    }
  }
]

export default router

function lazyLoad (Comp: React.LazyExoticComponent<any>): React.ReactNode {
  return (
    <Suspense
      fallback={
        <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  )
}
