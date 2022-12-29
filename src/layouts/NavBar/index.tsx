import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DownOutlined
} from '@ant-design/icons'
import { Breadcrumb, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { observer } from 'mobx-react'
import appStore from '@/store/app'
import userStore from '@/store/user'

const NavBar = () => {
  const { collapsed, changeCollapsed } = appStore
  const navigate = useNavigate()

  const icon = (): React.ForwardRefExoticComponent<any> => {
    return collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  }

  const logout = () => {
    userStore.logout()
    navigate('/login')
  }

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: <span onClick={logout}>注销</span>
    }
  ]

  return (
    <div className='h-full flex items-center justify-between'>
      <div className='flex items-center'>
        <Icon component={icon()} onClick={changeCollapsed} className='mr-5 text-xl'/>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Dropdown menu={{ items }}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            {userStore.userInfo.nickname}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default observer(NavBar)
