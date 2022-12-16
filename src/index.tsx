import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

import '@/styles/App.css'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/views/login'
import Error404 from '@/pages/error/404'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <StrictMode>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<App />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ConfigProvider>
  // </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
