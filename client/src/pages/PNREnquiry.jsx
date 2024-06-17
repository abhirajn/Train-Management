import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function PNREnquiry({logged ,setLogged}) {
    const [pnr, setPnr] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const [passengerNames, setPassengerNames] = useState([]);
    const [passengerAges, setPassengerAges] = useState([]);
const [passengerGender , setPassengerGender] = useState([]);
  
    const handlePnrChange = (e) => {
      setPnr(e.target.value);
    };
  
    const handlePnrSubmit = async(e) => {
      e.preventDefault();
      // Fetch ticket info using the PNR number
      // This is just a placeholder for the actual fetch logic
      try {
        const response = await axios.post(`${apiUrl}/api/getInfoFromPNR`,{
            "pnr" : pnr
        },{
            withCredentials: true 
          })
        .then((resp)=>{
            setTicketInfo(resp.data[0])
             setPassengerNames(resp.data[0].passengerNames.split(","));
       setPassengerAges(resp.data[0].passengerAge.split(","));
   setPassengerGender(resp.data[0].passengerGender.split(","))
        })
      } catch (error) {
        toast.error("login first", {
            position: "top-center",
            autoClose: 1000,
            onClose : () => navigate('/login')
          })
          console.error(error);
      }
    };
//   console.log(ticketInfo)
    const handleCancelTicket = async() => {
      try {
        const resp = await axios.post(`${apiUrl}/api/cancelTicket`,{
            "pnr" : pnr
        },{
            withCredentials: true
        }).then(()=>{
toast.success("deleted")
        }).catch(()=>{
toast.error("Couldnt able to cancel")
        })
      } catch (error) {
        toast.error("Couldnt able to cancel", {
            position: "top-center",
          })
      }
      setMessage('Ticket has been cancelled successfully.');
    };
  return (
    <div>
        <Navbar logged={logged} setLogged={setLogged}/>
      <div>
     
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">PNR Enquiry</h1>
      
      <form onSubmit={handlePnrSubmit} className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Enter PNR Number
        </label>
        <input 
          type="text"
          value={pnr}
          onChange={handlePnrChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {ticketInfo && (
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold mb-2">Ticket Information</h2>
          {ticketInfo.ticketStatus == "Active" ? <h1 className='text-xl font-bold m-4'>Ticket Confirm</h1> : <h1 className='text-xl font-bold m-4'>Ticket Canceled</h1>}
          <div className="mb-4">
            <p><strong>Train:</strong> {ticketInfo.trainName}</p>
            <p><strong>From:</strong> {ticketInfo.fromName}</p>
            <p><strong>To:</strong> {ticketInfo.toName}</p>
            <p><strong>Date:</strong> {ticketInfo.fromDate}</p>
            <p><strong>Time:</strong> {ticketInfo.fromTime}</p>
            <p><strong>Status:</strong> {ticketInfo.ticketStatus}</p>
          </div>
           <h3 className="text-lg font-medium">Passenger Information</h3>
          {passengerNames.map((d,i)=>
         
          <div className="mb-2">
            <p><strong>{i+1}.</strong> {d}</p>
            {/* <p><strong>Age:</strong> {passengerAges[i]}</p>
            <p><strong>Gender:</strong> {passengerGender[i]}</p>
            <p><strong>Booking Status:</strong> {ticketInfo.ticketStatus}</p>
            <p><strong>Berth Type:</strong> NO preference</p> */}
          </div>
          )}
          {/* <button
            onClick={handleCancelTicket}
            className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Cancel Ticket
          </button> */}
        </div>
      )}

      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
    </div>
      </div><ToastContainer/>
    </div>
  )
}
