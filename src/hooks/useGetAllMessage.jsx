import { setMessages } from "@/redux/chatSlice";
import { setPosts } from "@/redux/postSlice";
import { Base_url } from "@/utils/config";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userAuth);
  const { token } = useSelector((state) => state.Auth);

  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(
          `${Base_url}/api/v1/message/all/${selectedUser?._id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.data.success) {
          dispatch(setMessages(res.data.message));
        }
      } catch (error) {
        console.log(error ,"Error");
      }
    };
    fetchAllMessage();
  }, [selectedUser]);
};
export default useGetAllMessage;
