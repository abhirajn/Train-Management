import React, { useEffect, useState } from 'react'

export default function PassengerForm({id , setpassInfo ,sett}) {
  const[name , setName] = useState("");
  const[age , setAge] = useState();
  const[gender , setGender] = useState("");

  // setpassInfo(obj)
  useEffect(()=>{
    let obj = {
      "name" : name,
      "age" : age,
      "gender" : gender
    }
    setpassInfo(obj)
  },[gender])
 
  return (
    <div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
            <div className="flex flex-col">
              <label  className="mb-1 text-sm font-medium text-gray-700">Passenger Name</label>
              <input 
              value={name}
              name='name'
              onChange={(e)=>{
                setName(e.target.value)}}
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Passenger Name"
              />
              <p className="text-xs text-red-500 mt-1">Please enter a valid name between 3 and 16 characters.</p>
            </div>

            <div className="flex flex-col ">
              <label className="mb-1 text-sm font-medium text-gray-700">Age</label>
              <input
              value={age}
              onChange={(e)=>{setAge(e.target.value)}}
                type="number"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Age"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Gender</label>
              <select
              value={gender}
              onChange={(e)=>{setGender(e.target.value)}}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <p className="text-xs text-red-500 mt-1">Please select a gender.</p>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Nationality</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="india">India</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Berth Preference</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="no_preference">No Preference</option>
                {/* <option value="male">Male</option> */}
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="flex flex-col pt-6 ">
              <div>            <button 
              onClick={()=>{sett(false)}}
              className="bg-red-200 text-black px-3 py-1 rounded-lg">Remove</button>
</div>
            </div>
          </div>
        </div>
    </div>
  )
}
