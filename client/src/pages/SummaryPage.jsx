import React from 'react'
import SummaryCard from '../components/SummaryCard'
import { useLocation } from 'react-router-dom';

export default function SummaryPage() {
  const location = useLocation();
  const { state } = location;
  return (


    <div>
  
      <SummaryCard state={state} />
    
    </div>
  )
}
