"use client";
import { useState, useEffect } from "react";

interface Coordinates {
  lat: number;
  lon: number;
  parentId?: string;
}

interface Geolocation {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<Geolocation>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  // Get user's current location
  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    // Attempt to get the current position from the browser
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  // Get location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation, // Expose method to manually refresh location
  };
}
