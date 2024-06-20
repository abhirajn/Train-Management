import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const AdminGroupAdd = () => {
    // Input times


// Function to calculate duration between two times
const  calculateDurationInMinutes = (time1, time2) => {
    // Convert times to total minutes
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);
    
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Calculate the difference in minutes
    let diffMinutes = Math.abs(totalMinutes1 - totalMinutes2);

    // Convert the difference back to hours and minutes
    const diffHours = Math.floor(diffMinutes / 60);
    diffMinutes = diffMinutes % 60;

    // Return the duration
    return `${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}`;
}

// Calculate duration
// const duration = calculateDurationInMinutes(time1, time2);

// console.log(duration); // Output: "01:00"

  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const[trainName , setTrainName] = useState('');
  const[tno, setTno] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const stations = inputValues.firstName.split(",");
    const timings = inputValues.lastName.split(",");
    const fares = inputValues.email.split(",");
const len = stations.length;
for(var i = 0; i < len; i++){
    for(var j = i+1; j < len; j++){
        const resp = await axios.post(`${apiUrl}/admin/addtrain`,{
            trainName: trainName,
        trainNumber: tno,
        fromStation: stations[i],
        toStation: stations[j],
        fromStationNumber: Number(i),
        toStationNumber: Number(j),
        startTime: timings[i],
        duration: await calculateDurationInMinutes(timings[j] , timings[i]),
        status: "Running",
        totalCapacity: 100,
        fare: Number(Number(fares[j]) - Number(fares[i]))
       }, {withCredentials : true} )
       .then(()=>{
        toast.success("train added")
       })
       .catch((err)=>{
        toast.error("couldnt able to add")
            console.log(err)
        })
    }
}
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
         <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Train Name</label>
        <input
          type="text"
          id="dasf"
          name="daf"
          value={trainName}
          onChange={(e)=>{setTrainName(e.target.value)}}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter timings"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Train NO</label>
        <input
          type="number"
          id="nfakljhf"
          name="kdajskdjf"
          value={tno}
          onChange={(e)=>{setTno(e.target.value)}}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter timings"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Stations</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your first name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">TImings</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter timings"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Fares</label>
        <input
          type="text"
          id="email"
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your email"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
      <ToastContainer/>
    </form>
  );
};

export default AdminGroupAdd;
