import { useState, useEffect } from 'react';

export function useUserLocation() {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (!GOOGLE_MAPS_API_KEY) {
          setLocation("API key missing");
          return;
        }
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          if (data.results && data.results[0]) {
            const addressComponents = data.results[0].address_components;
            const city =
              addressComponents.find((c: any) => c.types.includes("locality"))
                ?.long_name ||
              addressComponents.find((c: any) =>
                c.types.includes("administrative_area_level_2")
              )?.long_name;
            const state = addressComponents.find((c: any) =>
              c.types.includes("administrative_area_level_1")
            )?.long_name;
            
            if (city && state) {
              setLocation(`${city}, ${state}`);
            } else {
              const formatted = data.results[0].formatted_address;
              setLocation(formatted.split(',').slice(0, 2).join(', '));
            }
          } else {
            setLocation("Location not found");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setLocation("Could not fetch location");
        }
      },
      () => {
        setLocation("Location access denied");
      }
    );
  }, []);

  return location;
}