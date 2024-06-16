import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TrainSummary = ({ trains }) => {
//   const { trainNumber } = useParams();
//   const train = trains.find(t => t.trainNumber === trainNumber);

//   if (!train) {
//     return <p>Train not found.</p>;
//   }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4">Train Summary</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{trains.trainName}</h3>
          <p className="text-gray-600">Train Number: {trains.trainNumber}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>From Station:</strong> {trains.fromStation}</p>
            <p><strong>To Station:</strong> {trains.toStation}</p>
          </div>
          <div>
            <p><strong>Start Time:</strong> {trains.startTime}</p>
            <p><strong>Arrival Time:</strong> {trains.arrival}</p>
          </div>
          <div>
            <p><strong>Status:</strong> <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trains.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{trains.status}</span></p>
          </div>
        </div>
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Passenger Details</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Status</th>
            </tr>
          </thead>
          {/* <tbody className="bg-white divide-y divide-gray-200">
            {trains.passengers.map(passenger => (
              <tr key={passenger.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{passenger.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{passenger.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{passenger.seatNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${passenger.ticketStatus === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {passenger.ticketStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default TrainSummary;
