import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrainsDisplay from './pages/TrainsDisplay'
import Navbar from './components/Navbar'
import BookTicket from './pages/BookTicket'
// import  'dotenv.config()'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
   <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/trains" element={<TrainsDisplay/>}/>
        <Route path="/bookTicket" element={<BookTicket/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
