"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "./loader";
import { Base_url } from "./config";
import { useNavigate } from "react-router-dom";
import { removeToken } from "@/redux/slice";

const protectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.Auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        if (!token) {
          navigate("/");
        }
        if (token) {
          verify();
        }
      };

      checkAuth();
    }, [token, navigate]);

    const verify = async () => {
      setIsLoading(true);
      setIsAuth(false);
      try {
        const res = await axios.get(`${Base_url}/api/v1/Auth/verify`, {
          headers: {
            Authorization: token,
          },
        });
        if (res?.data?.data === null) {
          navigate("/ ");
          dispatch(removeToken());
        }
        if (res.status === 200) {
          setIsAuth(true);
          setIsLoading(false);
          return;
        } else {
          dispatch(removeToken());
          navigate("/");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        navigate("/");
        setIsLoading(false);
      }
    };

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : token && isAuth ? (
          <WrappedComponent {...props} />
        ) : null}
      </>
    );
  };
  return Wrapper;
};

export default protectedRoute;
