import React from 'react';

function ChangeProfileButton({ onClick }) {
    return (
        <button className="btn" onClick={onClick}>
            Đổi hồ sơ
        </button>
    );
}

export default ChangeProfileButton;