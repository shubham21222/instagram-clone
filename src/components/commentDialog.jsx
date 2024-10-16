import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { FaHeart, FaHeartBroken, FaRegHeart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { Base_url } from "@/utils/config";
import { toast } from "react-toastify";
import { setPosts } from "@/redux/postSlice";
const CommentDialog = ({
  post,
  open,
  setOpen,
  postId,
  postImage,
  postAuthor,
  postComments,
}) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.Post);
  const { user_Details } = useSelector((state) => state.Auth);
  const { selectedPost } = useSelector((state) => state.Post);

  const [text, setText] = useState("");
  const { token } = useSelector((state) => state.Auth);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(
    post?.comments?.liked?.includes(user_Details?._id) || false // initialize based on user ID
  );
  const [postLike, setPostLike] = useState(post?.comments?.liked?.length);

  const [isRefresh, setRefresh] = useState(false);
  const [likedComment, setLikedComment] = useState([]);
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  const handleComment = async () => {
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/postAuth/AddComment/${postId}`,
        {
          text: comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setComment("");
        refreshData();

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    _id: user_Details._id,
                    text: comment, // Adding the comment text
                    username: user_Details.username, // Adding the username or any other user detail you want to store
                  },
                ],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      console.log(error.response.data.message || "Failed");
    }
  };
  // const handleComment = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${Base_url}/api/v1/postAuth/AddComment/${postId}`,
  //       {
  //         text: comment,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       setComment("");
  //       refreshData();

  //     } else {
  //       toast.error("Failed");
  //     }
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };

  const likeDislike = async (_id) => {
    try {
      const response = await axios.put(
        `${Base_url}/api/v1/postAuth/LikedComment/${postId}/${_id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response?.data?.msg === "Liked the comment") {
        toast.success("Liked Comment");
        setLikedComment((prev) => [...prev, _id]); // Add the liked comment ID to the array
      } else if (response?.data?.msg === "Unliked the comment") {
        toast.success("Unliked Comment");
        setLikedComment((prev) => prev.filter((id) => id !== _id)); // Remove the comment ID from the array
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

  return (
    <>
      <Dialog open={open} className="">
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="p-0 max-w-[60%]"
        >
          <div className="flex ">
            <div className="w-1/2">
              <img
                className="w-[200%] rounded-sm aspect-square object-cover "
                src={postImage}
                alt="post-image"
              />
            </div>
            <div className="w-1/2 flex flex-col p-2 justify-between ">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <Avatar className="border">
                    <AvatarImage
                      src={postAuthor.profilePicture}
                      alt="post_image"
                    ></AvatarImage>
                  </Avatar>

                  <div>
                    {postAuthor.Username}{" "}
                    <span className="text-gray-600">Bio here...</span>
                  </div>
                  <hr />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <button className="text-red-700">UnFollow</button>
                    <button>Add to favorite</button>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                {postComments.map((comment, index) => (
                  <div
                    key={index}
                    className="py-2 flex justify-between items-center"
                  >
                    <p className="text-sm">
                      <span className="font-semibold ">
                        {comment?.author?.Username}{" "}
                      </span>
                      {comment?.text}
                    </p>
                    {/* <FaHeart size={"14px"} className="text-red-700" /> */}
                    {likedComment.includes(comment._id) ? (
                      <FaHeart
                        size={"20px"}
                        onClick={() => likeDislike(comment?._id)}
                        className="text-red-700 cursor-pointer"
                      />
                    ) : (
                      <FaRegHeart
                        size={"20px"}
                        onClick={() => likeDislike(comment?._id)}
                        className="cursor-pointer"
                      />
                    )}

                    {/* {post.likes.map((likeId) => {
                      console.log(likeId);
                    })} */}
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="border outline-none w-full border-gray-300 rounded p-1"
                    placeholder="Add a comment..."
                    onChange={changeEventHandler}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    disabled={!comment.trim()}
                    onClick={handleComment}
                    className=" border border-gray-300 rounded p-1"
                  >
                    <IoIosSend size={"20px"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentDialog;
