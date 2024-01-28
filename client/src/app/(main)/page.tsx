"use client"
import SideBar from "@/components/SideBar"
import Feed from "@/components/Feed"
import Rightbar from "@/components/Rightbar"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {user} = useContext(AuthContext);
  if(!user){
     router.push('/login')
  }
  return (
    <>
    <div className="grid grid-cols-12">
      <div className="col-span-3 ">
        <SideBar />
      </div>
      <div className="col-span-6 ">
       
        <Feed page="home"/>
      </div>
      <div className="col-span-3 ">
        <Rightbar />
      </div>
    </div>
    </>
  );
}
