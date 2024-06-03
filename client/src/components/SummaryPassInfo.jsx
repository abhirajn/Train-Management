import React from 'react'

export default function SummaryPassInfo({index,name,age ,gender}) {
  return (
    <div className='my-3'><div className="flex bg-gray-100 p-2 rounded">
    <p className='font-bold pr-4'> {index+1}. {name}</p>
    <p>{age} yrs | {gender} | India | No Preference</p>
  </div></div>
  )
}
