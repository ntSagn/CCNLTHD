import React from "react";

function ProfileCard({ profile }) {
    if (!profile) return <div className="text-center p-6">Đang tải dữ liệu...</div>;

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-blue-700">Kodecolor</div>
                    <div className="flex gap-6 items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 border rounded-xl text-sm"
                        />
                        <button className="text-sm font-medium">My Contacts</button>
                        <img
                            src={profile.avatar}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                </div>

                {/* Profile section */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src={profile.image}
                            alt="Profile"
                            className="w-48 h-48 rounded-xl object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                                <p className="text-sm text-blue-600">{profile.job}</p>
                                <p className="text-sm text-gray-500">{profile.location}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="font-semibold text-lg">{profile.rating}</span>
                                    <div className="text-yellow-400">★★★★★</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <button className="bg-blue-500 text-white px-4 py-1 rounded-xl text-sm hover:bg-blue-600 transition cursor-pointer">
                                    Send message
                                </button>
                                <button className="bg-gray-100 px-4 py-1 rounded-xl text-sm hover:bg-gray-200 transition cursor-pointer">
                                    Contacts
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 border-b flex gap-6 text-sm font-medium">
                            <button className="pb-2 border-b-2 border-transparent hover:border-blue-500">Timeline</button>
                            <button className="pb-2 border-b-2 border-blue-500 text-blue-600">About</button>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
                                <p><span className="font-medium">Phone:</span> <a href={`tel:${profile.phone}`} className="text-blue-600">{profile.phone}</a></p>
                                <p><span className="font-medium">Address:</span> {profile.address}</p>
                                <p><span className="font-medium">Email:</span> <a href={`mailto:${profile.email}`} className="text-blue-600">{profile.email}</a></p>
                                <p><span className="font-medium">Website:</span> <a href={`https://${profile.website}`} className="text-blue-600">{profile.website}</a></p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Basic Information</h3>
                                <p><span className="font-medium">Birthday:</span> {profile.birthday}</p>
                                <p><span className="font-medium">Gender:</span> {profile.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Work</h3>
                        {profile.work.map((w, index) => (
                            <div key={index} className="mb-2">
                                <p className="font-medium">
                                    {w.place}
                                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                        w.type === "Primary"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}>
                                        {w.type}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500">{w.address}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProfileCard);