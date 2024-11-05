import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const baseurl = process.env.REACT_APP_API_URL;

const History = () => {
  const [parkingHistory, setParkingHistory] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchParkingHistory = async () => {
      try {
        const response = await axios.get(
          `${baseurl}/api/parking-history/${user._id}`
        );
        setParkingHistory(response.data);
      } catch (error) {
        console.error('Error fetching parking history:', error);
      }
    };

    if (user) {
      fetchParkingHistory();
    }
  }, [user, parkingHistory]);

  const calculateDuration = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = checkOut ? new Date(checkOut) : new Date();
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const calculateCost = (checkIn, checkOut, rate) => {
    const start = new Date(checkIn);
    const end = checkOut ? new Date(checkOut) : new Date();
    const durationHours = (end - start) / (1000 * 60 * 60);
    return (durationHours * rate).toFixed(2);
  };
  console.log(parkingHistory.length);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Parking History</h1>
      {parkingHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Carpark</th>
                <th className="px-4 py-2">Check-in Time</th>
                <th className="px-4 py-2">Check-out Time</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Cost</th>
              </tr>
            </thead>
            <tbody>
              {parkingHistory.map((entry) => {
                const handleCheckOut = async () => {
                  try {
                    const response = await axios.post(
                      `${baseurl}/api/checkout`,
                      {
                        userId: user._id,
                        carparkId: entry.carparkId,
                        checkOutTime: new Date(),
                      }
                    );

                    alert(
                      `Parking fee: $${response.data.parkingFee.toFixed(2)}`
                    );
                  } catch (error) {
                    console.error('Error checking out:', error);
                  }
                };
                return (
                  <tr key={entry._id}>
                    <td className="border px-4 py-2">
                      <Link to={`/carpark/${entry.carparkId}`}>
                        {entry.carparkId}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(entry.checkInTime).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.checkOutTime ? (
                        new Date(entry.checkOutTime).toLocaleString()
                      ) : (
                        <button
                          onClick={handleCheckOut}
                          className="bg-[#b48170] text-white px-4 py-2 rounded mt-4"
                        >
                          Check Out Now
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {calculateDuration(entry.checkInTime, entry.checkOutTime)}
                    </td>
                    <td className="border px-4 py-2">
                      ${calculateCost(entry.checkInTime, entry.checkOutTime, 2)}{' '}
                      {/* Assuming $2 per hour */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>You have no carpark history</p>
      )}
    </div>
  );
};

export default History;
