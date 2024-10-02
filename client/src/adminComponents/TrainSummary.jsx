import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { ToastContainer, toast } from 'react-toastify';



const TrainSummary = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state)
  const[from , setFrom] = useState(state.fromStation);
  const[to , setTo] = useState(state.toStation);
  const[allTrains , setAllTrains] = useState([]);

  const[passengers , setPassengers] = useState([]);

   const[men , setMen] = useState(0);
   const[women , setWomen] = useState(0);
   const[others , setOthers] = useState(0);
   const[lessthan5 , setLessthan5] = useState(0);
   const[fiveto60 , setFiveto60] = useState(0);
   const[more60 , setMore60] = useState(0);
   const[canceled , setCanceled] = useState(0);

  const today = new Date().toISOString().split('T')[0];

//   const todayDate = new Date();
//   const year = todayDate.getFullYear();
// const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
// const day = String(todayDate.getDate()).padStart(2, '0');
// const formattedDate = `${year}-${month}-${day}`;
  // const passengerNames = state.passengerNames.split(",")
  //   // console.log(passengerNames)
  // const passengerAges = .passengerAge.split(",")
  // const passengerGender = prop.passengerGender.split(",")
//   const { trainNumber } = useParams();
//   const train = trains.find(t => t.trainNumber === trainNumber);

//   if (!train) {
//     return <p>Train not found.</p>;
//   }
// const trains = {}
const handleChange = (event, newValue) => {
  console.log(newValue)
  setFrom(newValue.label);
  // console.log('Selected value:', from);
};

const tohandleChange = (event, newValue) => {
  // console.log(newValue)
  setTo(newValue.label);
  // console.log('Selected value:', from;
};

