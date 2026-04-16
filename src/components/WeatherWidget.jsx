import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import './WeatherWidget.css';

const weatherIcons = {
  'Sunny': '☀',
  'Clear': '☀',
  'Partly cloudy': '⛅',
  'Cloudy': '☁',
  'Overcast': '☁',
  'Rain': '🌧',
  'Light rain': '🌦',
  'Heavy rain': '🌧',
  'Snow': '❄',
  'Fog': '🌫',
  'Thunderstorm': '⛈',
};

function getWeatherIcon(condition) {
  if (!condition) return '☀';
  const key = Object.keys(weatherIcons).find(k => 
    condition.toLowerCase().includes(k.toLowerCase())
  );
  return weatherIcons[key] || '☀';
}

export function WeatherWidget({ city = 'New York' }) {
  const [currentCity, setCurrentCity] = useState(city);
  const [inputCity, setInputCity] = useState(city);
  const { data, loading, error } = useFetch(`https://wttr.in/${currentCity}?format=j1`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCurrentCity(inputCity.trim());
    }
  };

  const current = data?.current_condition?.[0];

  return (
    <div className="weather-widget">
      {loading ? (
        <div className="weather-loading">
          <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 1rem' }} />
          <div className="skeleton" style={{ width: '80px', height: '24px', margin: '0 auto' }} />
        </div>
      ) : error ? (
        <div className="weather-error">
          <span className="error-icon">⚠</span>
          <p>Unable to load weather</p>
        </div>
      ) : current ? (
        <div className="weather-content">
          <div className="weather-main">
            <span className="weather-icon">{getWeatherIcon(current.weatherDesc?.[0]?.value)}</span>
            <div className="weather-temp">{current.temp_C}°</div>
          </div>
          <div className="weather-details">
            <span className="weather-condition">{current.weatherDesc?.[0]?.value || 'Clear'}</span>
            <span className="weather-location">{currentCity}</span>
          </div>
          <div className="weather-stats">
            <div className="weather-stat">
              <span className="stat-label">Humidity</span>
              <span className="stat-value">{current.humidity}%</span>
            </div>
            <div className="weather-stat">
              <span className="stat-label">Wind</span>
              <span className="stat-value">{current.windspeedKmph} km/h</span>
            </div>
          </div>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Search city..."
          className="weather-input"
        />
        <button type="submit" className="weather-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </form>
    </div>
  );
}