import '@/styles/App.scss'
import { Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import router from '@/router'
import Layout from '@/layouts'

const App = () => (
  <HashRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          {
            router.map(i => (<Route path={i.path} key={i.path} element={i.element} />))
          }
      </Routes>
    </Suspense>
  </HashRouter>
)

export default App
