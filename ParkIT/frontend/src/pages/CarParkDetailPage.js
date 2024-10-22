import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarparks, fetchCarparkInfo } from '../services/api';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const CarParkDetailPage = () => {
  const [carpark, setCarpark] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const { carparkId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCarparkDetails = async () => {
      try {
        setIsLoading(true);
        const [allCarparks, allCarparkInfo] = await Promise.all([
          fetchCarparks(),
          fetchCarparkInfo(),
        ]);
        const carparkData = allCarparks.find(
          (c) => c.carpark_number === carparkId
        );
        const carparkInfo = allCarparkInfo.find(
          (i) => i.car_park_no === carparkId
        );

        if (carparkData && carparkInfo) {
          setCarpark({ ...carparkData, ...carparkInfo });
        } else {
          console.error('Carpark not found');
        }
      } catch (error) {
        console.error('Error fetching carpark details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarparkDetails();
  }, [user, carparkId]);

  useEffect(() => {
    const fetchCheckInStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/checkin/${user._id}/${carparkId}`
        );
        if (response.data.isCheckedIn) {
          setIsCheckedIn(true);
          setCheckInTime(new Date(response.data.checkInTime));
        }
      } catch (error) {
        console.error('Error fetching check-in status:', error);
      }
    };

    if (user) {
      fetchCheckInStatus();
    }
  }, [isCheckedIn]);

  const handleCheckIn = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/checkin', {
        userId: user._id,
        carparkId: carpark.carpark_number,
        checkInTime: new Date(),
      });
      setIsCheckedIn(true);
      setCheckInTime(new Date(response.data.checkInTime));
    } catch (error) {
      if (error.response.status === 400) {
        alert('You already have an active check-in.');
      }
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/checkout', {
        userId: user._id,
        carparkId: carpark.carpark_number,
        checkOutTime: new Date(),
      });
      setIsCheckedIn(false);
      setCheckInTime(null);
      alert(`Parking fee: $${response.data.parkingFee.toFixed(2)}`);
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  const handleDirections = () => {
    if (carpark) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${carpark.latitude},${carpark.longitude}`
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!carpark) return <div>Carpark not found</div>;

  return (
    <div className="container mx-auto px-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{carpark.address}</h1>
      <p>Available Lots: {carpark.carpark_info[0].lots_available}</p>
      <p>Total Lots: {carpark.carpark_info[0].total_lots}</p>
      <p>Rate: ${carpark.rate}/hour</p>
      <p>Free Parking: {carpark.free_parking}</p>
      <p>Night Parking: {carpark.night_parking}</p>

      {isCheckedIn ? (
        <div>
          <p>Checked in at: {checkInTime.toLocaleString()}</p>
          <button
            onClick={handleCheckOut}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Check Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleCheckIn}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Check In
        </button>
      )}
      <button
        onClick={handleDirections}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
      >
        Get Directions
      </button>
    </div>
  );
};

export default CarParkDetailPage;
