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
  const { logOut, user } = useContext(AuthContext); // Get current user (to extract token)
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor to add token if available
    const reqInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await user?.getIdToken?.(); // Firebase method
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for 401/403 errors
    const resInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          logOut().then(() => navigate("/login"));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosInstance;
