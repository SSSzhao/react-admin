import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { ConfigProvider, Popconfirm } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

export default () => {
  const defaultColor = {
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff'
  }
  const [color, setColor] = useState(defaultColor)

  const onColorChange = (nextColor: Partial<typeof color>) => {
    const mergedNextColor = {
      ...color,
      ...nextColor
    }
    setColor(mergedNextColor)
  }

  const onConfirm = () => {
    ConfigProvider.config({
      theme: color
    })
  }

  return <Popconfirm
    title={
      <SketchPicker
        presetColors={['#1890ff', '#25b864', '#6959CD', '#ff6f00']}
        color={color.primaryColor}
        onChange={({ hex }) => {
          onColorChange({
            primaryColor: hex
          })
        }}
      />
    }
    icon=""
    okText="确认"
    cancelText="取消"
    onConfirm={onConfirm}
  >
    <div className='absolute top-10 right-0 z-10 shadow-lg w-10 h-10 bg-white flex items-center justify-center rounded-l-lg'>
      <SettingOutlined style={{ fontSize: '16px' }} />
    </div>
  </Popconfirm>
}
