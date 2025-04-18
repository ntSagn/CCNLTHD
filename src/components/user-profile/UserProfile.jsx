import React from 'react';

import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';

export default function UserProfile() {
    const { profiles, currentProfileIndex } = useContext(ProfileContext);
    const profile = profiles[currentProfileIndex];

    if (!profile) return <p>Đang tải dữ liệu...</p>;

    return (
        <div>
            {/* <p>1233333333333333333333333333333333333333333333333</p> */}
            <h2>{profile.name}</h2>
            <p>{profile.job}</p>
            <img src={profile.avatar} alt={profile.name} />
        </div>
    );
}
