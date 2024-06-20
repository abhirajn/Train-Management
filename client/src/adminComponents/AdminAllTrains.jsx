// HomePage.jsx
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Sidebar from './Sidebar';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const AdminAllTrains = ({adminlogged , setAdminlogged}) => {

  const handleChange = (event, newValue) => {
    // console.log(newValue)
    setFrom(newValue.label);
    // console.log('Selected value:', from);
  };
  
  const tohandleChange = (event, newValue) => {
    // console.log(newValue)
    setTo(newValue.label);
    // console.log('Selected value:', from;
  };
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // Default to today's date
  const [trains, setTrains] = useState([]);
  const[allTrains , setAllTrains] = React.useState([]);
  const[from , setFrom] = React.useState("");
  const[to , setTo] = React.useState("");
  const [hoveredTrain, setHoveredTrain] = useState(null);
  useEffect(()=>{ 
    const fun = async()=>{
      const res = await axios.get(`${apiUrl}/api/getallTrains`).then(response => {
        // Handle success
        
        var arr = []
        Object.keys(response.data).forEach((d)=>{
          const obj= {label : response.data[d].value}
  // console.log(response.data[d].value)
  arr.push(obj);
  })
  console.log(arr);
  setAllTrains(arr);
        
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
    }
    fun();
  },[])

  const handleSubmit = async()=>{
    // const fun = async() =>{
      console.log(from , to)
      if(from && to){
       
        const resp =await axios.post(`${apiUrl}/admin/getTrains`, {
          "from" : from,
          "to" : to
        },{withCredentials: true}).then((response)=>{
          var arr = [];
          Object.keys(response.data).forEach((data)=>{
            arr.push(response.data[data]);
          })
          setTrains(arr);
          // console.log(arr);
        }).catch(error => {
          // console.log("hi")
          toast.error("login first", {
            position: "top-center",
            autoClose: 1000,
            onClose : () => navigate('/admin/login')
          })
          console.error(error);
          
          
        });
      }
    // }
  }

  // Fetch trains running on the selected date
//   useEffect(() => {
//     // Replace with your API call
//     fetch(`your-api-endpoint/trains?date=${date}`)
//       .then(response => response.json())
//       .then(data => setTrains(data))
//       .catch(error => console.error('Error fetching trains:', error));
//   }, [date]);

// useEffect(()=>{
//     const fun = async() =>{
//       const resp = await axios.get(`${apiUrl}/admin/getAllTrainInfo` , {withCredentials:true})
//       .then((r)=>{
//         console.log(r.data)
//         setTrains(r.data)
//       })
//     }
//     fun()
// },[])


function addTimeDuration(time, duration) {
  // Parse the time string "HH:MM"
  const [hours, minutes] = time.split(':').map(Number);

  // Parse the duration string "HH:MM"
  const [durationHours, durationMinutes] = duration.split(':').map(Number);

  // Create a Date object with the given time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Add the duration
  date.setHours(date.getHours() + durationHours);
  date.setMinutes(date.getMinutes() + durationMinutes);

  // Format the final time to "HH:MM"
  const finalHours = String(date.getHours()).padStart(2, '0');
  const finalMinutes = String(date.getMinutes()).padStart(2, '0');

  return `${finalHours}:${finalMinutes}`;
}
const[c,setC] = useState(false)
useEffect(()=>{
setC(!c)
console.log(trains)
},[trains,setTrains])

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
    <Sidebar adminlogged={adminlogged}  setAdminlogged={setAdminlogged}/>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Train Schedules</h1>
          <div className="flex items-center space-x-4">
            {/* <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded py-2 px-3"
            /> */}
              <div>
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={from}
      onChange={handleChange}
      options={allTrains}
      sx={{margin:0, marginBottom : 1, width: 330 , border : 1 , borderColor : '#94b3d4' }}
      color='primary'
      variant="outlined"
      // onChange={setFrom()}
      renderInput={(params) => <TextField {...params} label="From"/>}
    />
            </div>
            <div>
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={to}
      onChange={tohandleChange}
      options={allTrains}
      sx={{margin:0, marginBottom : 1, width: 330 , border : 1 , borderColor : '#94b3d4' }}
      color='primary'
      variant="outlined"
      // onChange={setFrom()}
      renderInput={(params) => <TextField {...params} label="To"/>}
    />
            </div>

            <div className="relative">
              <button  onClick={handleSubmit} className="p-2 bg-gray-200 rounded-full focus:outline-none">
                <span className="material-icons">Submit</span>
              </button>
              <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded p-4 hidden">
                {/* Profile dropdown content */}
              </div>
            </div>

            <div className="relative">
              <button onClick={()=>{navigate('/admin/login')}} className="p-2 bg-gray-200 rounded-full focus:outline-none disabled">
                <span className="material-icons">Login</span>
              </button>
              <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded p-4 hidden">
                {/* Profile dropdown content */}
              </div>
            </div>
          </div>
        </header>

        {/* Train Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {trains.map(train => (
                <tr onClick={()=>{navigate('/admin/trainSummary' , {state  : {...train , "arrival":addTimeDuration(train.startTime , train.duration) } })}}  className='border-2  m-3 p-2 cursor-pointer ' 
                // onMouseEnter={() => setHoveredTrain(train.trainNumber)}
            // onMouseLeave={(/) => setHoveredTrain(null)}
            style={{
              transform: hoveredTrain === train.trainNumber ? 'scale(1.02)' : 'scale(1)',
              backgroundColor: hoveredTrain === train.trainNumber ? '#f0f4f8' : 'transparent',
              fontWeight :  hoveredTrain === train.trainNumber ? 'bold' : '',
              fontSize :  hoveredTrain === train.trainNumber ? '18px' : '',
            }}
                >
                  <td className="px-6 py-4 whitespace-nowrap ">{train.trainNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.trainName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{addTimeDuration(train.startTime , train.duration)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.fromStation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{train.toStation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${train.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {train.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
};
// client\src\adminComponents\AdminAllTrains.jsx
export default AdminAllTrains;
