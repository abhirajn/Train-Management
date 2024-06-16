import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function TrainCard({prop , date}) {
    // console.log(prop)
    const[finalDate , setFinalDate] = useState('');
    const[sDate , setSDate] = useState('');
    const[finalTime , setFinalTime] = useState('');
    const datee = new Date(date); // Current date
    
const dayOfWeekNumber = datee.getDay();
const dateofthemonth = datee.getDate();
const monthoftheyear = datee.getMonth();
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', ' Fri', 'Sat'];
const monthsoftheyear = ['Jan' , 'Feb', 'Mar' ,'April', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ]
const dayOfWeek = daysOfWeek[dayOfWeekNumber];
const monthName = monthsoftheyear[monthoftheyear]
// console.log(monthName)

    const [fromNumber  , setFromNumber] = useState();
    const date2 = new Date(datee);
date2.setDate(date2.getDate() + 1);

const date3 = new Date(date2);
date3.setDate(date3.getDate() + 1);

const date4 = new Date(date3);
date4.setDate(date4.getDate() + 1);

const date5 = new Date(date4);
date5.setDate(date5.getDate() + 1);

const date6 = new Date(date5);
date6.setDate(date6.getDate() + 1);

const[one , setOne] = useState(0);
const[two , setTwo] = useState(0);
const[three , setThree] = useState(0);
const[four, setFour] = useState(0);
const[five , setFive] = useState(0);
const[six , setSix] = useState(0);

const navigate = useNavigate();

 

    useEffect(()=>{
        const fun = async() => {
          console.log(prop)
            const resp = await axios.post(`${apiUrl}/api/getfromNUmber`, {
                "fromName" : prop.fromStation
            },{withCredentials: true }).then((response)=>{
                console.log(response.data.fromStationNumber)
                setFromNumber(response.data.fromStationNumber);
            })
        }
        fun()
    },[])

    useEffect(()=>{

       const fun = async() => {
       
     if(fromNumber != null){
        const tempdate = `${date2.getDate()}-${date2.getMonth()+1}-${date2.getFullYear()}`
        // console.log(tempdate)
        const temp = await axios.post(`${apiUrl}/api/getavailableSeats`, {
           "trainDate" : tempdate,
           "fromNumber" : fromNumber,
            "toNumber" : 0,
             "trainNo" : prop.trainNumber
               },{withCredentials: true })
               setTwo(temp.data.value)
     }
       }
       fun()      
    },[fromNumber])

    useEffect(()=>{
        const fun = async() => {
      if(fromNumber != null){
         const tempdate = `${date3.getDate()}-${date3.getMonth()+1}-${date3.getFullYear()}`
         // console.log(tempdate)
         const temp = await axios.post(`${apiUrl}/api/getavailableSeats`, {
            "trainDate" : tempdate,
            "fromNumber" : fromNumber,
             "toNumber" : 0,
              "trainNo" : prop.trainNumber
                },{withCredentials: true })
                setThree(temp.data.value)
      }
        }
        fun()      
     },[fromNumber])

     useEffect(()=>{
        const fun = async() => {
      if(fromNumber != null){
         const tempdate = `${date4.getDate()}-${date4.getMonth()+1}-${date4.getFullYear()}`
         // console.log(tempdate)
         const temp = await axios.post(`${apiUrl}/api/getavailableSeats`, {
            "trainDate" : tempdate,
            "fromNumber" : fromNumber,
             "toNumber" : 0,
              "trainNo" : prop.trainNumber
                },{withCredentials: true })
                setFour(temp.data.value)
      }
        }
        fun()      
     },[fromNumber])

     useEffect(()=>{
        const fun = async() => {
      if(fromNumber != null){
         const tempdate = `${date5.getDate()}-${date5.getMonth()+1}-${date5.getFullYear()}`
         // console.log(tempdate)
         const temp = await axios.post(`${apiUrl}/api/getavailableSeats`, {
            "trainDate" : tempdate,
            "fromNumber" : fromNumber,
             "toNumber" : 0,
              "trainNo" : prop.trainNumber
                },{withCredentials: true })
                setFive(temp.data.value)
      }
        }
        fun()      
     },[fromNumber])

     useEffect(()=>{
        const fun = async() => {
      if(fromNumber != null){
         const tempdate = `${date6.getDate()}-${date6.getMonth()+1}-${date6.getFullYear()}`
         // console.log(tempdate)
         const temp = await axios.post(`${apiUrl}/api/getavailableSeats`, {
            "trainDate" : tempdate,
            "fromNumber" : fromNumber,
             "toNumber" : 0,
              "trainNo" : prop.trainNumber
                },{withCredentials: true })
                setSix(temp.data.value)
      }
        }
        fun()      
     },[fromNumber])

     useEffect(()=>{
        const fun = async() => {
      if(fromNumber != null){
         const tempdate = `${datee.getDate()}-${datee.getMonth()+1}-${datee.getFullYear()}`
         // console.log(tempdate)
         const temp = await axios.post(`${apiUrl}/api/getavailableSeats`, {
            "trainDate" : tempdate,
            "fromNumber" : fromNumber,
             "toNumber" : 0,
              "trainNo" : prop.trainNumber
                },{withCredentials: true })
                setOne(temp.data.value)
      }
        }
        fun()      
     },[fromNumber])

const [selectedDate , setSelectedDate] = useState(datee);
// console.log(selectedDate)

const handleSubmit = () => {
    if(selectedDate.getDate() == dateofthemonth){
         if(prop.totalCapacity - one <= 0){
          toast.error("No seats left in the train on this date")
         }else{
          navigate(`/bookTicket?from=${prop.fromStation}&to=${prop.toStation}&date=${selectedDate}&trainNo=${prop.trainNumber}&trainName=${prop.trainName}&FromStationNumber=${prop.fromStationNumber}&toStationNumber=${prop.toStationNumber}&endDate=${finalDate}&endTime=${finalTime}&fare=${prop.fare}&starttime=${prop.startTime}&duration=${prop.duration}`);
         }
    }else if(selectedDate.getDate() == date2.getDate()){
      if(prop.totalCapacity - two <= 0){
        toast.error("No seats left in the train on this date")
       }else{
        navigate(`/bookTicket?from=${prop.fromStation}&to=${prop.toStation}&date=${selectedDate}&trainNo=${prop.trainNumber}&trainName=${prop.trainName}&FromStationNumber=${prop.fromStationNumber}&toStationNumber=${prop.toStationNumber}&endDate=${finalDate}&endTime=${finalTime}&fare=${prop.fare}&starttime=${prop.startTime}&duration=${prop.duration}`);
       }
    }else if(selectedDate.getDate() == date3.getDate()){
      if(prop.totalCapacity - three <= 0){
        toast.error("No seats left in the train on this date")
       }else{
        navigate(`/bookTicket?from=${prop.fromStation}&to=${prop.toStation}&date=${selectedDate}&trainNo=${prop.trainNumber}&trainName=${prop.trainName}&FromStationNumber=${prop.fromStationNumber}&toStationNumber=${prop.toStationNumber}&endDate=${finalDate}&endTime=${finalTime}&fare=${prop.fare}&starttime=${prop.startTime}&duration=${prop.duration}`);
       }
    }else if(selectedDate.getDate() == date4.getDate()){
      if(prop.totalCapacity - four <= 0){
        toast.error("No seats left in the train on this date")
       }else{
        navigate(`/bookTicket?from=${prop.fromStation}&to=${prop.toStation}&date=${selectedDate}&trainNo=${prop.trainNumber}&trainName=${prop.trainName}&FromStationNumber=${prop.fromStationNumber}&toStationNumber=${prop.toStationNumber}&endDate=${finalDate}&endTime=${finalTime}&fare=${prop.fare}&starttime=${prop.startTime}&duration=${prop.duration}`);
       }
    }else if(selectedDate.getDate() == date5.getDate()){
      if(prop.totalCapacity - five <= 0){
        toast.error("No seats left in the train on this date")
       }else{
        navigate(`/bookTicket?from=${prop.fromStation}&to=${prop.toStation}&date=${selectedDate}&trainNo=${prop.trainNumber}&trainName=${prop.trainName}&FromStationNumber=${prop.fromStationNumber}&toStationNumber=${prop.toStationNumber}&endDate=${finalDate}&endTime=${finalTime}&fare=${prop.fare}&starttime=${prop.startTime}&duration=${prop.duration}`);
       }
    }else if(selectedDate.getDate() == date6.getDate()){
      if(prop.totalCapacity - six <= 0){
        toast.error("No seats left in the train on this date")
       }else{
        navigate(`/bookTicket?from=${prop.fromStation}&to=${prop.toStation}&date=${selectedDate}&trainNo=${prop.trainNumber}&trainName=${prop.trainName}&FromStationNumber=${prop.fromStationNumber}&toStationNumber=${prop.toStationNumber}&endDate=${finalDate}&endTime=${finalTime}&fare=${prop.fare}&starttime=${prop.startTime}&duration=${prop.duration}`);
       }
    }
}

useEffect(()=>{
  if(date){
    const tempdate = new Date(date);
  const stringdate = tempdate.toISOString().substring(0, 10);
  // console.log(strindate)
      const startDateTime = new Date(`${stringdate}T${prop.startTime}`);
      
      const [hours, minutes] = prop.duration.split(':').map(Number);
      
      const finalDateTime = new Date(startDateTime);
      finalDateTime.setHours(finalDateTime.getHours() + hours);
      finalDateTime.setMinutes(finalDateTime.getMinutes() + minutes);
  
      const finalDate = finalDateTime.toISOString().split('T')[0];
      const finalTime = finalDateTime.toTimeString().split(' ')[0].substring(0, 5);
  // console.log(finalDate , finalTime);
  const sumnedate = new Date(finalDate)
  setFinalDate(sumnedate.toString());
  setFinalTime(finalTime);
  setSDate(datee.toString())
  }
},[])


  return (
    <div className='ml-80 mt-5 mr-2'>
         <div className="bg-white text-black p-2 rounded-lg  mx-auto">
      <div className="flex justify-between items-center bg-gray-100 h-10">
        <div>
          <h2 className="text-xl font-bold">{prop.trainName } ({prop.trainNumber})</h2>
        </div>
        <div className="text-right mx-auto">
          <span className="block">Runs On: M T W T F S S</span>
        </div>
      </div>
      <div className=" flex justify-between items-center mx-4">
        <div className="text-xl "><span className='font-bold'>{prop.startTime}</span> | {prop.fromStation} |  {sDate.substring(0,3)}, {sDate.substring(7,10)} {sDate.substring(3,7)}</div>
        <div className="mt-4 text-center">
        <span className="block">-- {prop.duration} --</span>
      </div>
        <div className="text-xl "><span className='font-bold'>{finalTime}</span> | {prop.toStation} |  {finalDate.substring(0,3)}, {finalDate.substring(7,10)} {finalDate.substring(3,7)}</div>
      </div>
      
      <div className="mt-4 m-1 ml-4 ">
        <button onClick={()=>{setSelectedDate(datee)}}  className= {selectedDate.getDate() == dateofthemonth && prop.totalCapacity - one > 0 ? " border-2 border-indigo-600  bg-gray-300  mr-3 text-left p-2 rounded  pr-9" : "border-2  bg-gray-300 border-red-600 mr-3 text-left p-2 rounded  pr-9 text-red-400"}>  <span className='text-md font-bold'> {dayOfWeek}, {dateofthemonth} {monthsoftheyear[datee.getMonth()]}</span> <br></br> <span className={prop.totalCapacity - one > 0 ?'text-lg font-bold text-green-500' :'text-lg font-bold text-red-500 '}>AVAILABLE {prop.totalCapacity - one}</span> </button>
        <button onClick={()=>{setSelectedDate(date2)}} className= {selectedDate.getDate() == date2.getDate()  && prop.totalCapacity - two > 0 ? " border-2 border-indigo-600  bg-gray-300  mr-3 text-left p-2 rounded  pr-9" : "border-2  bg-gray-300  mr-3 text-left p-2 rounded  pr-9"}>  <span className='text-md font-bold'> {daysOfWeek[date2.getDay()]}, {date2.getDate()} {monthsoftheyear[date2.getMonth()]}</span> <br></br> <span className={prop.totalCapacity - two > 0 ?'text-lg font-bold text-green-500' :'text-lg font-bold text-red-500 '} >AVAILABLE {prop.totalCapacity - two}</span> </button>
        <button onClick={()=>{setSelectedDate(date3)}} className= {selectedDate.getDate() == date3.getDate()  && prop.totalCapacity - three > 0 ? " border-2 border-indigo-600  bg-gray-300  mr-3 text-left p-2 rounded  pr-9" : "border-2  bg-gray-300  mr-3 text-left p-2 rounded  pr-9"}>  <span className='text-md font-bold'> {daysOfWeek[date3.getDay()]}, {date3.getDate()} {monthsoftheyear[date3.getMonth()]}</span> <br></br> <span className={prop.totalCapacity - three > 0 ?'text-lg font-bold text-green-500' :'text-lg font-bold text-red-500 '} >AVAILABLE {prop.totalCapacity - three}</span> </button>
        <button onClick={()=>{setSelectedDate(date4)}} className= {selectedDate.getDate() == date4.getDate()  && prop.totalCapacity - four > 0 ? " border-2 border-indigo-600  bg-gray-300  mr-3 text-left p-2 rounded  pr-9" : "border-2  bg-gray-300  mr-3 text-left p-2 rounded  pr-9"}>  <span className='text-md font-bold'> {daysOfWeek[date4.getDay()]}, {date4.getDate()} {monthsoftheyear[date4.getMonth()]}</span> <br></br> <span className={prop.totalCapacity - four > 0 ?'text-lg font-bold text-green-500' :'text-lg font-bold text-red-500 '} >AVAILABLE {prop.totalCapacity - four}</span> </button>
        <button onClick={()=>{setSelectedDate(date5)}} className= {selectedDate.getDate() == date5.getDate()  && prop.totalCapacity - five > 0 ? " border-2 border-indigo-600  bg-gray-300  mr-3 text-left p-2 rounded  pr-9" : "border-2  bg-gray-300  mr-3 text-left p-2 rounded  pr-9"}>  <span className='text-md font-bold'> {daysOfWeek[date5.getDay()]}, {date5.getDate()} {monthsoftheyear[date5.getMonth()]}</span> <br></br> <span className={prop.totalCapacity - five > 0 ?'text-lg font-bold text-green-500' :'text-lg font-bold text-red-500 '} >AVAILABLE {prop.totalCapacity - five}</span> </button>
        <button onClick={()=>{setSelectedDate(date6)}} className= {selectedDate.getDate() == date6.getDate()  && prop.totalCapacity - six > 0 ? " border-2 border-indigo-600  bg-gray-300  mr-3 text-left p-2 rounded  pr-9" : "border-2  bg-gray-300  mr-3 text-left p-2 rounded  pr-9"}>  <span className='text-md font-bold'> {daysOfWeek[date6.getDay()]}, {date6.getDate()} {monthsoftheyear[date6.getMonth()]}</span> <br></br> <span className={prop.totalCapacity - six > 0 ?'text-lg font-bold text-green-500' :'text-lg font-bold text-red-500 '} >AVAILABLE {prop.totalCapacity - six}</span> </button>
        
      </div>
      
      <div className="mt-3 ml-4 mb-1  ">
        <button onClick={handleSubmit} className="bg-orange-500 font-semibold text-md text-black px-4 py-2 rounded">Book Now</button>
        {/* <button className="bg-gray-700 px-4 py-2 rounded">OTHER DATES</button> */}
      </div>
    </div>

    </div>
  )
}
