import React from 'react'
import MessageLeft from '../components/MessageLeft'
import MessageRight from '../components/MessageRight'
import Navbar from '../components/Navbar'

const Message = () => {
  return (
    <>
    <Navbar />
    <div className='h-[90%] w-full flex bg-slate-900 overflow-y-hidden'>
      <MessageLeft />
      <MessageRight />
    </div>
    </>
  )
}

export default Message
