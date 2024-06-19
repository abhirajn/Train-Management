import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';
const apiUrl = import.meta.env.VITE_BACKEND_URL;



export default function Navbar({logged , setLogged}) {

  const navigate = useNavigate();
// const[logged, setLogged] = useState(false);
// console.log(logged)
// const [loggedIn, setLoggedIn] = useState(false);

useEffect(() => {
  const checkAuth = async () => {
    const authStatus = await isAuthenticated();
    // console.log(authStatus)
    setLogged(authStatus);
  };

  checkAuth();
}, []);




const handleLogout = () => {
  axios.get(`${apiUrl}/user/logout`,  { withCredentials: true })
    .then(response => {
      console.log(response.data.message); // Logged out successfully
      // Redirect to login page or update UI accordingly
      setLogged(false)
      navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
console.log(logged)
  return (
    <div>
        <div className='w-full h-9 bg-black '>

        </div>

<div>
  {/* {check()} */}
<nav className="bg-gray-900 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TRAIN</span>
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {logged ? <><div className='flex'>
        <img src="https://www.svgrepo.com/show/335455/profile-default.svg" className='w-12 h-12' alt="" srcset="" />
        <button onClick={handleLogout} type="button" className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
        
        </div></> 
      :<div className='flex'>
        <button onClick={()=>{navigate('/login')}} type="button" className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        <button onClick={()=>{navigate('/register')}} type="button" className="ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
        </div>}
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a onClick={()=>{navigate('/')}} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a onClick={()=>{navigate('/myBookings')}} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My bookings</a>
      </li>
      <li>
        <a onClick={()=>{navigate('/cancelTicket')}} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cancel Ticket</a>
      </li>
      <li>
        <a onClick={()=>{navigate('/pnrEnquiry')}} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">PNR enquiry</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
</div>



    </div>
  )
}


