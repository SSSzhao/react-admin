import { PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageHeader } from 'antd'

type PropsType = PropsWithChildren & {
  title?: string,
  subTitle?: string
}

export default (props: PropsType) => {
  const location = useLocation()
  const navigate = useNavigate()
  const back = () => history.back()
  return <>
    <PageHeader
      onBack={back}
      title={props.title}
      subTitle={props.subTitle}
    />
    <div className='px-5'>
      { props.children }
    </div>
  </>
}
