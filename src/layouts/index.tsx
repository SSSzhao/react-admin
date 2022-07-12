import './index.scss'
import { Layout } from 'antd'

import NavBar from './NavBar'
import SideBar from './SideBar'
import AppMain from './AppMain'

const { Header, Content } = Layout

const MainLayout = () => {
  return (
    <Layout className='page'>
      <SideBar />
      <Layout>
        <Header className='header'>
          <NavBar />
        </Header>
        <Content>
          <AppMain />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
