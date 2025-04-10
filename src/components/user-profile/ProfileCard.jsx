import React from 'react';
import UserProfile from './UserProfile';
import ChangeProfileButton from './ChangeProfileButton';

function ProfileCard({ profile, onChange }) {
    return (
        <div className="card">
            <UserProfile name={profile.name} age={profile.age} job={profile.job} />
            <ChangeProfileButton onClick={onChange} />
        </div>
    );
}

export default ProfileCard;