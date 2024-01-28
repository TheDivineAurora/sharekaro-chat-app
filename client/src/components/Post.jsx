"use client"
import axios from "@/lib/axiosClient"
import { CircleEllipsis, Heart, LucideCircleEllipsis, MoreVertical, ThumbsUp } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"

const Post = ({ post }) => {
    const URL = process.env.STORAGE;
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id,post.likes])
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`user?userId=${post.createdBy}`);
            setUser(response.data.data);
        };
        fetchUser();
    }, [post.userId]);
    const likeHandler = async () => {
        try {
            const res = await axios.put('/posts/like/' + post._id, { userId: currentUser._id });
        } catch (error) {
            console.log(error);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    return (
        <section className="flex flex-col p-2 rounded-lg shadow-md w-full">
            <header className="flex flex-row justify-between items-center">
                <div className="flex items-center text-center gap-4">
                    <img src={ user.profileImage || "/profile.png"} className="w-8 h-8 rounded-full" />
                    <h3 className="text-lg font-medium">{user.name}</h3>
                    <p className="text-sm font-regular text-gray-400 ">5 mins ago</p>
                </div>
                <MoreVertical />
            </header>
            <div className="mt-4 text-sm break-all">
                {post.description}
            </div>
            <img src={"http://localhost:3000/images/"+ post.image} className="w-full mt-2" />
            <div className="flex flex-row justify-between items-center p-3">
                <div className="flex gap-4 items-center">
                    <ThumbsUp className="hover:cursor-pointer" onClick={likeHandler} />
                    <Heart className="hover:cursor-pointer" />
                    <p className="text-muted"> {like} people liked</p>
                </div>
                <h1>0 Comments</h1>
            </div>
        </section>
    )
}

export default Post