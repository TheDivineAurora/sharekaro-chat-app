"use client";
import axios from '@/lib/axiosClient';
import { useContext, useEffect, useState } from 'react';
import Feed from './Feed';
import { AuthContext } from '@/context/AuthContext';

const Profile = ({username}) => {
    const {user:currentUser,dispatch} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [followed,setFollowed] = useState(currentUser.followings.includes(user._id));
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/user?username=${username}`);
            setUser(response.data.data);
        };
        fetchUser();
    }, [username]);
    const followHandler = async()=>{
        try {
            if(followed){
                await axios.put("user/unfollow/"+user._id, {userId: currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id});
                setFollowed(!followed);
            }  

            else{
                await axios.put("user/follow/"+user._id, {userId: currentUser._id});
                dispatch({type:"FOLLOW",payload:user._id});
                setFollowed(!followed);

            }
        } catch (error) {
            console.log(error);
        }
       
    }
    return (
        <div className='flex flex-col w-full items-center border-x-2 border-gray-300 '>
                <img src={user.coverPicture || "/cover.avif"} alt="bg" className='w-full h-[180px]' />
            <div className='flex flex-col items-center text-center mt-[-100px]'>
                <img src={user.profileImage || "/profile.png"} alt="pfp" className='border-4 border-white w-48 rounded-full shadow-md' />
                <h1 className='text-gray-800 font-semibold text-2xl mt-2'>{user.name || ""}</h1>
                <p className='text-gray-800 font-light text-md tracking-tight '>{user.description || ""}</p>
                <div className='flex flex-1 mt-1 font-semibold gap-5 text-gray-700'>
                    <h1>{user.posts ? user.posts.length : "0"} posts</h1>
                    <h1>{user.followers ? user.followers.length : "0"} followers</h1>
                    <h1>{user.followings ? user.followings.length : "0"} following</h1>
                </div>
                <div className='flex flex-1 mt-4 gap-5 items-center'>
                     {user.username !== currentUser.username && (
                       <button onClick={followHandler} className={`${followed?`bg-gray-300 text-black ` : `bg-gray-800 text-white `} font-medium px-4 py-2 rounded-md` }>{followed?"Following":"Follow"}</button>
                     )}
                       {/* <button className='bg-gray-200 text-black px-4 py-2 rounded-md'>Following</button> */}
                </div>
            </div>
            
            <Feed  page="profile" />
        </div>
    )
}

export default Profile