import { PropsWithChildren } from 'react'
import { Layout } from 'antd'
import NavBar from './NavBar'
import SideBar from './SideBar'
import AppMain from './AppMain'
import '@/styles/layout.less'

const { Header, Content } = Layout

export default ({ children }: PropsWithChildren) => {
  return <Layout className='page'>
    <SideBar />
    <Layout>
      <Header className='header'>
        <NavBar />
      </Header>
      <Content>
        <AppMain>
          { children }
        </AppMain>
      </Content>
    </Layout>
  </Layout>
}
