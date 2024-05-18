import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import TrainCard from '../components/TrainCard';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export default function TrainsDisplay() {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

const [trains , setTrains] = useState([]);

    useEffect(()=>{
      const fun = async() =>{
        if(from && to){
          const resp =await axios.post(`${apiUrl}/api/getTrains`, {
            "from" : from,
            "to" : to
          }).then((response)=>{
            var arr = [];
            Object.keys(response.data).forEach((data)=>{
              arr.push(response.data[data]);
            })
            setTrains(arr);
            console.log(arr);
          }).catch(error => {
            // Handle error
            console.error(error);
          });
        }
      }
      fun();
    },[from, to])

   
  

  return (
    <div>

{trains.map((d)=>(
  <TrainCard prop={d} date={date} />
))}
    </div>
  )
}
