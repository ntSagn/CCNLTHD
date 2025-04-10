import React from 'react';

function UserProfile({ name, age, job }) {
    return (
        <div className="profile">
            <h2>📄 Hồ sơ người dùng</h2>
            <p><strong>Tên:</strong> {name}</p>
            <p><strong>Tuổi:</strong> {age}</p>
            <p><strong>Nghề nghiệp:</strong> {job}</p>
        </div>
    );
}

export default UserProfile;