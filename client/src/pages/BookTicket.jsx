import React from 'react'
import BookCard from '../components/BookCard'
import Navbar from '../components/Navbar'

export default function BookTicket({logged ,setLogged}) {
  return (
    <div>
      <Navbar logged={logged} setLogged={setLogged}/>
<BookCard/>

    </div>
  )
}
