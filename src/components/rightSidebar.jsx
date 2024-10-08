import React from "react";
import { Avatar, AvatarImage } from "./ui/Avatar";
import { useSelector } from "react-redux";
import SuggestedUsers from "./suggestedUsers";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { user_Details } = useSelector((state) => state.Auth);
  // console.log(user_Details, "user_Details");
  return (
    <>
      <div className="fixed top-0 z-10 right-0  border-l border-gray-300 w-[20%] h-screen px-5 py-10 ">
        <div className="flex items-center  gap-2">
        <Link to={`/profile/${user_Details?._id}`}>
          <Avatar>
            <AvatarImage src={user_Details?.profilePicture} />
          </Avatar>
</Link>
          <div className="flex items-center gap-3">
            <h1>{user_Details?.Username}</h1>
            <span>{user_Details?.bio || "Bio here..."}</span>
          </div>
        </div>
        <SuggestedUsers />
      </div>
    </>
  );
};

export default RightSidebar;
