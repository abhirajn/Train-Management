import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../adminComponents/AdminNavbar';
import Sidebar from '../adminComponents/Sidebar';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const AddTrains = ({adminlogged,setAdminlogged}) => {
    const navigate = useNavigate();
  const [trainDetails, setTrainDetails] = useState({
    trainName: '',
    trainNumber: '',
    fromStation: '',
    toStation: '',
    fromStationNumber: '',
    toStationNumber: '',
    startTime: '',
    duration: '',
    status: 'Running',
    totalCapacity: '',
    fare:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainDetails({ ...trainDetails, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Train Details Submitted:', trainDetails);
    const resp = await axios.post(`${apiUrl}/admin/addtrain`,{
        trainName: trainDetails.trainName,
    trainNumber: trainDetails.trainNumber,
    fromStation: trainDetails.fromStation,
    toStation: trainDetails.toStation,
    fromStationNumber: trainDetails.fromStationNumber,
    toStationNumber: trainDetails.toStationNumber,
    startTime: trainDetails.startTime,
    duration: trainDetails.duration,
    status: trainDetails.status,
    totalCapacity: trainDetails.totalCapacity,
    fare: trainDetails.fare
   }, {withCredentials : true} )
   .then(()=>{
    setTrainDetails({
        trainName: '',
        trainNumber: '',
        fromStation: '',
        toStation: '',
        fromStationNumber: '',
        toStationNumber: '',
        startTime: '',
        duration: '',
        status: 'Running',
        totalCapacity: '',
        fare:''
    })
    // navigate('/admin/home')
   })
   .catch((err)=>{
        console.log(err)
    })
  };

  return (
    <div className='min-h-screen bg-gray-100 flex'>
        {/* <AdminNavbar/> */}
        <Sidebar adminlogged={adminlogged}  setAdminlogged={setAdminlogged}/>
    <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add Train Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="trainName" className="block text-gray-700 mb-2">Train Name:</label>
          <input
            type="text"
            id="trainName"
            name="trainName"
            value={trainDetails.trainName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="trainNumber" className="block text-gray-700 mb-2">Train Number:</label>
          <input
            type="text"
            id="trainNumber"
            name="trainNumber"
            value={trainDetails.trainNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className='flex justify-between'>
        <div className="mb-4">
          <label htmlFor="fromStation" className="block text-gray-700 mb-2">From Station:</label>
          <input
            type="text"
            id="fromStation"
            name="fromStation"
            value={trainDetails.fromStation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="toStation" className="block text-gray-700 mb-2">To Station:</label>
          <input
            type="text"
            id="toStation"
            name="toStation"
            value={trainDetails.toStation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        </div>
        <div className='flex justify-between'>
        <div className="mb-4">
          <label htmlFor="fromStation" className="block text-gray-700 mb-2">From Station Number:</label>
          <input
            type="text"
            id="fromStationNumber"
            name="fromStationNumber"
            value={trainDetails.fromStationNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="toStation" className="block text-gray-700 mb-2">To Station Number:</label>
          <input
            type="text"
            id="toStationNumber"
            name="toStationNumber"
            value={trainDetails.toStationNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        </div>
       <div className='flex justify-between'>
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-gray-700 mb-2">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={trainDetails.startTime}
            onChange={handleChange}
            required
            className="w-52 px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-gray-700 mb-2">Duration:</label>
          <input
            type="time"
            id="endTime"
            name="duration"
            value={trainDetails.duration}
            onChange={handleChange}
            required
            className="w-52 px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        </div>

        <div className='flex justify-between'>

        
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 mb-2">Status:</label>
          <select
            id="status"
            name="status"
            value={trainDetails.status}
            onChange={handleChange}
            required
            className="w-52 px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Running">Running</option>
            <option value="Not Running">Not Running</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="totalCapacity" className="block text-gray-700 mb-2">Total Capacity:</label>
          <input
            type="number"
            id="totalCapacity"
            name="totalCapacity"
            value={trainDetails.totalCapacity}
            onChange={handleChange}
            required
            className="w-52 px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="totalCapacity" className="block text-gray-700 mb-2">Total Fare:</label>
          <input
            type="number"
            id="fare"
            name="fare"
            value={trainDetails.fare}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          Add Train
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddTrains;
