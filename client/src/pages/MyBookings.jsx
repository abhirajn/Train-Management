import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrainCard from '../components/TrainCard';
import TicketCard from '../components/TicketCard';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function MyBookings({logged ,setLogged}) {
    const [select, setSelect] = useState(1);
    const [tickets , setTickets] = useState([]);
    const [pasttickets , setPasttickets] = useState([]);

    useEffect(()=>{
        const fun = async() => {
            try {
                const resp = await axios.get(`${apiUrl}/api/getAllTicketsOfaUser`,{withCredentials : true}).then((response)=>{
                    // console.log(response)
                    var curr = [];
                    var past = [];
                    response.data.map((data)=>{
                        // console.log(data)
                        const dateString = data.fromDate;
                        const timeString = data.fromTime;

                        const combinedString = `${dateString} ${timeString}`;
                    
                        const providedDate = new Date(combinedString);
                    
                        const currentDate = new Date();
                    
                        // Compare the two dates
                        if (providedDate > currentDate) {
                          curr.push(data);
                        } else {
                          past.push(data);
                        }
                    })
                    setTickets(curr);
                    setPasttickets(past)
                })
            } catch (error) {
                toast.error("login first", {
                    position: "top-center",
                    autoClose: 1000,
                    onClose : () => navigate('/login')
                  })
                  console.error(error);
            }
        }
        fun()
    },[])

  return (
    <div className='w-full'>
        <Navbar logged={logged} setLogged={setLogged}/>
<div className='w-full'><p className='m-6 text-4xl font-extrabold'>My Bookings</p></div>
        <div className='m-16'>
            <div className='flex'>
                <p onClick={()=>{setSelect(1)}} className={select == 1 ? 'ml-2 p-6  text-blue-900 text-2xl font-bold border-2 border-orange-300' :
                     'ml-2 p-6 bg-gray-300 text-blue-900 text-2xl font-bold '}>My bookings</p>

                <p onClick={()=>{setSelect(2)}} className={select == 2 ? ' p-6  text-blue-900 text-2xl font-bold border-2 border-orange-300' :
                     ' p-6 bg-gray-300 text-blue-900 text-2xl font-bold '}>Past bookings</p>
            </div>

            {select == 1 ? <div>
                {tickets.map((data)=>
                <TicketCard key={data.pnrNumber} prop={data}/>
                )}
            </div> : <div>
            {pasttickets.map((data)=>
                <TicketCard key={data.pnrNumber} prop={data}/>
                )}
            </div>}

        </div>
        <ToastContainer/>
    </div>
  )
}
