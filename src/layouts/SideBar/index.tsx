import React from 'react'
import { connect } from 'react-redux'
import { changeCollapsed } from '@/store/actions/app'
import { AppstoreOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Layout } from 'antd'

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
  getItem('用户管理', '1', <AppstoreOutlined />)
]

interface Props {
  collapsed: boolean;
}

const SideBar = (props: Props) => {
  const { collapsed } = props

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
  }

  return (
    <Sider className="sider" trigger={null} width={200} collapsible collapsed={collapsed}>
      <div className='logo'></div>
        <Menu
          className='mt-10'
          onClick={onClick}
          style={{ borderRight: 0 }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
    </Sider>
  )
}

const mapStateToProps = (state: any) => {
  return {
    collapsed: state.app.collapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
