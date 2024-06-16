import React from 'react'
import Navbar from '../components/Navbar'

export default function CancelTicket({logged ,setLogged}) {
  return (
    <div>
        <Navbar logged={logged} setLogged={setLogged}/>


    </div>
  )
}
