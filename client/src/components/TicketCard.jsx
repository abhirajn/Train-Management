import { useScrollTrigger } from '@mui/material';
import React, { useState } from 'react';

const TicketCard = ({prop}) => {
    // console.log(prop)

    const [check , setCheck] = useState(false);
    const passengerNames = prop.passengerNames.split(",")
    // console.log(passengerNames)
  const passengerAges = prop.passengerAge.split(",")
  const passengerGender = prop.passengerGender.split(",")


  return (
    <div className=" text-lg bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 m-4">
      <div onClick={()=>{setCheck(!check)}} className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800"> {prop.trainName} ({prop.trainNo})</h2>
          <span className="text-md  text-orange-500 font-bold">PNR: {prop.pnrNumber}</span>
        </div>
        <div className="flex justify-between items-center mt-2 text-gray-600">
          <div>
            <p>{prop.fromTime} | {prop.fromName}</p>
            <p>{prop.fromDate}</p>
          </div>
          
          <div>
            <p>{prop.toTime} | {prop.toName} </p>
            <p>{prop.toDate}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600 font-bold">STATUS: {prop.ticketStatus}</span>
          <p className="text-gray-600">{passengerNames.length} Passengers | Second Sitting (2S)</p>
        </div>
      {check ?   <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-lg font-medium text-gray-700">Passenger Information</h3>
          {passengerNames.map((d , i)=>
            
             <div className="mt-2 text-lg">
             <div className="flex justify-between items-center">
               <span className='mr-1  font-bold'>{i+1}. </span>
               <span className="flex-1 text-left  font-bold">{d}</span>
               <span className=' font-semibold'>{passengerAges[i]} yrs | {passengerGender[i]}</span>
             </div>
             <div className="flex justify-between items-center mt-2">
               <span>Booking Status</span>
               <span className=" text-left  font-bold">CNF</span>
             </div>
             <div className="flex justify-between items-center mt-2">
               <span>Berth Type</span>
               <span className="  text-left  font-bold">NO preferense</span>
             </div>
           </div>
          )}
        </div> : <></>}
      </div>
    </div>
  );
};

export default TicketCard;
