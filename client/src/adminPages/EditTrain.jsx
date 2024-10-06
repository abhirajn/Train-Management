import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../adminComponents/AdminNavbar';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../adminComponents/Sidebar';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const EditTrain = ({adminlogged ,setAdminlogged}) => {
    const navigate = useNavigate();
    const[tno , setTno] = useState();
    const[frnum , setFrnum] = useState();
    const[tonum , setTonum] = useState();
    const[checked , setChecked] = useState(false);
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
    // console.log('Train Details Submitted:', trainDetails);
    if(checked){
      const resp = await axios.post(`${apiUrl}/admin/updateAllTrainInfo`,{
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
    toast.success("train updated")
    // navigate('/admin/home')
    // console.log(resp)
   }).catch((err)=>{
        console.log(err)
    })
    }
    else{
      const resp = await axios.post(`${apiUrl}/admin/updateTrainInfo`,{
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
    toast.success("train updated")
    // navigate('/admin/home')
    // console.log(resp)
   }).catch((err)=>{
        console.log(err)
    })
    }
  
  };

  const handleClick = async(e) =>{
    try {
      
        const resp = await axios.post(`${apiUrl}/admin/getTrainFromNumber`,{
            trainNumber : tno,
            fromStationNumber : frnum,
            toStationNumber : tonum
        },{withCredentials : true}).then((res)=>{
            setTrainDetails({
                trainName: res.data[0][0].trainName,
    trainNumber: res.data[0][0].trainNumber,
    fromStation: res.data[0][0].fromStation,
    toStation: res.data[0][0].toStation,
    fromStationNumber: res.data[0][0].fromStationNumber,
    toStationNumber: res.data[0][0].toStationNumber,
    startTime: res.data[0][0].startTime,
    duration: res.data[0][0].duration,
    status: res.data[0][0].status,
    totalCapacity: res.data[0][0].totalCapacity,
    fare: res.data[0][0].fare
            })
        })
        // console.log(resp.data[0][0])
    } catch (error) {
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
        console.log("err")
        toast.error("enter from and to number")
    }
  }
  return (
    <div className='min-h-screen bg-gray-100 flex'>
        {/* <AdminNavbar/> */}
        <Sidebar adminlogged={adminlogged}  setAdminlogged={setAdminlogged}/>
        <div className='flex'>
        <div className='ml-40 mr-20 my-40'>
        <div className="mb-4">
          <label htmlFor="trainName" className="block text-gray-700 mb-2">Enter Train Number:</label>
          <input
            type="text"
            id="trainName"
            name="trainName"
            value={tno}
            onChange={(e)=>{setTno(e.target.value)}}
            // required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="trainName" className="block text-gray-700 mb-2">Enter From Number:</label>
          <input
            type="text"
            id="fromtrainName"
            name="fromtrainName"
            value={frnum}
            onChange={(e)=>{setFrnum(e.target.value)}}
            // required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="trainName" className="block text-gray-700 mb-2">Enter To Number:</label>
          <input
            type="text"
            id="totrainName"
            name="totrainName"
            value={tonum}
            onChange={(e)=>{setTonum(e.target.value)}}
            // required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
        <button type="button" onClick={handleClick} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          Submit
        </button>
        </div>
        </div>
    <div className="max-w-lg  mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Train Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="trainName" className="block text-gray-700 mb-2">Train Name:</label>
          <input
            type="text"
            id="trainName"
            name="trainName"
            value={trainDetails.trainName}
            onChange={handleChange}
            // required
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
            // required
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
            // required
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
            // required
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
            // required
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
            // required
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
            // required
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
            // required
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
            // required
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
            // required
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
            // required
            className="w-full px-3 py-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className='flex'>
        <div className="mb-4 h-2">
          <label htmlFor="totalCapacity" className="block text-gray-700 mb-2">Update:</label>
          <input
            type="checkbox"
            id="fare"
            name="fare"
            onClick={()=>{setChecked(!checked)}}
            className="w-10  border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          Update Train
        </button>
        </div>
      </form>
    </div>
    </div>
    <ToastContainer/>
    </div>
  );
};

export default EditTrain;
