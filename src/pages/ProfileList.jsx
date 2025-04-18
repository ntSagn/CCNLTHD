import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";

export default function ProfileList() {
    const { profiles } = useContext(ProfileContext);

    return (
        <div className="min-h-screen p-6 bg-blue-50">
            <h1 className="text-3xl font-bold mb-4">Danh sách người dùng</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profiles.map((profile, index) => (
                    <Link to={`/profile/${index}`} key={index}>
                        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-16 h-16 rounded-full mb-2"
                            />
                            <h2 className="text-xl font-semibold">{profile.name}</h2>
                            <p className="text-sm text-gray-600">{profile.job}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}