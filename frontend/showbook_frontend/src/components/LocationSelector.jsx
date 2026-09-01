"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Navigation, X } from "lucide-react";
import { City } from "country-state-city";

const allIndianCities = City.getCitiesOfCountry("IN").map(
  (city) => city.name
);

const POPULAR_CITIES = [
  { id: "mumbai", name: "Mumbai", icon: "🏙️" },
  { id: "delhi-ncr", name: "Delhi-NCR", icon: "🏛️" },
  { id: "bengaluru", name: "Bengaluru", icon: "🌳" },
  { id: "hyderabad", name: "Hyderabad", icon: "🏰" },
  { id: "ahmedabad", name: "Ahmedabad", icon: "🕌" },
  { id: "chandigarh", name: "Chandigarh", icon: "🌆" },
  { id: "chennai", name: "Chennai", icon: "🏖️" },
  { id: "pune", name: "Pune", icon: "⛰️" },
  { id: "kolkata", name: "Kolkata", icon: "🌉" },
  { id: "kochi", name: "Kochi", icon: "🌴" },
];

const ALL_CITIES = allIndianCities;

export default function LocationSelector({ initialLocation }) {
  const [selectedCity, setSelectedCity] = useState(
    initialLocation || "Select Location"
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem("showbook_selected_city");

    if (savedCity) {
      setSelectedCity(savedCity);
    } else if (!initialLocation) {
      setIsOpen(true);
    }
  }, [initialLocation]);

  // --------------------------------
  // Save location to backend
  // --------------------------------
  const saveLocationToDb = async (cityName) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/update-location",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            location: cityName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update location");
      }

      const data = await response.json();

      console.log("Location saved:", data);
    } catch (error) {
      console.error(
        "Failed to sync location to database:",
        error
      );
    }
  };

  // --------------------------------
  // Select a city
  // --------------------------------
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);

    localStorage.setItem(
      "showbook_selected_city",
      cityName
    );

    saveLocationToDb(cityName);

    setIsOpen(false);
  };

  // --------------------------------
  // Detect user's location
  // --------------------------------
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (!res.ok) {
            throw new Error("Failed to get location");
          }

          const data = await res.json();

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.municipality ||
            data.address?.state_district ||
            "Unknown Location";

          handleCitySelect(city);
        } catch (error) {
          console.error(
            "Location detection error:",
            error
          );

          alert("Failed to detect city automatically.");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);

        setIsDetecting(false);

        alert(
          "Permission denied or location unavailable."
        );
      }
    );
  };

  // --------------------------------
  // Search
  // --------------------------------
  const filteredPopular = POPULAR_CITIES.filter((city) =>
    city.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredAll = ALL_CITIES.filter((city) =>
    city
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Location Selector Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-200 hover:text-white transition"
      >
        <span>{selectedCity}</span>

        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Location Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-xl bg-[#1B1E24] text-white shadow-2xl border border-[#292D35] overflow-hidden">

            {/* Search */}
            <div className="p-4 border-b border-[#292D35] flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search for your city..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full text-base outline-none bg-transparent placeholder-gray-500 text-white"
                autoFocus
              />

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#292D35] rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">

              {/* Detect Location */}
              <button
                onClick={handleDetectLocation}
                disabled={isDetecting}
                className="flex items-center gap-2 text-rose-500 font-medium hover:text-rose-400 transition"
              >
                <Navigation
                  className={`w-4 h-4 ${
                    isDetecting ? "animate-spin" : ""
                  }`}
                />

                {isDetecting
                  ? "Detecting location..."
                  : "Detect my location"}
              </button>

              {/* Popular Cities */}
              {!searchTerm && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Popular Cities
                  </h3>

                  <div className="grid grid-cols-5 gap-3">
                    {POPULAR_CITIES.map((city) => (
                      <button
                        key={city.id}
                        onClick={() =>
                          handleCitySelect(city.name)
                        }
                        className={`flex flex-col items-center p-3 rounded-lg border hover:border-rose-500 transition group ${
                          selectedCity === city.name
                            ? "border-rose-500 bg-rose-500/10"
                            : "border-[#292D35] bg-[#111318]"
                        }`}
                      >
                        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                          {city.icon}
                        </span>

                        <span className="text-xs font-medium text-gray-300 group-hover:text-rose-400">
                          {city.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Cities */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {searchTerm
                    ? "Search Results"
                    : "Other Cities"}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    ...filteredPopular.map(
                      (city) => city.name
                    ),
                    ...filteredAll,
                  ].map((cityName, idx) => (
                    <button
                      key={`${cityName}-${idx}`}
                      onClick={() =>
                        handleCitySelect(cityName)
                      }
                      className={`text-left text-sm py-1.5 px-2 rounded hover:text-rose-400 ${
                        selectedCity === cityName
                          ? "font-bold text-rose-500"
                          : "text-gray-400"
                      }`}
                    >
                      {cityName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

