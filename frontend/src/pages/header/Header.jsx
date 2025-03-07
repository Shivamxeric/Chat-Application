import { useState } from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import ProfilePage from "./Profile"; // Import the ProfilePage
import { useAuthContext } from "../../context/AuthContext";

const Header = ({ selectedUser }) => {
    const {authUser} = useAuthContext()
    const [showProfile, setShowProfile] = useState(false);
    // Example user data
    const user = {
        fullName: authUser.fullName,
        username: authUser.username,
        profilePic: authUser.profilePic, // Replace with actual image URL
    };

    const toggleProfile = () => {
        setShowProfile((prev) => !prev);
    };

    return (
        <>
            {/* Header Section */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between bg-blend-saturation text-white  py-2 px-4 shadow-md"
            >
                <h1 className="text-lg font-bold">
                    {selectedUser ? `Chat with ${selectedUser}` : "Chat Application"}
                </h1>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    {/* Profile Icon */}
                    <FaUserCircle
                        size={24}
                        className="cursor-pointer hover:text-gray-300"
                        onClick={toggleProfile}
                    />

                    {/* Settings Icon */}
                    <FaCog
                        size={24}
                        className="cursor-pointer hover:text-gray-300"
                        onClick={() => alert("Settings feature coming soon!")}
                    />
                </div>
            </motion.header>

            {/* Show Profile Page */}
            {showProfile && <ProfilePage user={user} onClose={toggleProfile} />}
        </>
    );
};

export default Header;
  