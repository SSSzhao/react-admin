import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppstoreOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Layout } from 'antd'
import Scrollbar from '@/components/global/Scrollbar'
import { observer } from 'mobx-react'
import appStore from '@/store/app'
import userStore from '@/store/user'
import { AuthTypeEnum } from '@/api/types/role'
import type { AuthInfo } from '@/api/types/role'

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

const SideBar = () => {
  const getMenus = (list: AuthInfo[], path: AuthInfo['url'] = ''):MenuItem[] => {
    if (!list || !list.length) return []
    return list.filter(i => i.type === AuthTypeEnum.MENU).map(i => {
      const routePath = path + '/' + i.url
      const child = getMenus(i.children, routePath)
      return getItem(i.name, routePath, <></>, child.length ? child : undefined)
    })
  }

  const items: MenuProps['items'] = [
    getItem('首页', '/', <AppstoreOutlined />),
    ...(userStore.authList.length
      ? getMenus(userStore.authList)
      : [])
  ]

  const location = useLocation()
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = item => {
    return navigate(item.key)
  }

  return (
    <Sider className="sider" trigger={null} width={200} collapsible collapsed={appStore.collapsed}>
      <div className='logo'>{location.pathname}</div>
      <Scrollbar y>
        <Menu
          onClick={onClick}
          style={{ borderRight: 0 }}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Scrollbar>
    </Sider>
  )
}

export default observer(SideBar)
