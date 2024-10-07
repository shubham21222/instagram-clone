import { setPosts } from "@/redux/postSlice";
import { Base_url } from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  const [isRefresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await axios.get(`${Base_url}/api/v1/postAuth/get`, {
          //   withCredentials: true,
        });
        if (response.data.success) {
          // console.log(response.data.data);

          dispatch(setPosts(response.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, [isRefresh]);
};
export default useGetAllPost;
