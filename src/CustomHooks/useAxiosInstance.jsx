// src/hooks/useAxiosInstance.js
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://food-server-chi.vercel.app",
  withCredentials: true,
});

const useAxiosInstance = () => {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor: add Firebase token if available
    const reqInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user?.getIdToken) {
          const token = await user.getIdToken();
          if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: logout and redirect on 401/403
    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          logOut().then(() => navigate("/login"));
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts or deps change
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosInstance;
