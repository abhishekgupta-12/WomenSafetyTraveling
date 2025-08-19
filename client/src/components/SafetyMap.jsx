import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Map container styles
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Default center location (you can change this)
const defaultCenter = {
  lat: 28.6139, // Delhi, India
  lng: 77.2090,
};

const SafetyMap = () => {
  const [location, setLocation] = useState(null);
  const [safetyPercentage, setSafetyPercentage] = useState(null);

  // Handle map click event
  const onMapClick = useCallback((event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLocation(clickedLocation);

    // Simulate getting safety data
    const dummySafetyPercentage = Math.floor(Math.random() * 100) + 1;
    setSafetyPercentage(dummySafetyPercentage);
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Select a Location to Check Safety Percentage
      </h2>

      {/* Load Google Maps script */}
      <LoadScript
        // ✅ IMPORTANT: use an environment variable instead of hardcoding the key
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={12}
          onClick={onMapClick}
        >
          {location && <Marker position={location} />}
        </GoogleMap>
      </LoadScript>

      {/* Display safety info */}
      {location && (
        <div className="mt-8 bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Location Selected:
          </h3>
          <p className="text-lg text-gray-600">
            <span className="font-medium">Latitude:</span> {location.lat}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium">Longitude:</span> {location.lng}
          </p>
          <h4 className="text-xl font-bold text-gray-800 mt-4">
            Safety Percentage: {safetyPercentage}%
          </h4>
        </div>
      )}
    </div>
  );
};

export default SafetyMap;
