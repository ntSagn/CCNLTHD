import React from "react";

function ChangeProfileButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
            🔄 Xem hồ sơ tiếp theo
        </button>
    );
}

export default React.memo(ChangeProfileButton);