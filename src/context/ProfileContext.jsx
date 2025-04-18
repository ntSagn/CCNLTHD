import { useEffect, useState, createContext } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("/data/profiles.json")
            .then((res) => res.json())
            .then((data) => {
                setProfiles(data);
            })
            .catch((error) => {
                console.error("Lỗi khi fetch JSON:", error);
            });
    }, []);

    return (
        <ProfileContext.Provider
            value={{ profiles, currentIndex, setCurrentIndex }}
        >
            {children}
        </ProfileContext.Provider>
    );
};