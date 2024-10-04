import React from "react";
import Feed from "./feed";
import RightSidebar from "./rightSidebar";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./leftSidebar";
import protectedRoute from "@/utils/protectRout";
import { ToastContainer } from "react-toastify";
import useGetAllPost from "@/hooks/useGetAllPost";

const Home = () => {
  useGetAllPost();
  return (
    <>
      <ToastContainer autoClose={1500} />
      <div className="flex w-full">
        <LeftSidebar />
        <div className="flex-grow">
          <Feed />
          <Outlet />
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default protectedRoute(Home);
