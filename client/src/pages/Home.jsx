import React from 'react'
import Navbar from '../components/Navbar'
import Booking from '../components/Booking'
import '../assets/style.css'


export default function Home({ logged, setLogged}) {
  return (
    <div className='home w-full h-screen'>
        <Navbar  logged={logged} setLogged={setLogged}/>
        <Booking/>
    </div>
  )
}
