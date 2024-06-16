// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const Registeruser = ({ logged ,setLogged}) => {

const[first , setFirst] = useState('');
const[last , setLast] = useState('');
const[ph , setPh] = useState('');
const[email , setEmail] = useState('');
const[pass , setPass] = useState('');
const[cpass , setCpass] = useState('');


  const handleGoogleLogin = () => {
    // Your Google login logic here
    alert('Google login clicked');
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(pass !== cpass){
        alert("password and confirm password are not same")
    }else{
        try {
            const resp =  await axios.post(`${apiUrl}/user/register`, {
                "name" : first + last,
                "phone" : ph,
                "username" : email,
                "password" : pass
              },{
                withCredentials: true 
              })     
              toast.success("user registered");
              setLogged(true)
              navigate('/')
        } catch (error) {
            // console.log("HI", error.response.data.message)
            toast.error(error.response.data.message);
        }
       
          
    }

  }



  const navigate = useNavigate();
  return (
    <div>  <Navbar  logged={logged} setLogged={setLogged}/> 
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <div className='flex'>
            <div className='mr-1'> <label htmlFor="email" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="name"
              required
              value={first}
              onChange={(e)=>{setFirst(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="first Name"
            /> </div>
            <div className='ml-1'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="name"
              value={last}
              onChange={(e)=>{setLast(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Last Name"
            />
            </div>
          </div>
          <div>
            
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="ph"
              required
              value={ph}
              onChange={(e)=>{setPh(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="1234567890"
            />
          </div>
          <div>
            <label for="gender" className=' text-sm font-medium text-gray-700'>Gender : </label>
<select id="gender" name="gender" className='border-2 px-3 py-1 w-24'>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              required
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
              required
              value={pass}
              onChange={(e)=>{setPass(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="password"
              required
              value={cpass}
              onChange={(e)=>{setCpass(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
         
          <div>
            <button
              type="submit"
            //   onSubmit={handleSubmit()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6">
        <p>Already a user : <span className='text-blue-600 cursor-pointer' onClick={()=>{
            navigate('/login')
        }}>Login</span></p>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Registeruser;
