import { Button, Result } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const Page404 = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle={`Sorry, ${location.pathname} is not found.`}
      extra={<Button type="primary" onClick={() => navigate('/', { replace: true })}>Back Home</Button>}
    />
  )
}

export default Page404