useEffect(()=>{ 
  const fun = async()=>{
    const res = await axios.post(`${apiUrl}/admin/getallTrainsfromNumber`,{
      "trainNumber" : state.trainNumber
    },{
      withCredentials : true
    }).then(response => {
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
const [selectedDate, setSelectedDate] = useState(null);
const [ticketinfo , setTicketinfo] = useState();

const handleDateChange = (e) => {
  const date = new Date(e.target.value);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  // console.log(options)
  const formattedDate = date.toLocaleDateString('en-US', options);
  const temparr = formattedDate.split(",")
  var tempdate = "";
  temparr.map((d)=>{
tempdate += d + "";
  })
  setSelectedDate(tempdate);
  console.log(tempdate)
};

useEffect(()=>{
  const date = new Date();
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  // console.log(options)
  const formattedDate = date.toLocaleDateString('en-US', options);
  const temparr = formattedDate.split(",")
  var tempdate = "";
  temparr.map((d)=>{
tempdate += d + "";
  })

  const fun = async() => {
    if(selectedDate == null){
      try {
        const r = await axios.post(`${apiUrl}/admin/getAllTicketsforSummary`, {
          "trainNo" : state.trainNumber,
           "fromname" : state.fromStation,
            "toname" : state.toStation,
             "date" : tempdate
        },{
          withCredentials : true
        }).then((resp)=>{
          setTicketinfo(resp.data)
          var tempass = [];
          var tmen = 0;
          var twomen = 0;
          var tother = 0;
          var tless5 = 0;
          var tfto60 = 0;
          var tmore60 = 0;
          var tcan = 0;
          resp.data.map((d)=>{
              
              const passengerNames = d.passengerNames.split(",")
              const passengerAges = d.passengerAge.split(",")
              const passengerGender = d.passengerGender.split(",")
              if(d.ticketStatus == 'Canceled'){
                tcan += passengerAges.length
              }
              
              passengerGender.map((data , i)=>{
                var sumne = {
                  "username" : d.userId,
                  "pnr" : d.pnrNumber,
                  "name" : passengerNames[i],
                  "age" : passengerAges[i],
                  "gender" : passengerGender[i],
                  "status" : d.ticketStatus
                };
                tempass.push(sumne);
                console.log("hiii" ,tempass);
                if(data == 'male'){
                  tmen++;
                }else if(data == 'female'){
                  twomen++;
                }else{
                  tother++;
                }
              })
              passengerAges.map((data)=>{
                if(data <= 5){
                  tless5++;
                }else if(data > 5 && data < 60){
                  tfto60++;
                }else{
                  tmore60++;
                }
              })
             
          })
          setMen(tmen); setWomen(twomen); setOthers(tother); setLessthan5(tless5); setFiveto60(tfto60); setMore60(tmore60);
setCanceled(tcan)
          setPassengers(tempass);
    
          console.log(tempass)
        })
      } catch (error) {
        toast.error("error");
      }
    }else{
        try {
          const r = await axios.post(`${apiUrl}/admin/getAllTicketsforSummary`, {
            "trainNo" : state.trainNumber,
            "fromname" : state.fromStation,
             "toname" : state.toStation,
              "date" : selectedDate
          },{
            withCredentials : true
          }).then((resp)=>{
            setTicketinfo(resp.data)
            // console.log(resp.data)
            var tempass = [];
            var tmen = 0;
            var twomen = 0;
            var tother = 0;
            var tless5 = 0;
            var tfto60 = 0;
            var tmore60 = 0;
            var tcan = 0;
            resp.data.map((d)=>{
              const passengerNames = d.passengerNames.split(",")
              const passengerAges = d.passengerAge.split(",")
              const passengerGender = d.passengerGender.split(",")
              if(d.ticketStatus == 'Canceled'){
                tcan += passengerAges.length
              }
              passengerGender.map((data , i)=>{
                var sumne = {
                  "username" : d.userId,
                  "pnr" : d.pnrNumber,
                  "name" : passengerNames[i],
                  "age" : passengerAges[i],
                  "gender" : passengerGender[i],
                  "status" : d.ticketStatus
                };
                tempass.push(sumne);
                if(data == 'male'){
                  tmen++;
                }else if(data == 'female'){
                  twomen++;
                }else{
                  tother++;
                }
              })
              passengerAges.map((data)=>{
                if(data <= 5){
                  tless5++;
                }else if(data > 5 && data < 60){
                  tfto60++;
                }else{
                 tmore60++;
                }
              })
              // console.log(tmen)
          })
          setMen(tmen); setWomen(twomen); setOthers(tother); setLessthan5(tless5); setFiveto60(tfto60); setMore60(tmore60);
setCanceled(tcan)
          setPassengers(tempass);
          })
        } catch (error) {
          toast.error("error");
        }
    }
  }

  fun();


},[state])


const handleFilter = async() => {
  try {
    const r = await axios.post(`${apiUrl}/admin/getTrainInfoonfilter`, {
      "trainNo" : state.trainNumber,
       "fromname" : from,
        "toname" : to,
    },{
      withCredentials : true
    }).then((resp)=>{
      // console.log(resp.data[0])
      state.fromStation = from;
      state.toStation = to;
      if(resp.data[0]){ state.startTime = resp.data[0].startTime}
      else toast.error("No trains")
     
      
    })
  } catch (error) {
    console.log(error.message)
    toast.error("No trains")
  }

  try {
      const r = await axios.post(`${apiUrl}/admin/getAllTicketsforSummary`, {
      "trainNo" : state.trainNumber,
       "fromname" : from,
        "toname" : to,
         "date" : selectedDate
    },{
      withCredentials : true
    }).then((resp)=>{
      setTicketinfo(resp.data)
      // console.log(resp.data)
      var tempass = [];
      var tmen = 0;
      var twomen = 0;
      var tother = 0;
      var tless5 = 0;
      var tfto60 = 0;
      var tmore60 = 0;
      var tcan = 0;
      resp.data.map((d)=>{
        console.log(d)
        const passengerNames = d.passengerNames.split(",")
        const passengerAges = d.passengerAge.split(",")
        const passengerGender = d.passengerGender.split(",")
        if(d.ticketStatus == 'Canceled'){
          tcan += passengerAges.length
        }
        passengerGender.map((data , i)=>{
          var sumne = {
            "username" : d.userId,
            "pnr" : d.pnrNumber,
            "name" : passengerNames[i],
            "age" : passengerAges[i],
            "gender" : passengerGender[i],
            "status" : d.ticketStatus
          };
          tempass.push(sumne);
          if(data == 'male'){
            tmen++;
          }else if(data == 'female'){
            twomen++;
          }else{
            tother++;
          }
        })
        passengerAges.map((data)=>{
          if(data <= 5){
            tless5++;
          }else if(data > 5 && data < 60){
            tfto60++;
          }else{
            tmore60++;
          }
        })
        
    })
    setMen(tmen); setWomen(twomen); setOthers(tother); setLessthan5(tless5); setFiveto60(tfto60); setMore60(tmore60);
setCanceled(tcan)
console.log(tcan)
    setPassengers(tempass);
      console.log(tempass)
    })
  } catch (error) {
    toast.error("error");
  }
}

  return (
    <div className="container mx-auto p-6">
         
      <h2 className="text-3xl font-semibold mb-4">Train Summary</h2>
      <div className='flex'>
          <div>
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={from}
      onChange={handleChange}
      options={allTrains}
      sx={{marginRight:3, marginBottom : 1, width: 330 , border : 1 , borderColor : '#94b3d4' }}
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
            <div>
            <div className=" flex ml-2 px-4 mx-auto  bg-white shadow-md rounded-lg">
      <label htmlFor="datePicker" className="block text-sm font-medium text-gray-700">
        Select Date : 
      </label>
      <input
        type="date"
        id="datePicker"
        defaultValue={today}
        onChange={handleDateChange}
        className="mt-1 mb-2 p-2 border border-gray-300 rounded-md w-full"
      />
     
    </div>
            </div>
            <div>
            <button onClick={handleFilter} className="mx-4 bg-blue-400 text-white font-bold py-3 px-4 text-xl  rounded shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300">
              Submit
            </button>

            </div>
          </div>

         
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-xl  mb-2">Train Name: <span className='font-semibold'>{state.trainName}</span></h3>
          <p className="text-gray-600">Train Number: {state.trainNumber}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>From Station:</strong> {state.fromStation}</p>
            <p><strong>To Station:</strong> {state.toStation}</p>
          </div>
          <div>
            <p><strong>Start Time:</strong> {state.startTime}</p>
            <p><strong>Arrival Time:</strong> {state.arrival}</p>
          </div>
          <div>
            <p><strong>Status:</strong> <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium ${state.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{state.status}</span></p>
          </div>
        </div>
        <Link to="/admin/home" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>

      <div className='m-16 flex justify-between'>
            <div>
            <p className='text-lg' >Gender Chart</p>
            <PieChart
      series={[
        {
          data: [
            { id: 0, value: men, label: 'Male' },
            { id: 1, value: women, label: 'Female' },
            { id: 2, value: others, label: 'Other' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
            </div>
            <div>
            <p className='text-lg' >Age Chart</p>
            <PieChart
      series={[
        {
          data: [
            { id: 0, value: lessthan5, label: 'less than 5' },
            { id: 1, value: fiveto60, label: '5 to 60' },
            { id: 2, value: more60, label: 'more than 60' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
            </div>

            <div>
              <p className='text-lg' >Status Chart</p>
            <PieChart
      series={[
        {
          data: [
            { id: 0, value: passengers.length - canceled, label: 'Active' },
            { id: 1, value: canceled, label: 'Cancelled' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
            </div>
            

          </div>

      <h2 className="text-2xl font-semibold mb-4">Passenger Details</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL NO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PNR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {passengers.map((passenger, i) => (
              <tr key={passenger.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{i+1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{passenger.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{passenger.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{passenger.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{passenger.pnr}</td>
                <td className="px-6 py-4 whitespace-nowrap">{passenger.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${passenger.status == 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {passenger.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default TrainSummary;
