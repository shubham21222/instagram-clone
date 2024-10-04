import React, { useState } from "react";
import { Avatar } from "./ui/Avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./commentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Base_url } from "@/utils/config";
import { setPosts } from "@/redux/postSlice";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.Auth);
  const { user_Details } = useSelector((state) => state.Auth);
  const { posts } = useSelector((state) => state.Post);
  const [liked, setLiked] = useState(
    post?.likes?.includes(user_Details?._id) || false // initialize based on user ID
  );
  const [postLike, setPostLike] = useState(post?.likes?.length);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  const likeDislike = async (_id) => {
    try {
      const action = liked ? "Dislike" : "Like";

      const response = await axios.post(
        `${Base_url}/api/v1/postAuth/${action}/${post?._id}`,
        {},
        {
          headers: {
            Authorization: token, // ensure token is properly set
          },
        }
      );

      if (response.data.success) {
        toast.success(`${action}d`); // Show dynamic toast based on action (Liked/Disliked)
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user_Details._id)
                  : [...p.likes, user_Details._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
      } else {
        toast.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while updating"
      );
    }
  };
// const handleComment = async() =>{
//   try {
//     const response = await axios.post(`${Base_url}/`)
//   } catch (error) {
//     console.log(error ,"Error")
//   }
// }
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${Base_url}/api/v1/postAuth/deletePost/${post?._id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        const updatePostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatePostData));
        toast.success("Delete Successful");
        setOpen(false);
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.log(error, "Error");
      toast.error(error.response.data.message);
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <div className="my-8 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            {/* <Avatar className="border"> 
              <AvatarImage src={post?.auther?.profilePicture} alt="post_image" className="w-5 h-5">
                <AvatarFallback>CN</AvatarFallback>
              </AvatarImage>
            </Avatar> */}
            <img
              className="rounded-full my-1 aspect-square object-cover"
              src="https://images.unsplash.com/photo-1726842201445-0992a3d66e3a?w=30&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
              alt="post-image"
            />
            <h1>{post?.author?.Username}</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <button>unFollow</button>
              <button>Add to favorite</button>

              {user_Details?._id === post?.author?._id && (
                <button onClick={handleDelete} className="text-red-700">
                  Delete
                </button>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <img
          className="rounded-sm my-1 aspect-square object-cover"
          src={post?.image}
          alt="post-image"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3 items-center">
            {/* <FaRegHeart size={"20px"} onClick={likeDislike} /> */}

            {liked  ? (
              <FaHeart
                size={"20px"}
                onClick={likeDislike}
                className="text-red-700"
              />
            ) : (
              <FaRegHeart size={"20px"} onClick={likeDislike} />
            )}

            <MessageCircle
              size={"20px"}
              onClick={() => setOpen(true)}
              className="cursor-pointer hover:text-gray-600"
            />
            <Send
              size={"20px"}
              className="cursor-pointer hover:text-gray-600"
            />
          </div>
          <Bookmark
            size={"20px"}
            className="cursor-pointer hover:text-gray-600"
          />
        </div>
        <span className="">{postLike} Likes</span>
        <p>
          <span className="font-medium mr-2">{post?.author?.Username}</span>
          {post?.caption}
        </p>
        <span
          onClick={() => setOpen(true)}
          className=" cursor-pointer text-gray-400"
        >
          View all comments
        </span>
        <CommentDialog open={open} setOpen={setOpen} />
        <div className="flex">
          <input
            type="text"
            placeholder="Add a comment..."
            onChange={changeEventHandler}
            className="outline-none tetx-sm w-full"
          />
          {text && <span className="">Post</span>}
        </div>
      </div>
    </>
  );
};

export default Post;
