import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { toast } from "react-toastify";
import { Base_url } from "@/utils/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, removeUsersDetails } from "@/redux/slice";
import { useNavigate } from "react-router-dom";
import CreatePost from "./createPost";
import Loader from "@/utils/loader";

const LeftSidebar = () => {
  const { token } = useSelector((state) => state.Auth);
  const { user_Details } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const sidebarItem = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Reels" },
    { icon: <Home />, text: "Message" },
    { icon: <Heart />, text: "Notification" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user_Details?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/Auth/logout`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Logout Successfully");
        dispatch(removeToken(""));
        dispatch(removeUsersDetails());
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const createPostHandler = () => {
    setOpen(true);
  };
  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      handleLogout();
    } else if (textType === "Create") {
      createPostHandler();
    }
  };
  return (
    <>
    {isLoading && <Loader/>}
      <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
        <div className="flex flex-col">
          <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
          <div>
            {sidebarItem.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item?.text)}
                  key={index}
                  className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-2"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <CreatePost setOpen={setOpen} open={open} />
      </div>
    </>
  );
};

export default LeftSidebar;
