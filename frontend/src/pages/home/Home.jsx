import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import Header from "../header/Header"; // Import the Header component

const Home = () => {
    return (
        <div className="flex flex-col sm:h-[450px] md:h-[550px] w-[950px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Header />

            <div className="flex flex-1">
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    );
};

export default Home;
