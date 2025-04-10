import axios from 'axios';

// Lấy API key từ biến môi trường (sử dụng Vite)
const API_KEY = import.meta.env.VITE_GEODB_API_KEY;
// URL cơ sở của API GeoDB
const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

// Tạo instance axios với cấu hình sẵn cho GeoDB API
const geoDBClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY, // API key để xác thực
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com', // Host của RapidAPI
  },
});

/**
 * Hàm gọi API để lấy danh sách các thành phố dựa trên chuỗi tìm kiếm
 * @param {string} query - Chuỗi tìm kiếm (tên thành phố)
 * @returns {Array} Mảng các thành phố phù hợp
 */
export const fetchCities = async (query) => {
  try {
    // Gọi API với endpoint /cities và truyền tham số query
    const response = await geoDBClient.get('/cities', {
      params: {
        namePrefix: query, // Tìm thành phố bắt đầu bằng chuỗi query
        limit: 10, // Giới hạn 10 kết quả
      },
    });
    return response.data.data; // Trả về mảng dữ liệu thành phố
  } catch (error) {
    console.error('Error fetching cities:', error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};