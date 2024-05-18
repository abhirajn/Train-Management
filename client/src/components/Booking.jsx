import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function Booking() {

  const navigate = useNavigate();
  // console.log(`${apiUrl}/api/getallTrains`)
  const todayDate = new Date();
  const year = todayDate.getFullYear();
const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(todayDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

  const[allTrains , setAllTrains] = React.useState([]);
  const[from , setFrom] = React.useState("");
  const[to , setTo] = React.useState("");
  const[date , setDate] = React.useState(formattedDate);
  // console.log(date)

  React.useEffect(()=>{ 
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

const handledatChange = (event , newValue) => {
  console.log(event , newValue)
}
const today = dayjs();
const handleClick = () => {

navigate(`/trains?from=${from}&to=${to}&date=${date}`);
}

  return (
    <div>
        <div className='lg:ml-40 lg:mt-20  h-auto w-6/12 bg-white' style={{}}>
           <div className='h-20 p-4 font-bold text-4xl w-6/12 '> <h1 style={{color:""}} >BOOK TICKET</h1></div>
           <div style={{display:'flex'}}>
           <div>
           <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={from}
      onChange={handleChange}
      options={allTrains}
      sx={{margin:3, marginBottom : 3, width: 330 , border : 1 , borderColor : '#94b3d4' }}
      color='primary'
      variant="outlined"
      // onChange={setFrom()}
      renderInput={(params) => <TextField {...params} label="From"/>}
    />



<Autocomplete
      disablePortal
      id="combo-box-demo"
      value={to}
      onChange={tohandleChange}
      options={allTrains}
      sx={{margin:3, marginBottom : 3, width: 330 , border : 1 , borderColor : '#94b3d4' }}
      color='primary'
      variant="outlined"
      renderInput={(params) => <TextField {...params} label="To"/>}
    />
           </div>
           <div>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="MM/DD/YYYY" 
          // value={date}
          defaultValue={today}
          onChange={(newDate) => {
            const tempDate  = `${newDate.year()}-${newDate.month()+1}-${newDate.date()}`
            console.log(tempDate)
          setDate(tempDate);
          // console.log(date)
        }}
          sx={{margin:3, marginBottom : 3, width: 300 , border : 1 , borderColor : '#94b3d4' }}
          
          disablePast
        />
    </LocalizationProvider>
           </div>

           
           </div>
           <FormGroup sx={{m:3 , color:"#94b3d4"}}>
      <FormControlLabel  control={<Checkbox />} label="Date flexible" />
      <FormControlLabel  control={<Checkbox  />} label="another checkbox" />
      <FormControlLabel  control={<Checkbox />} label="another checkbox" />
    </FormGroup>

    <div className='mx-8 mb-2'>
    <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 w-32 "
    onClick={handleClick}
    >Search</button>
    {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button> */}
    
    </div>
        </div>
    </div>
  )
}
