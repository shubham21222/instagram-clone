import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/login";
import Home from "./components/home";
import Registration from "./components/auth/register";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";
import ChatPage from "./components/chatPage";
import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { Base_url } from "./utils/config";
import { setLikeNotification } from "./redux/rtnSlice";

function App() {
  const { user_Details } = useSelector((state) => state.Auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user_Details) {
  //     const socketio = io(`${Base_url}`, {
  //       query: {
  //         userId: user_Details?._id,
  //       },
  //       transports: ["websocket"],
  //     });
  //     dispatch(setSocket(socketio));

  //     // listen all the events
  //     socketio.on("getOnlineUsers", (onlineUsers) => {
  //       console.log(onlineUsers ,"onlineUsers")
  //       dispatch(setOnlineUsers(onlineUsers));
  //     });

  //     socketio.on("notification", (notification) => {
  //       console.log(notification , "notification")
  //       dispatch(setLikeNotification  (notification));
      
  //     });
  //     return () => {
  //       socketio.close();
  //       dispatch(setSocket(null));
  //     };
  //   } else if(socket) {
  //     socket.close();
  //     dispatch(setSocket(null));
  //   }
  // }, [user_Details, dispatch]);


  useEffect(() => {
    if (user_Details) {
      // Initialize socket connection with userId in the query
      const socketio = io(`${Base_url}`, {
        query: {
          userId: user_Details?._id,
        },
        transports: ["websocket"],
      });

      // Save the socket instance to the Redux store
      dispatch(setSocket(socketio));

      // Listen for online users event
      socketio.on("getOnlineUsers", (onlineUsers) => {
        console.log(onlineUsers, "onlineUsers");
        dispatch(setOnlineUsers(onlineUsers)); // Dispatch action to set online users in Redux
      });

      // Listen for notification event
      socketio.on("notification", (notification) => {
        console.log(notification, "notification");
        dispatch(setLikeNotification(notification)); // Dispatch notification action to Redux
      });

      // Cleanup on unmount or when user_Details changes
      return () => {
        socketio.close(); // Close socket connection
        dispatch(setSocket(null)); // Reset socket in Redux
      };
    } else if (socket) {
      // Close the socket if user_Details becomes null (logout scenario)
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user_Details, dispatch, socket]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />{" "}
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
