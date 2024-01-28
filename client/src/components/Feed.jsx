"use client";
import { CrossIcon, Image, Smile, Video, X } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from '../lib/axiosClient';
import Post from "./Post";
import { AuthContext } from '@/context/AuthContext';


const Feed = ({ page }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const [file,setFile] = useState(null);
  const description = useRef();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = page == "profile" ? await axios.get('posts/profile/' + user.username) : await axios.get('posts/timeline/' + user._id);
      setPosts(response.data.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
      console.log(response);  
    };  
    fetchPosts();
  }, [page,user]);

  const submitHandler = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: description.current.value
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="grid grid-cols-1 pl-4 space-y-5 w-[600px] ">
      <div className='flex flex-col p-4 shadow-md rounded-md mt-6'>
       
        <form onSubmit={submitHandler}>
        <div className='flex gap-4 items-center '>
          <img src={user.profileImage || "/profile.png"} className='h-10 w-10 rounded-full' />
          <input ref={description} placeholder='hows your day going!' className='border rounded-md p-2 border-gray-300 w-full focus:outline-none' />
        </div>
        {file && (
          <div className='flex relative mt-4'>
            <X  onClick={()=>setFile(null)} className='absolute top-0 right-0 rounded-full border-2 border-black mt-2 mr-2'/>
          <img src={URL.createObjectURL(file)} className='w-full' alt=""/>
          </div>
        )}
        <div className='grid grid-cols-6 mt-4 relative'>
          <label htmlFor='video' className='flex gap-2 font-medium cols-span-2 hover:bg-gray-200 p-2 rounded-md justify-center'>
            <Video />
            <input type="file" id="video" accept=".png,.jpeg,.jpg" className='hidden' onChange={(e)=>setFile(e.target.files[0])}/>
            Videos
          </label>
          <label htmlFor='image' className='flex gap-2 font-medium cols-span-2 hover:bg-gray-200 p-2 rounded-md justify-center'>
            <Image />
            <input type="file" id="image" accept=".png,.jpeg,.jpg" className='hidden' onChange={(e)=>setFile(e.target.files[0])}/>
            Images
          </label>
          <div className='flex gap-2 font-medium cols-span-2 hover:bg-gray-200 p-2 rounded-md justify-center'>
            <Smile />
            Feelin
          </div>
          <button type="submit" className='px-6 py-2 text-center rounded-md bg-gray-800 text-white absolute right-0 inset-y-0'>Post</button>
        </div>
        </form>
      </div>
      <div className='flex flex-col w-full gap-5 items-center justify-center'>
        {posts.map(post => (
          <Post className="w-full" key={post._id} post={post} />
        ))}
      </div>

    </div>
  );
}

export default Feed;
