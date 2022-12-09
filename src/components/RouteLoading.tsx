import { Spin } from 'antd'

const RouteLoading = () => {
  return <div className='pt-[30vh] text-center'>
    <Spin size='large' tip="Loading..." />
  </div>
}

export default RouteLoading
