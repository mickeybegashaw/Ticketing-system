import { Link } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import AvaterImg from '../../assets/avater.png';
import { useState } from "react"; 

const DashboardHeader = () => {
  const { user, logout } = UseAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const handleLogout = () => {
    logout(); 
  };

  return (
    <header className="fixed w-full h-20 shadow-lg flex items-center bg-white z-10">
      <div className="w-6xl mx-auto flex items-center justify-between p-3">
        <Link to="#">
          <h1 className="text-xl md:text-3xl font-bold">
            Tix<span className="text-sky-600">Manage</span>{" "}
          </h1>
        </Link>
        <div className="flex gap-3 md:gap-9 items-center relative">
          <div
            className="relative w-20 p-5"
            onMouseEnter={() => setIsDropdownOpen(true)} 
            onMouseLeave={() => setIsDropdownOpen(false)} 
          >
            {/* Avatar Image */}
            <img
              className="w-8 rounded-full cursor-pointer"
              src={AvaterImg}
              alt="Avatar"
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-4">
                  <span className="block text-sm font-semibold">{user.name}</span>
                  <span className="block text-sm text-gray-600">{user.email}</span>
                </div>
                <hr className="border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;