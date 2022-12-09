import React from 'react'
import { AppstoreOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Layout } from 'antd'
import { observer } from 'mobx-react'
import appStore from '@/store/app'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

function getItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('首页', '1', <AppstoreOutlined />),
  getItem('用户管理', '2', <AppstoreOutlined />)
]

const SideBar = () => {
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
  }

  return (
    <Sider className="sider" trigger={null} width={200} collapsible collapsed={appStore.collapsed}>
      <div className='logo'></div>
        <Menu
          onClick={onClick}
          style={{ borderRight: 0 }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
    </Sider>
  )
}

export default observer(SideBar)
