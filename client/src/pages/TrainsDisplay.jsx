import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import TrainCard from '../components/TrainCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import '../assets/newstyle.css'
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export default function TrainsDisplay({logged,setLogged}) {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  const navigate = useNavigate();
const [trains , setTrains] = useState([]);

    useEffect(()=>{
      const fun = async() =>{
        if(from && to){
          const resp =await axios.post(`${apiUrl}/api/getTrains`, {
            "from" : from,
            "to" : to
          },{withCredentials: true}).then((response)=>{
            var arr = [];
            Object.keys(response.data).forEach((data)=>{
              arr.push(response.data[data]);
            })
            setTrains(arr);
            console.log(arr);
          }).catch(error => {
            // console.log("hi")
            toast.error("login first", {
              position: "top-center",
              autoClose: 1000,
              onClose : () => navigate('/login')
            })
            console.error(error);
            
            
          });
        }
      }
      fun();
    },[from, to])

   
  

  return (
    <div className=' newhome'>
<Navbar logged={logged} setLogged={setLogged} />
{trains.map((d)=>(
  <TrainCard prop={d} date={date} />
))}
<ToastContainer/>
    </div>
  )
}
