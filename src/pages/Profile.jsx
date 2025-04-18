import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/user-profile/ProfileCard";

const Profile = () => {
    const { id } = useParams();
    const { profiles } = useContext(ProfileContext);

    const profileIndex = parseInt(id, 10); // Chuyển từ chuỗi sang số
    const profile = profiles[profileIndex];
    console.log(profileIndex , profiles[0])
    if (!profiles.length) {
        return <div className="text-center p-4">Đang tải dữ liệu...</div>;
    }

    if (!profile) {
        return <div className="text-center p-4 text-red-500">Không tìm thấy hồ sơ!</div>;
    }

    return <ProfileCard profile={profile} />;
};

export default Profile;