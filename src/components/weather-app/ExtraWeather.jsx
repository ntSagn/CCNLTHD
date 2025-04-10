// Cải tiến ExtraWeather.jsx
import React, { useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const ExtraWeather = React.memo(({ fiveDaysForecast }) => {
  if (!fiveDaysForecast) {
    return <CircularProgress color='black'/>;
  }
  
  // Use useMemo to avoid recalculating on each render
  const days = useMemo(() => {
    const groupedForecasts = fiveDaysForecast.reduce((acc, forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString('vn-VN');
      if (!acc[date]) {
        acc[date] = { temp: 0, count: 0, descriptions: [] };
      }
      acc[date].temp += forecast.main.temp;
      acc[date].count += 1;
      acc[date].descriptions.push(forecast?.weather[0]?.description);
      return acc;
    }, {});

    const averagedForecasts = Object.keys(groupedForecasts).map((date) => {
      const { temp, count, descriptions } = groupedForecasts[date];
      const avgTemp = temp / count;
      const mostCommonDescription = descriptions.sort((a, b) =>
        descriptions.filter(v => v === a).length - descriptions.filter(v => v === b).length
      ).pop();
      return { date, avgTemp, description: mostCommonDescription };
    });

    return averagedForecasts.slice(0, 5);
  }, [fiveDaysForecast]);

  return (
    <div className='w-4/5 bg-gray-500 text-white rounded-3xl p-4'>
      <h3 className='font-semibold border-b-2'>5 Days Forecast</h3>
      <div className=''>
        {days.map((day) => (
          <div key={day.date} className='bg-gray-600 p-2 mt-2 mb-2 rounded-lg'>
            <h4 className='font-semibold'>{day.date}</h4>
            <div className='text-sm flex justify-between items-center'>
              <p>{(day.avgTemp - 273.15).toFixed(2)}°C</p>
              <p>{day.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ExtraWeather;