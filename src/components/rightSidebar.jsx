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
          <div className="flex flex-col">
            <h1>{user_Details?.Username}</h1>
            <p className="text-gray-500">{user_Details?.bio || "Bio here..."}</p>
          </div>
        </div>
        <SuggestedUsers />
      </div>
    </>
  );
};

export default RightSidebar;
