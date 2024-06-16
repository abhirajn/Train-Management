import React from 'react'
import SummaryCard from '../components/SummaryCard'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SummaryPage({logged ,setLogged}) {
  const location = useLocation();
  const { state } = location;
  return (


    <div>
    <Navbar logged={logged} setLogged={setLogged}/>
      <SummaryCard state={state} />
    
    </div>
  )
}
