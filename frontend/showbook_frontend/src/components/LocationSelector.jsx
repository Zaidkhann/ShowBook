"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedCity = localStorage.getItem("showbook_selected_city");

    if (savedCity) {
      setSelectedCity(savedCity);
    } else if (!initialLocation) {
      setIsOpen(true);
    }
  }, [initialLocation]);


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



  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);

    localStorage.setItem(
      "showbook_selected_city",
      cityName
    );

    saveLocationToDb(cityName);

    setIsOpen(false);
  };



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



  const locationModal =
    isOpen && mounted
      ? createPortal(
          <div
            className="
              fixed inset-0 z-[99999]
              flex items-center justify-center
              bg-black/70
              backdrop-blur-sm
              p-4
            "
            onClick={() => setIsOpen(false)}
          >
            <div
              className="
                relative
                flex
                w-full
                max-w-3xl
                max-h-[85vh]
                flex-col
                overflow-hidden
                rounded-2xl
                border border-[#292D35]
                bg-[#1B1E24]
                text-white
                shadow-2xl
              "
              onClick={(e) => e.stopPropagation()}
            >

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-3
                  border-b border-[#292D35]
                  bg-[#1B1E24]
                  p-4
                "
              >
                <Search className="h-5 w-5 shrink-0 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search for your city..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="
                    min-w-0
                    w-full
                    bg-transparent
                    text-base
                    text-white
                    outline-none
                    placeholder:text-gray-500
                  "
                  autoFocus
                />

                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    shrink-0
                    rounded-full
                    p-1.5
                    text-gray-400
                    transition
                    hover:bg-[#292D35]
                    hover:text-white
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>


              <div
                className="
                  min-h-0
                  overflow-x-hidden
                  overflow-y-auto
                  p-6
                  space-y-7
                "
              >

                <button
                  onClick={handleDetectLocation}
                  disabled={isDetecting}
                  className="
                    flex
                    items-center
                    gap-2
                    font-medium
                    text-rose-500
                    transition
                    hover:text-rose-400
                    disabled:opacity-50
                  "
                >
                  <Navigation
                    className={`h-4 w-4 ${
                      isDetecting ? "animate-spin" : ""
                    }`}
                  />

                  {isDetecting
                    ? "Detecting location..."
                    : "Detect my location"}
                </button>


                {!searchTerm && (
                  <div>
                    <h3
                      className="
                        mb-4
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-gray-400
                      "
                    >
                      Popular Cities
                    </h3>

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-3
                        md:grid-cols-5
                      "
                    >
                      {POPULAR_CITIES.map((city) => (
                        <button
                          key={city.id}
                          onClick={() =>
                            handleCitySelect(city.name)
                          }
                          className={`
                            flex
                            min-w-0
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border
                            p-3
                            transition
                            group

                            ${
                              selectedCity === city.name
                                ? "border-rose-500 bg-rose-500/10"
                                : "border-[#292D35] bg-[#111318] hover:border-rose-500"
                            }
                          `}
                        >
                          <span
                            className="
                              mb-1
                              text-2xl
                              transition-transform
                              group-hover:scale-110
                            "
                          >
                            {city.icon}
                          </span>

                          <span
                            className="
                              w-full
                              truncate
                              text-center
                              text-xs
                              font-medium
                              text-gray-300
                              group-hover:text-rose-400
                            "
                          >
                            {city.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Cities */}

                <div>
                  <h3
                    className="
                      mb-3
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    {searchTerm
                      ? "Search Results"
                      : "Other Cities"}
                  </h3>

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-x-4
                      gap-y-1
                      sm:grid-cols-3
                      md:grid-cols-4
                    "
                  >
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
                        className={`
                          min-w-0
                          truncate
                          rounded-lg
                          px-3
                          py-2
                          text-left
                          text-sm
                          transition

                          ${
                            selectedCity === cityName
                              ? "font-bold text-rose-500"
                              : "text-gray-400 hover:bg-[#292D35] hover:text-rose-400"
                          }
                        `}
                      >
                        {cityName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>

      <button
        onClick={() => setIsOpen(true)}
        className="
          flex
          items-center
          gap-1.5
          text-sm
          font-medium
          text-gray-200
          transition
          hover:text-white
        "
      >
        <span className="max-w-[120px] truncate">
          {selectedCity}
        </span>

        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
      </button>


      {locationModal}
    </>
  );
}