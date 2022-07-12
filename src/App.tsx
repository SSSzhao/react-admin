import '@/styles/App.scss'
import { Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import router from '@/router'
import RouterAuth from '@/router/RouterAuth'

const App = () => (
  <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterAuth>
          <Routes>
            {
              router.map(i => {
                return <Route path={i.path} key={i.key} element={i.element}>
                  {
                    i.children?.map(j => {
                      return <Route path={j.path} key={j.key} element={j.element} index={j.index} />
                    })
                  }
                </Route>
              })
            }
          </Routes>
        </RouterAuth>
      </Suspense>
    </HashRouter>
)

export default App
