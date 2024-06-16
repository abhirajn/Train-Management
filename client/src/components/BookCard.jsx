import React, { useEffect, useState } from 'react'
import PassengerForm from './PassengerForm';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export default function BookCard() {
 const navigate = useNavigate();
  // from=${prop.fromName}&to=${prop.toName}&date=${selectedDate}&trainNo=${prop.trainNo}&trainName=${prop.trainName}&FromStationNumber=${prop.FromStationNumber}&toStationNumber=${prop.toStationNumber}
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = new Date(searchParams.get('date'));
  const trainNo = searchParams.get('trainNo');
  const trainName = searchParams.get('trainName');
  const FromStationNumber = searchParams.get('FromStationNumber');
  const toStationNumber = searchParams.get('toStationNumber');
  const finalDate = searchParams.get('endDate');
  const finalTime = searchParams.get('endTime');
  const fare = searchParams.get('fare');
  const starttime = searchParams.get('starttime');
  const duration = searchParams.get('duration')
  // const 
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', ' Fri', 'Sat'];
const monthsoftheyear = ['Jan' , 'Feb', 'Mar' ,'April', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ]
 


    const[totalPass , setTotalPass] = useState([true,false,false,false]);
    const[passInfo , setPassInfo] = useState([]);
    // let arr = [true,false,false,false];

    const [one , setOne] = useState(true);
    const [two , setTwo] = useState(false);
    const [three , setThree] = useState(false);
    const [four , setFour] = useState(false);
    const [payMode , setPayMode] = useState(1);
    
   
// console.log(totalPass)/
const[sumne, setSumne ] = useState(0)
let temparr = ["hi"];
// var sumne = 0;


const handlechange = () => {
  // console.log("inside handlechanfe")
  if(one == false){
   setOne(true)
  }else if(two == false){
    setTwo(true)
  }else if(three == false){
   setThree(true)
  }else if(four== false){
    setFour(true);
  }else{
    toast.error("one person can book upto four people")
  }


}

const [oneinfo , setOneinfo] = useState({"name" : "" , "age" : 0 , "gender" :""});
const [twoinfo , setTwoinfo] = useState({"name" : "" , "age" : 0 , "gender" :""});
const [threeinfo , setThreeinfo] = useState({"name" : "" , "age" : 0 , "gender" :""});
const [fourinfo , setFourinfo] = useState({"name" : "" , "age" : 0 , "gender" :""});

// console.log(oneinfo ,twoinfo , threeinfo , fourinfo)

const handleBook = () => {
  var passengerNames = "";
  var passengerAge = "";
  var passengerGender = "";
  var total_ticket = 0;
  var tempdate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  if(one){
    passengerNames += oneinfo.name;
    passengerAge += oneinfo.age;
    passengerGender += oneinfo.gender;
    total_ticket += 1;
  }
  if(two){
    passengerNames += "," + twoinfo.name;
    passengerAge += "," + twoinfo.age;
    passengerGender += "," + twoinfo.gender;
    total_ticket += 1;
  }
  if(three){
    passengerNames += "," + threeinfo.name;
    passengerAge += "," + threeinfo.age;
    passengerGender += "," + threeinfo.gender;
    total_ticket += 1;
  }
  if(four){
    passengerNames += "," + fourinfo.name;
    passengerAge += "," + fourinfo.age;
    passengerGender += "," + fourinfo.gender;
    total_ticket += 1;
  }


  const fun = async() => {
    const resp =  await axios.post(`${apiUrl}/api/bookticket`, {
      "userId" : "user1@gmail.com",
      "pnrNumber" : 1123,
       "trainNo" : trainNo,
      "trainName"  :trainName, 
      "fromName" : from,
       "toName"  : to,
        "fromStationNumber" : FromStationNumber,
         "toStationNumber" : toStationNumber,
          "trainDate" : tempdate,
           "passengerNames" : passengerNames,
            "passengerAge" : passengerAge,
             "passengerGender" : passengerGender,
              "totalTickets" : total_ticket
    },{withCredentials: true })
  }
  fun().then(()=>{
    alert("tickets booked")
    navigate('/')
    
  });
}


const handleContinue = () =>{
  var passengerNames = "";
  var passengerAge = "";
  var passengerGender = "";
  var total_ticket = 0;
  var tempdate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
  if(one){
    passengerNames += oneinfo.name;
    passengerAge += oneinfo.age;
    passengerGender += oneinfo.gender;
    total_ticket += 1;
  }
  if(two){
    passengerNames += "," + twoinfo.name;
    passengerAge += "," + twoinfo.age;
    passengerGender += "," + twoinfo.gender;
    total_ticket += 1;
  }
  if(three){
    passengerNames += "," + threeinfo.name;
    passengerAge += "," + threeinfo.age;
    passengerGender += "," + threeinfo.gender;
    total_ticket += 1;
  }
  if(four){
    passengerNames += "," + fourinfo.name;
    passengerAge += "," + fourinfo.age;
    passengerGender += "," + fourinfo.gender;
    total_ticket += 1;
  }


  const data = {
    "userId" : "",
      "pnrNumber" : 0,
       "trainNo" : trainNo,
      "trainName"  :trainName, 
      "fromName" : from,
       "toName"  : to,
        "fromStationNumber" : FromStationNumber,
         "toStationNumber" : toStationNumber,
          "trainDate" : tempdate,
           "passengerNames" : passengerNames,
            "passengerAge" : passengerAge,
             "passengerGender" : passengerGender,
              "totalTickets" : total_ticket,
              "selection" : payMode,
              "finalDate" : finalDate,
              "finalTime" : finalTime,
              "fare" : fare,
              "starttime" : starttime,
              "duration" : duration
  }
  
    navigate('/ticketSummary', { state: data });
}


  return (
    <div className='bg-white '>


        {/* <div className=' pt-24 p-8 border-2  border-black rounded '>
            <div className='text-3xl font-bold'>SBC TLGP EXP (20651)</div>
            <div className='flex text-2xl my-2 mt-6  w-10/12'>
                <div className=''><span className='font-bold pb-1'>15:00 | KSR BENGALURU </span>
                <div className='text-center'>Tue, 21 May</div></div>
                <div className='mx-auto'>__04:14___</div>
                <div className='absolute right-0 mr-6'><span className='font-bold pb-1'>19:14 | SHIVAMOGGA H </span>
                <div className='text-center'>Tue, 21 May</div></div>
            </div>
            <div className='text-center font-bold m-4 '> <span className='p-2 border-2 bg-gray-100'>Second Sitting (2S) | General</span></div>
        </div> */}


<div className="px-16 py-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="border-b border-gray-300 shadow-md pb-4 mb-4">
          <h1 className="text-2xl font-bold">{trainName} ({trainNo})</h1>
          <p className="text-sm text-gray-600">Runs On: M T W T F S S</p>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-lg">{starttime} | {from}</p>
              <p className="text-sm text-gray-600">{daysOfWeek[date.getDay()]}, {date.getDate()} {monthsoftheyear[date.getMonth()]}</p>
            </div>
            <p className="text-xl font-semibold">-- {duration} --</p>
            <div>
              <p className="text-lg">{finalTime} | {to}</p>
              <p className="text-sm text-gray-600">{daysOfWeek[date.getDay()]}, {date.getDate()} {monthsoftheyear[date.getMonth()]}</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-yellow-200 text-black px-3 py-1 rounded-lg mr-2">Second Sitting (2S)</button>
            <button className="bg-yellow-200 text-black px-3 py-1 rounded-lg">General</button>
          </div>
        </div>

        <div className="border-b border-gray-300 pb-4 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Boarding Station:</h2>
            <div>
              <p className="text-sm">Boarding Station | <span className="font-semibold">{from}</span></p>
              <p className="text-sm">Arrival: {finalTime} | Departure: {starttime} | Day: 1 | Boarding Date: {daysOfWeek[date.getDay()]}, {date.getDate()} {date.getFullYear()}</p>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">Please check <a href="#" className="underline">NTES website</a> or <a href="#" className="underline">NTES app</a> for actual time before boarding.</p>
        </div>

        <div className="bg-orange-100 border-gray-300 p-4 rounded-md mb-4">
          <p className="text-sm text-orange-800">Note: Please submit full name of the passengers instead of initials.</p>
          <p className="text-sm text-orange-800">Note: The ID card will be required during journey.</p>
        </div>


<div className='border-b border-gray-300'>
<h2 className="text-xl font-semibold mb-2">Passenger Details</h2>
{one ? <PassengerForm  id={0} setpassInfo={setOneinfo} sett={setOne} /> : ""}
{two ? <PassengerForm  id={1} setpassInfo={setTwoinfo} sett={setTwo}/> : ""}
{three ? <PassengerForm  id={2} setpassInfo={setThreeinfo} sett={setThree} /> : ""}
{four ? <PassengerForm  id={3} setpassInfo={setFourinfo} sett={setFour} /> : ""}
</div>
        
         <div className='border-b border-gray-300'>
        <div className="mt-6 flex justify-between items-center">
          <button className="text-blue-600 hover:underline" onClick={handlechange}>+ Add Passenger</button>
          {/* <button className="text-blue-600 hover:underline">+ Add Infant Without Berth</button> */}
        </div>

        <p className="mt-4 text-xs text-gray-500">
          *Children under 5 years of age shall be carried free and no purchase of any ticket is required. (If no separate berth is opted.)
        </p>

        </div>
        <div className="border-b border-gray-300 py-4 my-1 ">
          <div className=" justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
            <div>
<p>(Ticket details will be sent to email- ********@gmail.com and registered mobile number ******)</p>
            </div>
          </div>

        </div>

        <div className="border-b border-gray-300 py-4 my-1 ">
          <div className=" justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">Payment Mode</h2>
            <div>
              <input onClick={()=>{setPayMode(1)}} type='radio' name='radio' id='money' />
              <label htmlFor="money" className='font-bold'> Pay through Credit & Debit Cards / Net Banking / Wallets / Bharat QR / Pay on Delivery/ Rewards and Others</label>
              <p className='font-sm text-gray-600'>Convenience Fee: ₹15/- + GST</p>
              <input onClick={()=>{setPayMode(2)}} className='mt-4' type='radio' name='radio' id='upi' />
              <label htmlFor="upi" className='font-bold'>Pay through BHIM/UPI</label>
              <p className='font-sm text-gray-600'>Convenience Fee: ₹10/- + GST</p>
            </div>
          </div>

        </div>
<div>
  <p className='font-bold text-xl m-4 mb-2'>Total fare is {fare} </p>
</div>

        <div className='m-3'>
        <button onClick={()=>{navigate('/')}} className="bg-white border border-black text-black text-lg font-bold px-4 py-2 rounded-lg mr-3">Back</button>

        <button  onClick={handleContinue}  className="bg-orange-200  border border-black text-black text-lg font-bold px-4 py-2 rounded-lg">Continue</button>
        </div>
      </div>
    </div>
        <ToastContainer/>
    </div>
  )
}
