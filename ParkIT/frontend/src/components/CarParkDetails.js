import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const CarParkDetails = ({ carpark, distance, onRemoveFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(
            `http://localhost:5001/api/favorites/${user._id}`
          );
          setIsFavorite(response.data.includes(carpark.car_park_no));
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
        setError('Error checking favorite status: ' + error.message);
      }
    };

    checkFavoriteStatus();
  }, [user, carpark.car_park_no]);

  const toggleFavorite = async () => {
    try {
      if (!user || !user._id) {
        setError('Please log in to add favorites');
        return;
      }

      const endpoint = isFavorite
        ? 'http://localhost:5001/api/favorites/remove'
        : 'http://localhost:5001/api/favorites/add';
      const response = await axios.post(endpoint, {
        userId: user._id,
        carparkId: carpark.car_park_no,
      });

      if (response.status === 200) {
        setIsFavorite(!isFavorite);
        setError(null);
      } else {
        setError('Failed to update favorite: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError(
        'Error updating favorite: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">{carpark.address}</h2>
      <p>Available Lots: {carpark.carpark_info[0].lots_available}</p>
      <p>Total Lots: {carpark.carpark_info[0].total_lots}</p>
      <p>Rate: ${carpark.rate}/hour</p>
      {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-2 flex justify-between">
        <button
          onClick={
            isFavorite && onRemoveFavorite ? onRemoveFavorite : toggleFavorite
          }
          className={`${
            isFavorite ? 'bg-red-500' : 'bg-blue-500'
          } text-white px-4 py-2 rounded`}
          disabled={!user}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <Link
          to={`/carpark/${carpark.car_park_no}`}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarParkDetails;
