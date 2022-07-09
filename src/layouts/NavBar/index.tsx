import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import React from 'react'
import { connect } from 'react-redux'
import { changeCollapsed } from '@/store/actions/app'

interface Props {
  collapsed: boolean;
  changeCollapsed: typeof changeCollapsed
}

const NavBar = (props: Props) => {
  const { collapsed, changeCollapsed } = props

  const icon = (): React.ForwardRefExoticComponent<any> => {
    return collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  }

  return (
    <div>
      <Icon component={icon()} onClick={changeCollapsed} style={{ fontSize: '20px' }}/>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
