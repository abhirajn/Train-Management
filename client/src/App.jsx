import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TrainsDisplay from './pages/TrainsDisplay'
import Navbar from './components/Navbar'
import BookTicket from './pages/BookTicket'
import SummaryPage from './pages/SummaryPage'
import Login from './components/Login'
import Registeruser from './components/RegisterUser'
import axios from 'axios'
import AddTrains from './adminPages/AddTrains'
import AdminHome from './adminPages/AdminHome'
import EditTrain from './adminPages/EditTrain'
import AdminLogin from './adminComponents/AdminLogin'
import AdminTrainSummary from './adminPages/AdminTrainSummary'
import Payment from './pages/Payment'
// import AdminHome from './adminpages/AdminHome'
const apiUrl = import.meta.env.VITE_BACKEND_URL;
// import  'dotenv.config()'

function App() {
  const[logged, setLogged] = useState(false);
  // console.log("jii" , logged)
  // const location = useLocation();
  // location.pathname !== '/admin/home'
  // console.log(location.pathname, typeof location.pathname)
  return (
    <>   
   <BrowserRouter>
   {/* <InitUser logged={logged} setLogged={setLogged} /> */}
     {/* <Navbar logged={logged} setLogged={setLogged} /> */}
      <Routes>
        <Route path="/" element={<Home  logged={logged} setLogged={setLogged} />}/>
        <Route path="/trains" element={<TrainsDisplay  logged={logged} setLogged={setLogged}/>}/>
        <Route path="/bookTicket" element={<BookTicket  logged={logged} setLogged={setLogged}/>}/>
        <Route path='/ticketSummary' element={<SummaryPage  logged={logged} setLogged={setLogged}/>}/>
        <Route path='/login' element={<Login logged={logged} setLogged={setLogged} />}/>
        <Route path='/register' element={<Registeruser  logged={logged} setLogged={setLogged}/>}/>
        <Route path='/payment' element={<Payment logged={logged} setLogged={setLogged} />} />
        <Route path='/admin/home' element={<AdminHome/>}/>
        <Route path='/admin/addTrain' element={<AddTrains/>} />
        <Route path='/admin/editTrain' element={<EditTrain/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/trainSummary' element={<AdminTrainSummary/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}


function InitUser({logged , setLogged}) {
  const check = async() =>{
    try {
      const resp =  await axios.get(`${apiUrl}/user/checklogged`,{
          withCredentials: true 
        })     
        console.log("resp" , resp)
         if(resp.data.id){
          setLogged(true)
         }else{
          setLogged(false)
         }
        // toast.success("user registered");
        // navigate('/')
  } catch (error) {
    setLogged(false)
      console.log("err",error) 
  }
  }
  useEffect(() => {
    check();
}, []);

return <></>
}

export default App
