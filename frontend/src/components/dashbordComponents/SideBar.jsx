import AvaterImg from "../../assets/avater.png";
import UseAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const { user } = UseAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="pt-20 p-6 bg-sky-600 text-white h-screen w-[20%] shadow-lg ">
      <div className="flex flex-col items-center mt-5">
        <div className="flex items-center gap-3 mb-5">
          <img
            src={AvaterImg}
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <span className="text-2xl font-bold">{user?.role === "admin" ? "Admin" : "User"}</span>
        </div>

        <div className="mb-5 text-center text-sm text-gray-300">
          <p>Hello, {user?.name}!</p>
          <p className="text-xs">{user?.email}</p>
        </div>

        <hr className="border-white w-full mb-5" />

        <div className="flex flex-col w-full">
          <ul className="space-y-4">
            <li>
              <Link
                to={user?.role === "admin" ? "/admin" : "/user"} // Conditional path based on role
                className={`flex items-center gap-2 text-lg py-2 px-3 rounded-md transition-all ${
                  isActive(user?.role === "admin" ? "/admin" : "/user")
                    ? "bg-white text-sky-600"
                    : "hover:bg-white hover:text-sky-600"
                }`}
              >
                <i className="fa fa-dashboard"></i> Dashboard
              </Link>
            </li>

            {/* All Tickets link - Admin only */}
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin/tickets"
                  className={`flex items-center gap-2 text-lg py-2 px-3 rounded-md transition-all ${
                    isActive("/admin/tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <i className="fa fa-ticket-alt"></i> All Tickets
                </Link>
              </li>
            )}

            {/* Closed Tickets link - Admin only */}
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin/closed-tickets"
                  className={`flex items-center gap-2 text-lg py-2 px-3 rounded-md transition-all ${
                    isActive("/admin/closed-tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <i className="fa fa-times-circle"></i> Closed Tickets
                </Link>
              </li>
            )}

            {/* Tickets in Progress link - Admin only */}
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin/in-progress-tickets"
                  className={`flex items-center gap-2 text-lg py-2 px-3 rounded-md transition-all ${
                    isActive("/admin/in-progress-tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <i className="fa fa-spinner"></i> Tickets in Progress
                </Link>
              </li>
            )}

            {/* User-specific link */}
            {user?.role === "user" && (
              <li>
                <Link
                  to="/user/tickets"
                  className={`flex items-center gap-2 text-lg py-2 px-3 rounded-md transition-all ${
                    isActive("/user/tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <i className="fa fa-ticket-alt"></i> My Tickets
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
