import { setUserProfile } from "@/redux/authSlice";
import { Base_url } from "@/utils/config";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetUserProfile = (userId ) => {
  const { token } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${Base_url}/api/v1/Auth/getProfile/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // console.log(response , "Profile");

        if (response.data.Success) {
          // console.log(response?.data?.data , "Profile");
          dispatch(setUserProfile(response?.data?.data));
        }
      } catch (error) {
        console.log(error , "Error");
      }
    };
    fetchUserProfile();
  }, [userId]);
};
export default useGetUserProfile;
