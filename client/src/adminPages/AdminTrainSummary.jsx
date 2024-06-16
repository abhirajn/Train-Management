import React from 'react'
import TrainSummary from '../adminComponents/TrainSummary'

export default function AdminTrainSummary() {
    const trains = [
        {
          trainNumber: '12345',
          trainName: 'Express Train',
          startTime: '10:00 AM',
          arrival: '04:00 PM',
          fromStation: 'Station A',
          toStation: 'Station B',
          status: 'Running',
          passengers: [
            {
              id: 1,
              name: 'John Doe',
              age: 30,
              seatNumber: 'A1',
              ticketStatus: 'Confirmed'
            },
            {
              id: 2,
              name: 'Jane Smith',
              age: 28,
              seatNumber: 'A2',
              ticketStatus: 'Confirmed'
            },
          ]
        },
      ];
  return (
    <div>
        <TrainSummary trains={trains} />
    </div>
  )
}
