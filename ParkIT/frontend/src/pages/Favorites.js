import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import CarParkDetails from '../components/CarParkDetails';
import { fetchCarparks, fetchCarparkInfo } from '../services/api';

const baseurl = process.env.REACT_APP_API_URL;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const favoriteIds = await axios.get(
        `${baseurl}/api/favorites/${user._id}`
      );
      const [allCarparks, allCarparkInfo] = await Promise.all([
        fetchCarparks(),
        fetchCarparkInfo(),
      ]);

      const favoriteCarparks = allCarparks
        .filter((carpark) => favoriteIds.data.includes(carpark.carpark_number))
        .map((carpark) => {
          const info = allCarparkInfo.find(
            (info) => info.car_park_no === carpark.carpark_number
          );
          return { ...carpark, ...info };
        });

      setFavorites(favoriteCarparks);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (carparkId) => {
    try {
      setFavorites(favorites.filter((fav) => fav.car_park_no !== carparkId));
      await axios.post(`${baseurl}/api/favorites/remove`, {
        userId: user._id,
        carparkId,
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      // If the removal fails, fetch favorites again to ensure consistency
      fetchFavorites();
    }
  };

  if (isLoading) {
    return <div>Loading favorites...</div>;
  }
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Carparks</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite carparks.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((carpark) => (
            <CarParkDetails
              key={carpark.car_park_no}
              carpark={carpark}
              onRemoveFavorite={() => handleRemoveFavorite(carpark.car_park_no)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
