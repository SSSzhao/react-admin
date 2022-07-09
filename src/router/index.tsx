import React, { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { Spin } from 'antd'
import Layout from '@/layouts'

export interface IRouter extends RouteObject {
  meta?: {
    title: string
  },
  children?: IRouter[]
}

const router: IRouter[] = [
  {
    path: '/',
    element: <Layout />
  },
  {
    path: '*',
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
