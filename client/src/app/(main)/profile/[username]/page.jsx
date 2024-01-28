"use client"
import SideBar from "@/components/SideBar"
import Profile from "@/components/Profile"

export default function page({params}) {
  const username = params.username;
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 ">
        <SideBar />
      </div>
      <div className="col-span-9 ">
       <Profile username={username}/>
      </div>
    </div>
  );
}
