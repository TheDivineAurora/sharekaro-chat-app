import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='h-10 space-x-2 w-[500px] flex items-center relative bg-white rounded-md '>
        <Search className='ml-2'/>
        <input type="text" placeholder="search.." className='py-2 w-full focus:outline-none  bg-transparent'/>
     </div>
  )
}

export default SearchBar