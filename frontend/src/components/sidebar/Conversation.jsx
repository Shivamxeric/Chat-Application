import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import ProfilePage from "../../pages/header/Profile"   ;

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle the profile page

    const isSelected = selectedConversation?._id === conversation._id;
    const isOnline = onlineUsers.includes(conversation._id);

    const handleProfileOpen = () => {
        setIsProfileOpen(true); // Open profile page
    };

    const handleProfileClose = () => {
        setIsProfileOpen(false); // Close profile page
    };

    return (
        <>
            {/* Conversation Item */}
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
                    isSelected ? "bg-sky-500" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img
                            src={conversation.profilePic}
                            alt="User Avatar"
                            onClick={handleProfileOpen} // Open profile on avatar click
                            className="cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.fullName}</p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className="divider my-0 py-0 h-1" />}

            {/* Profile Page */}
            {isProfileOpen && (
                <ProfilePage
                    user={{
                        fullName: conversation.fullName, // Pass real full name
                        username: conversation.username, // Pass real username
                        profilePic: conversation.profilePic, // Pass real profile picture
                    }}
                    onClose={handleProfileClose} // Handle close button
                />
            )}
        </>
    );
};

export default Conversation;
