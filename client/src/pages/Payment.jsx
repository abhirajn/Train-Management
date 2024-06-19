import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import { use } from '../../../server/routes/adminRoutes';
const apiUrl = import.meta.env.VITE_BACKEND_URL;


const Payment = ({logged ,setLogged}) => {
  const location = useLocation();
  const { state } = location;
  console.log({state})
  const [user , setUser] = useState('');
  const [phone , setPhone] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('IRCTC iPay');
  const passengerNames = state.passengerNames.split(",")
  const passengerAges = state.passengerAge.split(",")
  const passengerGender = state.passengerGender.split(",")
  const paymentMethods = [
    'IRCTC iPay (Credit Card/Debit Card/UPI)',
    'Multiple Payment Service',
    'Netbanking',
    'Payment Gateway / Credit Card / Debit Card',
    'Bharat QR / Scan & Pay',
    'Wallets / Cash Card',
    'EMI',
    'Loyalty Redemption Booking'
  ];
  const navigate = useNavigate()

  const startdate = new Date(state.trainDate);
  const startdateSting  =startdate.toString();
  var totalfare = Number(state.fare)*passengerNames.length + Number(0.45);
if(state.selection == "1"){
  totalfare += 15;
}else{
  totalfare += 10;
}
  const journeyDetails = {
    trainName: 'SBC TLGP EXP',
    trainNumber: '20651',
    date: 'Thu, 20 Jun',
    from: 'KSR BENGALURU',
    to: 'SHIVAMOGGA H',
    departureTime: '15:00',
    arrivalTime: '19:14',
    passengerDetails: [
      {
        name: 'Abhiraj N',
        age: 21,
        gender: 'Male'
      }
    ],
    contactDetails: {
      email: 'ca******@gmail.com',
      phone: '91-7******39'
    },
    fareSummary: {
      ticketFare: '₹130.00',
      convenienceFee: '₹17.70',
      insurance: '₹0.45',
      totalFare: '₹148.15'
    }
  };

useEffect(()=>{
  const fun = async() =>{
    const resp = await axios.get(`${apiUrl}/user/getEmailandPhone`,{withCredentials : true}).then((r)=>{
      // console.log(r.data)
        setUser(r.data.id)
        setPhone(r.data.phone)
    })
    // console.log(resp)
  }
  fun();
})

const handleBook = () => {

  const fun = async() => {
    const resp =  await axios.post(`${apiUrl}/api/bookticket`, {
      "userId" : user,
       "trainNo" : state.trainNo,
      "trainName" : state.trainName, 
      "fromName" : state.fromName,
       "toName"  : state.toName,
        "fromStationNumber" : Number(state.fromStationNumber),
         "toStationNumber" : Number(state.toStationNumber),
           "passengerNames" : state.passengerNames,
            "passengerAge" : state.passengerAge,
             "passengerGender" : state.passengerGender,
              "totalTickets" : passengerNames.length,
               "fromDate" : startdateSting.substring(0,15),
               "toDate" : state.finalDate.substring(0,15),
                "fromTime" : state.starttime,
                 "toTime" : state.finalTime,
              "fare" : totalfare, 
           "ticketStatus" : "Active"
    },{withCredentials: true })
  }

  fun().then(()=>{
    toast.success("Tickets successfully booked", {
      position: "top-center",
      autoClose: 1000,
      onClose : () => navigate('/')
    })
    // navigate('/')
    
  });
}

  return (
    <div><Navbar logged={logged} setLogged={setLogged}/>
    <div className=" p-4 md:p-8">
      <div className="flex gap-4">
        
        {/* Payment Methods */}
        <div className=" w-4/12 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
          <div className="flex flex-col space-y-2">
            {paymentMethods.map(method => (
              <button
                key={method}
                onClick={() => setSelectedPaymentMethod(method)}
                className={`flex items-center p-4 border-2 rounded-lg ${selectedPaymentMethod === method ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <span className="flex-1 text-left">{method}</span>
                {selectedPaymentMethod === method && (
                  <span className="text-orange-500 text-lg">&#10003;</span>
                )}
              </button>
            ))}
          </div>
        
        </div>
        <div className="w-8/12 mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-medium">{selectedPaymentMethod}</h3>
            <p className="text-gray-600">
              Credit cards/Debit cards/Netbanking/UPI (Powered by IRCTC) NIL for UPI Transaction, NIL for all Rupay Debit Cards, 0.4 % + Applicable Taxes for Other Domestic Debit Cards up to ₹2000, 0.9 % + Applicable Taxes for Other Domestic Debit Cards more than ₹2000, 1.8 % + Applicable Taxes for all domestic Credit Cards, ₹10 + Applicable Taxes for Netbanking transactions, 1.8 % + Applicable Taxes for all Autopay Transactions,
            </p>
          </div>

        {/* Journey Summary */}
        <div className="w-5/12  bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Journey Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="text-lg font-medium">{state.trainName} ({state.trainNo})</div>
            <div>{startdateSting.substring(0,4)}, {startdateSting.substring(4,7)} {startdateSting.substring(8,10)}</div>
            <div>{state.fromName} <span className="font-bold">→</span> {state.toName}</div>
            <div>{state.starttime} - {state.finalTime}</div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Passenger Details</h3>
          <ul className="space-y-2 mb-4">
            {passengerNames.map((passenger, index) => (
              <li key={index} className="border-b pb-2">
                {index + 1}. {passenger}, {passengerAges[index]} yrs, {passengerGender[index]}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
          <div className="text-gray-700 mb-4">
            <p>Email: {user}</p>
            <p>Mobile: {phone}</p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Fare Summary</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Ticket Fare</span>
              <span>{ Number(state.fare)*passengerNames.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Convenience Fee (Incl. of GST)</span>
              <span>{state.selection == "1" ? 15 : 10}</span>
            </div>
            <div className="flex justify-between">
              <span>Travel Insurance (Incl. of GST)</span>
              <span>{0.45}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Fare</span>
              <span>{totalfare}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300">Back</button>
        <button onClick={handleBook} className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Pay & Book</button>
      </div>
    </div>
    <ToastContainer/>
    </div>
  );
};

export default Payment;
