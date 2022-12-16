import { PropsWithChildren } from 'react'
import ColorPicker from '@/components/global/ColorPicker'

const AppMain = ({ children }: PropsWithChildren) => {
  return (
    <div className='relative h-full p-5'>
      <ColorPicker />
      <div className='h-full bg-white shadow-xl'>
        { children }
      </div>
    </div>
  )
}

export default AppMain
