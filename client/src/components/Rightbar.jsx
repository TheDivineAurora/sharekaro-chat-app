import React from 'react'

const users = [
  { 
    _id: "1",
    name: "Ellie Jonah",
    profileImage: "/pfp.webp"
  },
]
const Rightbar = () => {
  return (
    <div className=''>
      <ul className="mt-4 mx-4">
        <h1 className='font-medium p-3'>Online - {users.length}</h1>
        {users.map(user => (
          <li key={user._id} className='flex items-center text-center text-md gap-4 p-2 hover:bg-gray-100 rounded-md'>
            <div className='relative p-1'>
              <img src={user.profileImage} alt="pfp" className='w-8 h-8 rounded-full' />
              <div className='w-4 h-4 rounded-full bg-green-500 border-white border-2 absolute top-0 right-0'></div>
            </div>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Rightbar