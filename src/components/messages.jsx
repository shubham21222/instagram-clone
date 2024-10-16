// import React from "react";
// import { Button } from "./ui/button";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import useGetAllMessage from "@/hooks/useGetAllMessage";
// import useGetRTM from "@/hooks/useGetRTM";

// const Messages = ({ selectedUser }) => {
//   useGetRTM();
//   useGetAllMessage();
//   const { messages } = useSelector((state) => state.Chat);
//   const { user_Details } = useSelector((state) => state.Auth);
//   return (
//     <div className="overflow-y-auto flex-1 p-4">
//       <div className="flex justify-center">
//         <div className="flex flex-col items-center justify-center">
//           <div className="h-20 w-20">
//             <img src={selectedUser?.profilePicture} alt="profile" className="w-20 h-20 rounded-full object-cover" />
//           </div>
//           <span className="font-semibold">{selectedUser?.Username}</span>
//           <Link to={`/profile/${selectedUser?._id}`}>
//             <Button className="h-8 my-2" variant="secondary">
//               View profile
//             </Button>
//           </Link>
//         </div>
//       </div>
//       <div className="flex flex-col gap-3">
//         {messages &&
//           messages.map((msg , index) => {
//             return (
//               <div
//                 key={msg._id}
//                 className={`flex ${
//                   msg.senderId === user_Details?._id ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                 key={index}
//                   className={`p-2 rounded-lg max-w-xs break-words ${
//                     msg.senderId === user_Details?._id
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   {msg.message}
//                 </div>
//               </div>
//             );
//           })}
//           {/* <p>{messages?.message}</p> */}
//       </div>
//     </div>
//   );
// };

// export default Messages;
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  
  const { messages } = useSelector((state) => state.Chat);
  const { user_Details } = useSelector((state) => state.Auth);
  
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when new messages are rendered
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="h-20 w-20">
            <img
              src={selectedUser?.profilePicture}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <span className="font-semibold">{selectedUser?.Username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="h-8 my-2" variant="secondary">
              View profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((msg, index) => {
            return (
              <div
                key={msg._id}
                className={`flex ${
                  msg.senderId === user_Details?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-xs break-words ${
                    msg.senderId === user_Details?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
        {/* This div ensures that the view scrolls to the bottom */}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default Messages;
