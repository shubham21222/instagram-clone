import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Loader from "@/utils/loader";
import { readFileAsDataURL } from "@/lib/utils";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import { Base_url } from "@/utils/config";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const CreatePost = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);
  const { user_Details } = useSelector((state) => state.Auth);
  const { posts } = useSelector((state) => state.Post);
  const [isLoading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };
  const createPostHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/postAuth/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Create Post Successfully");
        dispatch(setPosts([response.data.data, ...posts]));
        setCaption("");
        setFile(null);
        setImagePreview("");
        imageRef.current.value = null;
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  <Toaster/>
      {/* {isLoading && <Loader />} */}
      <div className="">
        <Dialog open={open}>
          <DialogContent
            onInteractOutside={() => setOpen(false)}
            className="overflow-y-scroll h-[85vh] scrollbarThin max-w-[40%]"
          >
            <DialogHeader className="text-center font-semibold">
              Create New Post
            </DialogHeader>
            <div className="flex gap-x-3 items-center">
              <Avatar>
                <AvatarImage src={user_Details?.profilePicture} alt="img" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-xs">
                  {user_Details?.Username}
                </h1>
                <span className="text-gray-600 text-xs">Bio here...</span>
              </div>
            </div>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="focus-visible:ring-transparent border"
              placeholder="Write a caption..."
            />
            {imagePreview && (
              <div className="w-full h-64 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="preview_img"
                  className=" w-44 object-cover h-auto rounded-md"
                />
              </div>
            )}
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={fileChangeHandler}
            />
            <Button
              onClick={() => imageRef.current.click()}
              className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] "
            >
              Select from computer
            </Button>
            {imagePreview &&
              (isLoading ? (
                <Button>
                  <Loader2 />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={createPostHandler}
                  type="submit"
                  className="w-full"
                >
                  Post
                </Button>
              ))}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreatePost;
