import { useEffect, useState, createContext } from "react"; // Import React hooks and createContext API

// Tạo một context mới để quản lý thông tin profiles xuyên suốt ứng dụng
export const ProfileContext = createContext();

// Component Provider bọc các component con để cung cấp dữ liệu context
export const ProfileProvider = ({ children }) => {
    // Quản lý state cho danh sách profiles
    const [profiles, setProfiles] = useState([]);
    
    // Quản lý state cho vị trí profile hiện tại đang được xem
    const [currentIndex, setCurrentIndex] = useState(0);

    // useEffect hook để fetch dữ liệu profiles từ file JSON khi component được mount
    useEffect(() => {
        // Gọi API để lấy dữ liệu từ file JSON nằm trong thư mục public
        fetch("/data/profiles.json")
            .then((res) => res.json()) // Chuyển response thành JSON
            .then((data) => {
                setProfiles(data); // Cập nhật state với dữ liệu đã lấy được
            })
            .catch((error) => {
                console.error("Lỗi khi fetch JSON:", error); // Xử lý lỗi nếu có
            });
    }, []); // Mảng dependencies rỗng nên chỉ chạy một lần khi component mount

    // Cung cấp giá trị context cho các component con
    return (
        <ProfileContext.Provider
            value={{ profiles, currentIndex, setCurrentIndex }}
        >
            {children} {/* Render các component con */}
        </ProfileContext.Provider>
    );
};