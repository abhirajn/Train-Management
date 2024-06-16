// src/utils/auth.js

import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const isAuthenticated = async () => {
    // const token = document.cookie.split('; ').find(row => row.startsWith('token'));
    // console.log(token)
    // if (!token) {
    //   console.log("hi1")
    //   return false;
    // }
  
    try {
      const response = await axios.get(`${apiUrl}/user/checklogged`, {
        withCredentials : true,
      });
      if (response.status === 200) {
        return true;
      }
      console.log("hi2")
      return false;
    } catch (error) {
      console.error('Error checking authentication', error);
      console.log("hi3")
      return false;
    }
  };
  