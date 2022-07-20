import React from 'react'
import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DownOutlined
} from '@ant-design/icons'
import { Breadcrumb, Dropdown, Menu, Space } from 'antd'
import type { MenuProps } from 'antd'
import { observer } from 'mobx-react'
import appStore from '@/store/app'
import userStore from '@/store/user'

type ItemKeyType = 'logout'
type ItemType = {key: ItemKeyType; label: string}

const NavBar = () => {
  const { collapsed, changeCollapsed } = appStore

  const icon = (): React.ForwardRefExoticComponent<any> => {
    return collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  }

  const menuList: ItemType[] = [
    {
      key: 'logout',
      label: '注销'
    }
  ]
  const menuFn = {
    logout () {
      userStore.logout()
    }
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    menuFn[key as ItemKeyType]()
  }

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
      <Dropdown overlay={<Menu onClick={onClick} items={menuList} />}>
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
