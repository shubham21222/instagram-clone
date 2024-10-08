import React from "react";
import Post from "./post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((state) => state.Post);

  return (
    <div className="">
      {posts.map((posts, index) => (
        <Post key={index} post={posts} />
      ))}
    </div>
  );
};

export default Posts;
