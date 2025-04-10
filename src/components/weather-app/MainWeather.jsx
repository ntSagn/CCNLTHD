import React, { useEffect, useState, useMemo } from 'react'
// Import các icon từ Material UI để hiển thị trạng thái thời tiết
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Icon mặt trời cho thời tiết nóng
import CloudIcon from '@mui/icons-material/Cloud'; // Icon mây cho thời tiết mát
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Icon tuyết cho thời tiết lạnh
import SevereColdIcon from '@mui/icons-material/SevereCold'; // Icon lạnh cho thời tiết rất lạnh
import DescriptionIcon from '@mui/icons-material/Description'; // Icon mô tả
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icon vị trí
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'; // Icon thời gian
import CircularProgress from '@mui/material/CircularProgress'; // Icon loading khi đang tải dữ liệu

// Component con để hiển thị icon phù hợp dựa trên nhiệt độ
export const RenderTemperatureIcon = React.memo(({ temperatureCelcius }) => {
  if (temperatureCelcius > 30) {
    return <WbSunnyIcon />
  }
  if (temperatureCelcius <= 30 && temperatureCelcius >= 20) {
    return <CloudIcon />
  }
  if (temperatureCelcius < 20 && temperatureCelcius >= 10) {
    return <AcUnitIcon />
  }
  if (temperatureCelcius < 10) {
    return <SevereColdIcon />
  }
});

// Component chính để hiển thị thông tin thời tiết hiện tại
const MainWeather = React.memo(({ weatherData }) => {
  // Trích xuất dữ liệu từ prop weatherData với xử lý fallback nếu dữ liệu chưa sẵn sàng
  const temperatureCelcius = weatherData?.main?.temp || <CircularProgress color='white' size={25} />; // Nhiệt độ
  const description = weatherData?.weather[0]?.description || <CircularProgress color='white' size={25} />; // Mô tả thời tiết
  const location = weatherData?.name || <CircularProgress color='white' size={25} />; // Tên địa điểm
  const city = weatherData?.sys?.country || <CircularProgress color='white' size={25} />; // Mã quốc gia

  // State lưu trữ thời gian hiện tại để hiển thị đồng hồ thực
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect hook để cập nhật thời gian mỗi giây
  useEffect(() => {
    // Tạo interval để cập nhật thời gian mỗi 1000ms (1 giây)
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function để xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  // Xử lý định dạng ngày, tháng và thời gian để hiển thị
  const formattedTime = useMemo(() => {
    const day = currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : currentTime.getDate();
    const month = currentTime.getMonth() + 1 < 10 ? `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1;
    const year = currentTime.getFullYear();
    const hours = currentTime.getHours() < 10 ? `0${currentTime.getHours()}` : currentTime.getHours();
    const minutes = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes();
    const seconds = currentTime.getSeconds() < 10 ? `0${currentTime.getSeconds()}` : currentTime.getSeconds();
    
    return { day, month, year, hours, minutes, seconds };
  }, [currentTime]);

  return (
    // Container chính với styling sử dụng Tailwind CSS
    <div className='w-4/5 bg-gray-500 text-white rounded-3xl p-4'>
      {/* Phần header hiển thị ngày tháng năm hiện tại */}
      <div className='flex justify-between items-center border-b-2 mb-1'>
        <h3 className='font-semibold'>Now</h3>
        <p className='text-sm font-semibold'>{formattedTime.day}/{formattedTime.month}/{formattedTime.year}</p>
      </div>

      <div>
        {/* Hiển thị nhiệt độ và icon tương ứng */}
        <div className='flex items-center text-3xl gap-2'>
          {<RenderTemperatureIcon temperatureCelcius={temperatureCelcius} />} {/* Icon thời tiết dựa trên nhiệt độ */}
          <p className='font-semibold'>{temperatureCelcius}°C</p> {/* Hiển thị nhiệt độ */}
        </div>

        {/* Hiển thị mô tả thời tiết */}
        <div className='flex items-center mt-1 gap-2'>
          {<DescriptionIcon />} {/* Icon mô tả */}
          <p className='text-sm'>{description}</p> {/* Mô tả thời tiết (mưa, mây, etc.) */}
        </div>

        {/* Hiển thị vị trí */}
        <div className='flex items-center mt-1 gap-2'>
          {<LocationOnIcon />} {/* Icon vị trí */}
          <p className='text-sm'>{location}, {city}</p> {/* Tên địa điểm và quốc gia */}
        </div>

        {/* Hiển thị thời gian hiện tại */}
        <div className='flex items-center mt-1 gap-2'>
          {<AccessTimeFilledIcon />}
          <p className='text-sm'>{formattedTime.hours}:{formattedTime.minutes}:{formattedTime.seconds}</p>
        </div>
      </div>
    </div>
  )
});

export default MainWeather