"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import { Bell, CircleUserRound, MessageSquareMore } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import axios from '@/lib/axiosClient'
const Navbar = () => {
    const { user, isFetching, error } = useContext(AuthContext);
    const [ curUser,setCurUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/user?username=${user.username}`);
            setCurUser(response.data.data);
        };
        fetchUser();
    }, [user]);
    return (
        <div className='w-full bg-gray-800 sticky inset-x-0 top-0 h-14 z-50'>
            <header className='relative w-full h-full'>
                <div className='flex justify-between items-center h-full'>
                    <h3 className='text-white font-semibold text-2xl ml-4'>ShareKaro</h3>
                    <div className='flex self-strech gap-12  items-center'>
                        <SearchBar />
                        <div className='flex flex-1 text-white text-center text-md font-regular gap-4 items-center'>
                            <Link href="/" className='hover:cursor-pointer'>Homepage</Link>
                            <Link href="/timeline" className='hover:cursor-pointer'>Timeline</Link>
                            <Link href="/friends" className='hover:cursor-pointer'>Friends</Link>
                        </div>
                        <div className='flex flex-1 text-white gap-4 items-center'>
                            <div className='relative p-1' >
                                <CircleUserRound />
                                <div className=' h-4 w-4  rounded-full p-[1.5px]  text-[10px] text-center bg-red-600 absolute top-0 right-0 '>2</div>
                            </div>
                            <div className='relative p-1' >
                                <MessageSquareMore />
                                <div className=' h-4 w-4  rounded-full p-[1.5px]  text-[10px] text-center bg-red-600 absolute top-0 right-0 '>2</div>
                            </div>
                            <div className='relative p-1' >
                                <Bell />
                                <div className=' h-4 w-4  rounded-full p-[1.5px]  text-[10px] text-center bg-red-600 absolute top-0 right-0 '>2</div>
                            </div>
                        </div>
                        <Link href={`/profile/${curUser.username}`}>
                            <img src={curUser.profileImage || "/profile.png"} className='w-8 h-8 mr-8 rounded-full' />
                        </Link>
                    </div>

                </div>
            </header>
        </div>
    )
}
export default Navbar
