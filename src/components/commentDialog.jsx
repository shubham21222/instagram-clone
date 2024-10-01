import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  const sendMassegeHandler = async () => {
    alert(text);
  };
  return (
    <>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)} className="p-0">
          <div className="flex">
            <div className="w-1/2">
              <img
                className="rounded-sm aspect-square object-cover"
                src="https://images.unsplash.com/photo-1720048171527-208cb3e93192?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D"
                alt="post-image"
              />
            </div>
            <div className="w-1/2 flex flex-col p-2 ">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
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
                  <div>
                    hariom_4022{" "}
                    <span className="text-gray-600">Bio here...</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <button className="text-red-700">UnFollow</button>
                    <button>Add to favorite</button>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div>Comments...</div>

              <div>Comments...</div>
              <div>Comments...</div>

              <div className="flex gap-2">
                <input
                  type="text"
                  className="border outline-none w-full border-gray-300 rounded"
                  placeholder="Add a comment..."
                  onChange={changeEventHandler}
                />
                <button
                  disabled={!text.trim()}
                  onClick={sendMassegeHandler}
                  className=" border border-gray-300 rounded"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentDialog;
