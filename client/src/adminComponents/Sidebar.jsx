// Sidebar.jsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom'; // Assuming you are using react-router for navigation
// let logged = false
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const Sidebar = ({adminlogged ,setAdminlogged}) => {
  const navigate = useNavigate()


  useEffect(()=>{
    const fun = async() => {
      const resp = await axios.get(`${apiUrl}/admin/checkAdminlogin` , {withCredentials : true}).then((r)=>{
        console.log(r)
        setAdminlogged(r.data)
      })
    }
    fun()
  },[])

  return (
    <aside className="relative w-64 bg-blue-900 text-white flex-shrink-0 p-4">
      <h2 className="relative text-2xl font-semibold mb-10 ">Admin Portal</h2>
      <nav className="space-y-2">
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/addTrain"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Add Train
        </NavLink>
        <NavLink
          to="/admin/editTrain"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Edit Train
        </NavLink>
        <NavLink
          to="/admin/groupadd"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Group Add Train
        </NavLink>
      </nav>
      <div className='absolute bottom-0 mb-7'>
      {adminlogged ? <><div className='flex'>
        <img src="https://www.svgrepo.com/show/335455/profile-default.svg" className='w-12 h-12 mr-4' alt="" srcset="" />
        <button  type="button" className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
        
        </div></> 
      :<div className='flex'>
        <button onClick={()=>{navigate('/admin/login')}} type="button" className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-xl rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        {/* <button onClick={()=>{navigate('/register')}} type="button" className="ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button> */}
        </div>}
      </div>
    </aside>
  );
};

export default Sidebar;
