import { PropsWithChildren } from 'react'
import ColorPicker from '@/components/global/ColorPicker'
import Scrollbar from '@/components/global/Scrollbar'

const AppMain = ({ children }: PropsWithChildren) => {
  return (
    <div className='main relative p-5'>
      <ColorPicker />
      <Scrollbar y className='bg-white shadow-xl'>
        { children }
      </Scrollbar>
    </div>
  )
}

export default AppMain
