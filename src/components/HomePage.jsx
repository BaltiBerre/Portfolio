// HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [historicalEvent, setHistoricalEvent] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-auth');
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchTopTracks = async () => {
        try {
          const response = await axios.get('http://localhost:5000/top-tracks');
          setTopTracks(response.data);
        } catch (error) {
          console.error('Error fetching top tracks:', error);
          setTopTracks([]);
        }
      };

      fetchTopTracks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchHistoricalEvent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/historical-event');
        setHistoricalEvent(response.data.event);
      } catch (error) {
        console.error('Error fetching historical event:', error);
        setHistoricalEvent('Unable to fetch historical event.');
      }
    };

    fetchHistoricalEvent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Title */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4"> Before anything...</h1>
            <p className="text-xl text-gray-600"> A few lil things I care about</p>
          </div>

          {/* Historical Event */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">This Day in History</h2>
            <p className="text-lg text-gray-700">{historicalEvent}</p>
          </div>

          {/* Spotify Stats */}
          <div className="bg-purple-900 p-8 rounded-lg shadow-2xl text-white">
            
            {!isAuthenticated ? (
              <a href="http://localhost:5000/login" className="bg-green-500 text-white px-4 py-2 rounded block text-center">
                Connect Spotify
              </a>
            ) : (
              <>
                <h3 className="text-2xl font-semibold mb-4">Top 5 Tracks Right Now</h3>
                <ul className="space-y-4">
                  {topTracks.map((track, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <span className="text-4xl font-bold text-green-400">{index + 1}</span>
                      {track.albumArt && (
                        <img 
                          src={track.albumArt} 
                          alt={`${track.name} album art`} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div>
                        <p className="text-xl font-semibold">{track.name}</p>
                        <p className="text-sm text-gray-300">{track.artist}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center text-white mt-16">
          <p className="mb-2">Scroll to explore more</p>
          <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HomePage;