import React from 'react'
import AdminNavbar from '../adminComponents/AdminNavbar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAllTrains from '../adminComponents/AdminAllTrains';
import Sidebar from '../adminComponents/Sidebar';

export default function AdminHome({adminlogged ,setAdminlogged}) {
  const today = dayjs();
  const todayDate = new Date();
  const year = todayDate.getFullYear();
const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(todayDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

  const[date , setDate] = React.useState(formattedDate);
  return (

    <div>

        {/* <AdminNavbar/> */}
        {/* <Sidebar/> */}
       <AdminAllTrains adminlogged = {adminlogged} setAdminlogged={setAdminlogged}/>


    </div>
  )
}
