// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const Login = ({logged ,setLogged}) => {


const[email , setEmail] = useState('');
const[pass , setPass] = useState('');
  const handleGoogleLogin = () => {
    // Your Google login logic here
    alert('Google login clicked');
  };
  
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    
        try {
            const resp =  await axios.post(`${apiUrl}/user/login`, {
                "username" : email,
                "password" : pass
              },{
                withCredentials: true 
              })     
              toast.success("User Logged in");
              setLogged(true)
              navigate('/')
        } catch (error) {
            // console.log("HI", error.response.data.message)
            toast.error(error.response.data.message);
        }
       
          
    

  }


  return (
    <div> <Navbar  logged={logged} setLogged={setLogged}/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        {/* <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="ur name"
            />
          </div> */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={pass}
              onChange={(e)=>{setPass(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          {/* <div>
            
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="ph"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="1234567890"
            />
          </div> */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p>New user <span className='text-blue-600 cursor-pointer' onClick={()=>{navigate('/register')}}>Signup</span></p>
          {/* <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.3 496 249.8 496 111.6 496 0 384.4 0 248S111.6 0 249.8 0C325 0 385.5 27.4 431.5 72.1L363 134C328.2 100 272 80 249.8 80c-100.1 0-181 83.3-181 183s81 183 181 183c105.2 0 144.6-75.4 150.4-113H249.8v-100h238.2c2.7 15.2 5.1 30.3 5.1 46.8z"></path></svg>
            Sign in with Google
          </button> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
