import React from 'react'
// Import các icon biểu cảm cho chỉ số chất lượng không khí
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
// Import các icon thời tiết và môi trường
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import CompressIcon from '@mui/icons-material/Compress';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

// Component hiển thị chất lượng không khí dựa trên chỉ số AQI
const RenderAirQuality = ({ aqi }) => {
  if (1 <= aqi && aqi <= 3) {
    return <p className='p-1 bg-green-600 rounded-lg'>Good</p>
  }
  else if (4 <= aqi && aqi <= 6) {
    return <p className='p-1 bg-yellow-500 rounded-lg'>Moderate</p>
  }
  else if (7 <= aqi && aqi <= 9) {
    return <p className='p-1 bg-red-500 rounded-lg'>Unhealthy</p>
  }
  else if (aqi == 10) {
    return <p className='p-1 bg-purple-500 rounded-lg'>Hazardous</p>
  }
}

// Component hiển thị biểu cảm tương ứng với chất lượng không khí
const RenderFace = ({ aqi }) => {
  if (1 <= aqi && aqi <= 3) {
    return <SentimentVerySatisfiedIcon fontSize='large' />
  }
  else if (4 <= aqi && aqi <= 6) {
    return <SentimentSatisfiedIcon fontSize='large' />
  }
  else if (7 <= aqi && aqi <= 9) {
    return <SentimentDissatisfiedIcon fontSize='large' />
  }
  else if (aqi == 10) {
    return <SentimentVeryDissatisfiedIcon fontSize='large' />
  }
}

// Component chính hiển thị các thông tin chi tiết về thời tiết và chất lượng không khí
const HighlightWeather = ({ weatherData, airQualityData }) => {
  // Trích xuất dữ liệu về chất lượng không khí
  const { co, no, no2, o3 } = airQualityData?.components || {};
  
  // Chuyển đổi thời gian Unix sang định dạng thời gian địa phương
  const sunriseTime = new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const sunsetTime = new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      <h3 className='font-bold text-lg'>Today's Weather</h3>
      <div className='grid grid-cols-2 items-center p-4 mb-1 m-auto h-full'>
        {/* Phần hiển thị chất lượng không khí và thời gian mặt trời mọc/lặn */}
        <div className='bg-gray-600 p-4 m-2 rounded-2xl h-full'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold text-xl'>Air Quality Index</h3>
            <RenderAirQuality aqi={airQualityData?.main?.aqi} />
          </div>
          <div className='mt-5 text-center'>
            <RenderFace aqi={airQualityData?.main?.aqi} />
          </div>
          <div className='flex justify-between items-center mt-5 text-center'>
            <div>
              <p className='font-semibold'>CO</p>
              <p>{co} µg/m³</p>
            </div>
            <div>
              <p className='font-semibold'>NO</p>
              <p>{no} µg/m³</p>
            </div>
            <div>
              <p className='font-semibold'>NO₂</p>
              <p>{no2} µg/m³</p>
            </div>
            <div>
              <p className='font-semibold'>O₃</p>
              <p>{o3} µg/m³</p>
            </div>
          </div>
          <div className='mt-20'>
            <h3 className='font-semibold text-xl'>Sunrise and Sunset</h3>
            <div className='text-center flex pt-4'>
              <div className='w-1/2 '>
                <p><span><WbSunnyIcon fontSize='large' /></span></p>
                <p>{sunriseTime}</p>
              </div>
              <div className='w-1/2'>
                <p><span><NightsStayIcon fontSize='large' /></span></p>
                <p>{sunsetTime}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Phần hiển thị thông tin thời tiết và gió */}
        <div className='bg-gray-600 p-4 m-2 rounded-2xl h-full'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-xl'>Weather</h3>
            <div className='flex items-center gap-2'>
              <CloudQueueIcon fontSize='large' />
              <p className='font-semibold'>{weatherData?.weather[0]?.main}</p>
            </div>
          </div>

          <div className='flex items-center justify-between pt-4 text-center'>
            <div>
              <p className='font-semibold'>Minimum Temperature</p>
              <p>{weatherData?.main?.temp_min}°C</p>
            </div>
            <div>
              <p className='font-semibold'>Maximum Temperature</p>
              <p>{weatherData?.main?.temp_max}°C</p>
            </div>
          </div>

          <div className='mt-5 text-center'>
            <p className='font-semibold'>Cloud Cover</p>
            <p>{weatherData?.clouds?.all}%</p>
          </div>

          <div className='mt-16 pt-2'>
            <h3 className='font-semibold text-xl'>Wind</h3>
            <div className='flex justify-between pt-4 items-center'>
              <div>
                <p className='font-semibold'>Speed</p>
                <p>{weatherData?.wind?.speed} m/s</p>
              </div>
              <div>
                <p className='font-semibold'>Direction</p>
                <p>{weatherData?.wind?.deg} degrees</p>
              </div>
              <div>
                <p className='font-semibold'>Gust</p>
                <p>{weatherData?.wind?.gust || 0} m/s</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Phần hiển thị độ ẩm và áp suất */}
        <div className='flex items-center justify-center h-full'>
          <div className='p-4 m-2 rounded-2xl bg-gray-600 w-1/2 h-4/5'>
            <p className='font-semibold text-xl'>Humidity</p>
            <div className='flex justify-between mt-5'>
              <span><InvertColorsIcon /></span>
              <p className='font-semibold text-xl'>{weatherData?.main?.humidity}%</p>
            </div>
          </div>
          <div className='p-4 m-2 rounded-2xl bg-gray-600 w-1/2 h-4/5'>
            <p className='font-semibold text-xl'>Pressure</p>
            <div className='flex justify-between mt-5'>
              <span><CompressIcon /></span>
              <p className='font-semibold text-xl'>{weatherData?.main?.pressure} hPa</p>
            </div>
          </div>
        </div>
        
        {/* Phần hiển thị tầm nhìn và cảm giác nhiệt */}
        <div className='flex items-center justify-center h-full'>
          <div className='p-4 m-2 rounded-2xl bg-gray-600 w-1/2 h-4/5'>
            <p className='font-semibold text-xl'>Visibility</p>
            <div className='flex justify-between mt-5'>
              <span><RemoveRedEyeIcon /></span>
              <p className='font-semibold text-xl'>{(weatherData?.visibility)/1000} km</p>
            </div>
          </div>
          <div className='p-4 m-2 rounded-2xl bg-gray-600 w-1/2 h-4/5'>
            <p className='font-semibold text-xl'>Feels Like</p>
            <div className='flex justify-between mt-5'>
              <span><DeviceThermostatIcon /></span>
              <p className='font-semibold text-xl'>{weatherData?.main?.feels_like}°C</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HighlightWeather