import React, { useEffect } from 'react'

const UsersChat = ({ user }) => {
  useEffect(() => {
    console.log(user);
  }, [])
  return (
    <div className='w-full py-5 px-7 flex hover:bg-slate-600 rounded items-center'>
      <div>
        <img src={user.profilePic} className='w-14 h-14 object-cover rounded-full' alt="" />
      </div>
      <div className='ml-6'>
        <p className='text-xl'>{user.name}</p>
      </div>
    </div>
  )
}

export default UsersChat
