import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";

const CreatePost = ({ open, setOpen }) => {

  return (
    <>
      <div>
        <Dialog open={open}>
          <DialogContent onInteractOutside={() => setOpen(false)}>
           CreatePost
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreatePost;
