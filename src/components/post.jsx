import React, { useState } from "react";
import { Avatar } from "./ui/Avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./commentDialog";

const Post = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  return (
    <>
      <div className="my-8 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            {/* <Avatar className="border"> 
              <AvatarImage src="https://images.unsplash.com/photo-1726232409063-00c6b4009b08?w=50&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8" alt="post_image">
                <AvatarFallback>CN</AvatarFallback>
              </AvatarImage>
            </Avatar> */}
            <img
              className="rounded-full my-1 aspect-square object-cover"
              src="https://images.unsplash.com/photo-1726842201445-0992a3d66e3a?w=30&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
              alt="post-image"
            />
            <h1>hariom_4022</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <button>unFollow</button>
              <button>Add to favorite</button>
              
              <button onClick={DialogClose}>Cancel</button>
            </DialogContent>
          </Dialog>
        </div>
        <img
          className="rounded-sm my-1 aspect-square object-cover"
          src="https://images.unsplash.com/photo-1720048171527-208cb3e93192?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D"
          alt="post-image"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3 items-center">
            <FaRegHeart size={"20px"} />
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
        <span className="">1k Likes</span>
        <p>
          <span className="font-medium mr-2">username</span>
          caption
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
