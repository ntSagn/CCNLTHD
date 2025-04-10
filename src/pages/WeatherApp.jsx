import React, { useEffect, useState, useCallback } from 'react';
import ExtraWeather from '../components/weather-app/ExtraWeather';
import MainWeather from '../components/weather-app/MainWeather';
import Navbar from '../components/weather-app/Navbar';
import HighlightWeather from '../components/weather-app/HighlightWeather';
import Alert from '@mui/material/Alert';

function WeatherApp() {
  // Các state để lưu trữ dữ liệu
  const [weatherData, setWeatherData] = useState(null); // Dữ liệu thời tiết hiện tại
  const [city, setCity] = useState('Ha Noi'); // Thành phố mặc định
  const [airQualityData, setAirQualityData] = useState(null); // Dữ liệu chất lượng không khí
  const [fiveDaysForecast, setFiveDaysForecast] = useState(null); // Dự báo 5 ngày
  const [error, setError] = useState(''); // Thông báo lỗi nếu có

  // Hàm fetch dữ liệu thời tiết hiện tại
  const fetchWeatherData = useCallback(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('City not found');
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data?.coord?.lat, data?.coord?.lon);
        fetchFiveDaysForecast(data?.coord?.lat, data?.coord?.lon);
        setError('');
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, [city]);

  // Hàm fetch dữ liệu chất lượng không khí dựa trên tọa độ
  const fetchAirQualityData = useCallback((lat, lon) => {
    const API_KEY1 = import.meta.env.VITE_API_KEY1;
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY1}`)
      .then((res) => res.json())
      .then((data) => {
        setAirQualityData(data.list[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  // Hàm fetch dữ liệu dự báo 5 ngày dựa trên tọa độ
  const fetchFiveDaysForecast = useCallback((lat, lon) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setFiveDaysForecast(data.list);
      })
      .catch((error) => console.log(error));
  }, []);

  // Hàm xử lý khi người dùng tìm kiếm thành phố mới
  const handleSearch = useCallback((searchedCity) => {
    setCity(searchedCity);
  }, []);

  // Hàm xử lý khi người dùng muốn lấy vị trí hiện tại
  const handleGetCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setCity(data.name);
        })
        .catch((error) => console.log(error));
    });
  }, []);

  // Effect hook để fetch dữ liệu khi thành phố thay đổi
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return (
    <div>
      {/* Phần header với Navbar và thông báo lỗi nếu có */}
      <div className='border-b-2'>
        <Navbar onSearch={handleSearch} currentLocation={handleGetCurrentLocation}/>
        {error && (
          <div className='text-red-500 text-center'>
            <Alert severity="error">{error}</Alert>
          </div>
        )}
      </div>

      {/* Layout chính của ứng dụng */}
      <div className='flex justify-center container m-auto mt-2'>
        {/* Cột bên trái (1/5 chiều rộng) chứa thời tiết hiện tại và dự báo 5 ngày */}
        <div className='flex flex-col w-1/5 pt-4'>
          <div>
            <MainWeather weatherData={weatherData} />
          </div>
          <div className='mt-5'>
            <ExtraWeather fiveDaysForecast={fiveDaysForecast} />
          </div>
        </div>
        
        {/* Cột bên phải (4/5 chiều rộng) chứa các thông tin chi tiết về thời tiết */}
        <div className='w-4/5 pt-4'>
          <div className='bg-gray-500 h-full rounded-3xl'>
            <div className='text-white p-4 h-full'>
              <HighlightWeather weatherData={weatherData} airQualityData={airQualityData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;