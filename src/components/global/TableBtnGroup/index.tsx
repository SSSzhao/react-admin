import { PropsWithChildren } from 'react'
import { Space } from 'antd'

type PropsType = PropsWithChildren

export default (props: PropsType) => {
  return <Space className='mb-5 flex justify-end'>
    { props.children }
  </Space>
}
