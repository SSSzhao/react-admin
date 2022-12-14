import { PropsWithChildren } from 'react'
import './index.less'

type PropsType = PropsWithChildren & {
  x?: boolean,
  y?: boolean
}

export default (props: PropsType) => {
  const overflowClass = [
    'scrollbar',
    props.y ? 'overflow-y-auto' : 'overflow-y-hidden',
    props.x ? 'overflow-x-auto' : 'overflow-x-hidden'
  ].join(' ')

  return <div className={overflowClass}>{ props.children }</div>
}
