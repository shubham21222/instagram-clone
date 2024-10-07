import { setSuggestedUsers } from "@/redux/slice";
import { Base_url } from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetSuggestedUser = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);

  const [isRefresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
          `${Base_url}/api/v1/Auth/SuggestedUsers`,
          {
            headers: {
              Authorization: token,
            },
          },
          {
            //   withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log(response?.data?.Users);

          dispatch(setSuggestedUsers(response?.data?.Users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUsers();
  }, [isRefresh]);
};
export default useGetSuggestedUser;
