"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, X, Navigation } from 'lucide-react';

const POPULAR_CITIES = [
  { id: 'mumbai', name: 'Mumbai', icon: '🏙️' },
  { id: 'delhi-ncr', name: 'Delhi-NCR', icon: '🏛️' },
  { id: 'bengaluru', name: 'Bengaluru', icon: '🌳' },
  { id: 'hyderabad', name: 'Hyderabad', icon: '🏰' },
  { id: 'ahmedabad', name: 'Ahmedabad', icon: '🕌' },
  { id: 'chandigarh', name: 'Chandigarh', icon: '🌆' },
  { id: 'chennai', name: 'Chennai', icon: '🏖️' },
  { id: 'pune', name: 'Pune', icon: '⛰️' },
  { id: 'kolkata', name: 'Kolkata', icon: '🌉' },
  { id: 'kochi', name: 'Kochi', icon: '🌴' },
];

const ALL_CITIES = [
  'Agra', 'Ajmer', 'Amritsar', 'Bhopal', 'Coimbatore', 
  'Dehradun', 'Goa', 'Indore', 'Jaipur', 'Lucknow', 
  'Nagpur', 'Nashik', 'Patna', 'Surat', 'Vadodara', 'Varanasi'
];

export default function LocationModal({ isOpen, onClose, selectedCity, onSelectCity }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isOpen) return null;

  // Handle City Selection
  const handleCitySelect = (cityName) => {
    onSelectCity(cityName);
    localStorage.setItem('showbook_selected_city', cityName);
    onClose();
  };

  // Detect location using browser Geolocation API
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
          // Reverse Geocoding using OpenStreetMap Nominatim (Free API)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.state_district || 'Unknown Location';
          
          handleCitySelect(city);
        } catch (err) {
          alert('Failed to resolve city from GPS');
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        setIsDetecting(false);
        alert('Permission denied or location unavailable.');
      }
    );
  };

  // Filter cities based on search
  const filteredPopular = POPULAR_CITIES.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAll = ALL_CITIES.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl overflow-hidden transition-all">
        
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for your city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base outline-none bg-transparent placeholder-gray-400 text-gray-800"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Auto-detect Button */}
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="flex items-center gap-2 text-rose-600 font-medium hover:text-rose-700 transition"
          >
            <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            {isDetecting ? 'Detecting Location...' : 'Detect my location'}
          </button>

          {/* Popular Cities Grid */}
          {!searchTerm && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
                Popular Cities
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city.name)}
                    className={`flex flex-col items-center p-3 rounded-lg border hover:border-rose-500 transition group ${
                      selectedCity === city.name ? 'border-rose-500 bg-rose-50/50' : 'border-gray-100'
                    }`}
                  >
                    <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                      {city.icon}
                    </span>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-rose-600">
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Cities / Search Results */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {searchTerm ? 'Search Results' : 'Other Cities'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[...filteredPopular.map(c => c.name), ...filteredAll].map((cityName, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCitySelect(cityName)}
                  className={`text-left text-sm py-1.5 px-2 rounded hover:text-rose-600 ${
                    selectedCity === cityName ? 'font-bold text-rose-600' : 'text-gray-600'
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
  );
}