import { Bookmark, CircleUser, Compass, FileQuestion, Group, HelpCircle, MessageSquareText, Rss, Video } from 'lucide-react'
import React from 'react'

const SideBar = () => { 
  return (
    <div className=''>
      <ul className='space-y-2 mt-4 mx-4'>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'>
           <Rss/>
           <h2>Feed</h2>
        </li>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'>
           <Compass/>
           <h2>Explore</h2>
        </li>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'>
           <MessageSquareText/>
           <h2>Messages</h2>
        </li>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'>
           <Video/>
           <h2>Videos</h2>
        </li>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'> 
           <CircleUser/>
           <h2>Friends</h2>
        </li>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'>
           <Group/>
           <h2>Groups</h2>
        </li>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'>
           <HelpCircle/>
           <h2>Questions</h2>
        </li>
        <li className='flex text-lg font-medium gap-5 px-4 py-2 rounded-md items-center hover:bg-gray-100'>
           <Bookmark/>
           <h2>Saved</h2>
        </li>
      </ul>
    </div>
  )
}

export default SideBar