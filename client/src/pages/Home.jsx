import React from 'react'
import Navbar from '../components/Navbar'
import Booking from '../components/Booking'

export default function Home({ logged, setLogged}) {
  return (
    <div>
        <Navbar  logged={logged} setLogged={setLogged}/>
        <Booking/>
    </div>
  )
}
