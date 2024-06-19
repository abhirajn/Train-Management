import React, { useState } from 'react'
import SummaryPassInfo from './SummaryPassInfo';
import ReCaptcha from './ReCaptcha';
import { useNavigate } from 'react-router-dom';

export default function SummaryCard({state}) {
  // console.log(state)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', ' Fri', 'Sat'];
  const monthsoftheyear = ['Jan' , 'Feb', 'Mar' ,'April', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ]
  const date = new Date(state.trainDate);
  var pass = state.passengerNames.split(",");
  var passgen = state.passengerGender.split(",");
  var passage = state.passengerAge.split(",");
const navigate = useNavigate()
  const [verified, setVerified] = useState(false);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (verified) {
      alert('Form submitted successfully!');
    } else {
      alert('Please verify that you are a human!');
    }
  };


var totalfare = Number(state.fare) * pass.length + Number(0.45);
if(state.selection == "1"){
  totalfare += 15;
}else{
  totalfare += 10;
}

  return (
    <div className='bg-white w-full'>
{/* <h1 className='w-full text-2xl font-bold mx-auto'>Summary of the game</h1> */}

<div className="max-w-6xl mx-auto p-4">
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">{state.trainName} ({state.trainNo})</h2>
            <p>{state.starttime} | {state.fromName}</p>
            <p>{daysOfWeek[date.getDay()]}, {date.getDate()} {monthsoftheyear[date.getMonth()]}</p>
          </div>
          <div className="text-right">
            {/* <p className="text-green-600 font-semibold">AVAILABLE-0047</p> */}
            <p>{state.finalTime} | {state.toName}</p>
            <p>{daysOfWeek[date.getDay()]}, {date.getDate()} {monthsoftheyear[date.getMonth()]}</p>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded mb-4">
          <p>{pass.length} Adult | General | Boarding at {state.fromName} | Boarding Date: {date.getDate()} {monthsoftheyear[date.getMonth()]} {date.getFullYear()} {state.starttime}</p>
          <p className="text-sm text-gray-600">Please check <a href="https://enquiry.indianrail.gov.in/ntes/" className="text-blue-600">NTES website</a> or <a href="https://play.google.com/store/apps/details?id=com.cris.ntes" className="text-blue-600">NTES app</a> for actual time before boarding</p>
        </div>
        <div className="border-t border-gray-300 pt-2">
          <h3 className="font-semibold mb-2">Passenger Details</h3>
          {pass.map((d , i)=>(
            <SummaryPassInfo index={i} name={pass[i]} age={passage[i]} gender={passgen[i]}/> 
          ))}
        </div>
        <div className="mt-4">
          {/* <p>Your ticket will be sent to ******@gmail.com</p> */}
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Fare Summary</h3>
        <div className="flex justify-between mb-2">
          <p>Ticket Fare</p>
          <p>₹ {Number(state.fare) * pass.length}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Convenience Fee (Incl. of GST)</p>
          <p>₹ {state.selection == 1 ? 15 : 10}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Travel Insurance (Incl. of GST)</p>
          <p>₹ 0.45</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>Total Fare</p>
          <p>₹ {totalfare}</p>
        </div>
      </div>
      {/* <div className="mt-4">
        <input 
          type="text" 
          placeholder="Enter Captcha" 
          className="border border-gray-300 p-2 rounded w-full"
        />
        {/* <div className="flex justify-between items-center mt-2">
          <span className="font-mono text-xl">nUT rt</span>
          <button className="text-blue-600">Refresh Captcha</button>
        </div> */}
      {/* </div> */} 
      <div className="mt-4 text-right">
        <a href="#" className="text-blue-600">View Cancellation Policy</a>
      </div>

{/* <div> <form onSubmit={handleSubmit}> */}

        {/* <ReCaptcha onChange={handleCaptchaChange} /> */}
       
        {/* <input 
          type="text" 
          placeholder="Enter Captcha" 
          className="border border-gray-300 p-2 rounded "
        required/>
        <button type="submit" className="bg-white border border-black text-black text-sm font-semibold px-4 py-2 rounded-lg mr-3">Submit</button>
      </form></div> */}

      <button onClick={()=>{
          navigate('/payment', { state: state });
      }} className="bg-white border border-black text-black text-lg font-bold px-8 py-1 rounded-lg mr-3 my-5">Pay and Continue</button>
    </div>
    </div>
  )
}
