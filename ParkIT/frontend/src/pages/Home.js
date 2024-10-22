import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import { fetchCarparks, fetchCarparkInfo } from '../services/api';
import CarParkDetails from '../components/CarParkDetails';
import FilterSort from '../components/FilterSort';
import Tutorial from '../components/Tutorial';
import { UserContext } from '../context/UserContext';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Replace with your actual API key

const Home = () => {
  const [carparks, setCarparks] = useState([]);
  const [nearbyCarparks, setNearbyCarparks] = useState([]);
  const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 }); // Singapore's coordinates
  const [destination, setDestination] = useState('');
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (user && user.tutorialCompleted === false) {
      setShowTutorial(true);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carparkData, infoData] = await Promise.all([
          fetchCarparks(),
          fetchCarparkInfo(),
        ]);

        const mergedData = carparkData
          .map((carpark) => {
            const info = infoData.find(
              (info) => info.car_park_no === carpark.carpark_number
            );
            if (!info) return null;
            return {
              ...carpark,
              ...info,
            };
          })
          .filter(Boolean);

        setCarparks(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          destination + ', Singapore'
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCenter({ lat, lng });
        setDestinationMarker({ lat, lng });
        findNearbyCarparks(lat, lng);
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error searching for destination:', error);
    }
  };

  const findNearbyCarparks = useCallback(
    (lat, lng) => {
      const nearby = carparks.filter((carpark) => {
        if (carpark.latitude && carpark.longitude) {
          const distance = calculateDistance(
            lat,
            lng,
            carpark.latitude,
            carpark.longitude
          );
          return distance <= 3; // 5km radius
        }
        return false;
      });

      const nearbyWithDistance = nearby.map((carpark) => ({
        ...carpark,
        distance: calculateDistance(
          lat,
          lng,
          carpark.latitude,
          carpark.longitude
        ),
      }));

      setNearbyCarparks(nearbyWithDistance);
    },
    [carparks]
  );

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleFilterSortChange = (option) => {
    let sortedCarparks = [...nearbyCarparks];

    switch (option) {
      case 'nearest':
        sortedCarparks.sort((a, b) => a.distance - b.distance);
        break;
      case 'mostAvailable':
        sortedCarparks.sort(
          (a, b) =>
            (b.carpark_info[0].lots_available || 0) -
            (a.carpark_info[0].lots_available || 0)
        );
        break;
      case 'cheapest':
        sortedCarparks.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
        break;
      default:
        break;
    }

    setNearbyCarparks(sortedCarparks);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    // Update the user object in the context
    setUser((prevUser) => ({ ...prevUser, tutorialCompleted: true }));
  };

  return (
    <div className="container mx-auto px-4">
      {showTutorial && user && (
        <Tutorial userId={user._id} onComplete={handleTutorialComplete} />
      )}
      <h1 className="text-2xl font-bold mb-4">Find a Carpark</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-l"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
        <div className="ml-2">
          <FilterSort onOptionChange={handleFilterSortChange} />
        </div>
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={center}
          zoom={14}
        >
          {destinationMarker && (
            <Marker
              position={destinationMarker}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
          {nearbyCarparks.map((carpark, index) => (
            <Marker
              key={`${carpark.car_park_no}-${index}`}
              position={{ lat: carpark.latitude, lng: carpark.longitude }}
              title={carpark.address}
              onClick={() => setSelectedCarpark(carpark)}
            />
          ))}
          {selectedCarpark && (
            <InfoWindow
              position={{
                lat: selectedCarpark.latitude,
                lng: selectedCarpark.longitude,
              }}
              onCloseClick={() => setSelectedCarpark(null)}
            >
              <div>
                <h2>{selectedCarpark.address}</h2>
                <p>
                  Available Lots:{' '}
                  {selectedCarpark.carpark_info[0].lots_available}
                </p>
                <p>Rate: ${selectedCarpark.rate}/hour</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {nearbyCarparks.map((carpark, index) => (
          <CarParkDetails
            key={`${carpark.car_park_no}-${index}`}
            carpark={carpark}
            distance={carpark.distance}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
