import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const messageEndRef = useRef(null);

  // Scroll to the latest message whenever `selectedConversation` or new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Cleanup function to restore the selected conversation
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col flex-1">
      {/* Show NoChatSelected when no conversation is selected */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-transparent px-4 py-2 mb-2">
            <span className="text-black font-extrabold">To:</span>{" "}
            <span className=" font-extrabold text-white">{selectedConversation.fullName}</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <Messages />
            <div ref={messageEndRef} className="h-0"></div>
          </div>

          {/* Input Area */}
          <MessageInput />
        </>
      )}
    </div>
  );
};
const NoChatSelected = () => {
  return (
    <div className="w-[650px] flex flex-1 flex-col items-center justify-center p-12 bg-transparent">
      <div className="max-w-md text-center space-y-6 relative">
        {/* Glowing Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 to-indigo-500 animate-spin-slow 
              flex items-center justify-center shadow-lg"
            >
              <div
                className="w-16 h-16 rounded-full bg-opacity-20 bg-white backdrop-blur-md flex items-center justify-center animate-pulse"
              >
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Welcome to Chatty!
        </h2>
        <p className="text-gray-300 text-lg font-medium">
          Select a conversation from the sidebar to start chatting.
        </p>

        {/* Decorative Animations */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tr from-blue-500 to-cyan-500 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};export default MessageContainer;
