import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import bg1 from "../public/bg1.mp4";
import ai from "./ai.png";
import { motion } from "framer-motion";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        autoPlay
      >
        <source src={bg1} type="video/mp4" />
      </video>

      <div className="relative z-10 mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </div>

      <Toaster />

      <motion.img
        src={ai}
        alt="AI Assistant"
        className="absolute bottom-5 right-5 w-16 h-16 cursor-pointer drop-shadow-lg"
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
    </div>
  );
}

export default App;
