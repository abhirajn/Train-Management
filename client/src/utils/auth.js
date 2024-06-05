// src/utils/auth.js

import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const isAuthenticated = async () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      return false;
    }
  
    try {
      const response = await axios.get(`${apiUrl}/user/checklogged`, {
        withCredentials : true,
      });
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking authentication', error);
      return false;
    }
  };
  