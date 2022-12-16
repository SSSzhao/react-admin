import { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHeader } from 'antd'

type PropsType = PropsWithChildren

export default (props: PropsType) => {
  const location = useLocation()
  console.log(location)
  return <div>
    <PageHeader
      className="site-page-header"
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
    />
    { props.children }
  </div>
}
