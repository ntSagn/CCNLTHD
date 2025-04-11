import { React, useState } from 'react'
import { Button, TextField } from '@mui/material'; // Import các component từ Material UI
import SearchIcon from '@mui/icons-material/Search'; // Icon tìm kiếm
import GpsFixedIcon from '@mui/icons-material/GpsFixed'; // Icon định vị

// Component Navbar nhận vào 2 props:
// - onSearch: hàm xử lý tìm kiếm khi người dùng nhập tên thành phố
// - currentLocation: dữ liệu vị trí hiện tại của người dùng
const Navbar = ({ onSearch, currentLocation }) => {
    // State lưu trữ giá trị trong ô tìm kiếm
    const [searchCity, setSearchCity] = useState('');

    // Hàm xử lý khi người dùng nhấn nút Search
    const handleSearchClick = () => {
        if (searchCity.trim()) { // Kiểm tra xem searchCity có giá trị không rỗng sau khi loại bỏ khoảng trắng
            onSearch(searchCity); // Gọi hàm onSearch được truyền từ component cha
        }
    }

    // Hàm xử lý khi người dùng muốn sử dụng vị trí hiện tại
    const handleGetCurrentLocation = () => {
        if (currentLocation) { // Kiểm tra xem có dữ liệu về vị trí hiện tại không
            onSearch(currentLocation); // Tìm kiếm thời tiết dựa trên vị trí hiện tại
        }
    }

    return (
        // Thanh điều hướng với Flexbox, căn chỉnh các phần tử và padding
        <nav className='flex justify-between items-center px-3'>
            {/* Phần logo và tên ứng dụng */}
            <div className='flex items-center gap-1 m-4'>
                <img className='w-12' src="../../logo.jpg" alt="Logo" />
                <p className='font-bold text-2xl'>Weather Forecast</p>
            </div>

            {/* Phần ô tìm kiếm và nút tìm kiếm */}
            <form className='w-1/3' onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}>
                <TextField
                    className='w-3/4'
                    label='Search City' // Nhãn hiển thị trên ô tìm kiếms
                    variant='outlined' // Kiểu viền của ô input
                    size='small' // Kích thước nhỏ để phù hợp với giao diện
                    value={searchCity} // Giá trị từ state
                    onChange={(e) => setSearchCity(e.target.value)} // Cập nhật state khi người dùng nhập
                />
                <Button onClick={handleSearchClick} color='black' endIcon={<SearchIcon />}>
                    Search
                </Button>
            </form>
            
            {/* Nút cho phép lấy vị trí hiện tại của người dùng */}
            <div className='mr-6'>
                <Button 
                    onClick={handleGetCurrentLocation} 
                    variant='outlined' // Kiểu nút với viền
                    color='black' 
                    startIcon={<GpsFixedIcon />} // Icon GPS ở đầu nút
                >
                    Current Location
                </Button>
            </div>
        </nav>
    )
}

export default Navbar