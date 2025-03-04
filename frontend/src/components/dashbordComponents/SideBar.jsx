import AvaterImg from "../../assets/avater.png";
import UseAuth from "../../hooks/useAuth";
import { RiChatNewFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import {
  FaBars,
  FaTimes,
  FaTicketAlt,
  FaTimesCircle,
  FaSpinner,
  FaTachometerAlt,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import UseTicket from "../../hooks/useTicket";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const { user, logout } = UseAuth();
  const { tickets, openTickets, closedTickets, inProgressTickets } =
    UseTicket();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="pt-20 p-3 md:p-4 bg-sky-600 text-white h-f w-fit md:w-[25%] shadow-lg ">
      <div className="flex flex-col items-center mt-5">
        <div className="flex items-center flex-col md:flex-rol gap-3 mb-5 md:mt-16">
          <img
            src={AvaterImg}
            alt="Avatar"
            className="w-6 h-6 md:w-12 md:h-12 rounded-full border-2 border-white"
          />
          <span className="text-base md:text-xl font-bold">
            {user?.role === "admin" ? "Admin" : "User"}
          </span>
        </div>

        <div className="hidden md:block mb-5 text-center text-sm text-gray-300">
          <p>Hello, {user?.name}!</p>
          <p className="text-xs">{user?.email}</p>
        </div>

        <hr className="border-white w-full mb-5" />

        <div className="flex flex-col w-full">
          <ul className="space-y-4">
            <li>
              <Link
                to={user?.role === "admin" ? "/admin" : "/user"} // Conditional path based on role
                className={`flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all ${
                  isActive(user?.role === "admin" ? "/admin" : "/user")
                    ? "bg-white text-sky-600"
                    : "hover:bg-white hover:text-sky-600"
                }`}
              >
                <FaTachometerAlt size={20} />{" "}
                <span className="hidden md:block">Dashboard</span>
              </Link>
            </li>

            {/* New tickets - Admin only */}
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin/opened-tickets"
                  className={`flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all ${
                    isActive("/admin/opened-tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <RiChatNewFill size={20} />{" "}
                  <div className="flex justify-between w-full">
                    <span className="hidden md:block">Opened Tickets</span>
                    <span>{openTickets.length}</span>
                  </div>
                </Link>
              </li>
            )}

            {/* Tickets in Progress link - Admin only */}
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin/in-progress-tickets"
                  className={`flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all ${
                    isActive("/admin/in-progress-tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <FaSpinner size={20} />{" "}
                  <div className="flex justify-between w-full">
                    <span className="hidden md:block">Tickets In Progress</span>
                    <span>{inProgressTickets.length}</span>
                  </div>
                </Link>
              </li>
            )}

            {/* All Tickets link - Admin only */}
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin/tickets"
                  className={`flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all ${
                    isActive("/admin/tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <FaTicketAlt size={20} />{" "}
                  <div className="flex justify-between w-full">
                    <span className="hidden md:block">All Tickets</span>
                    <span>{tickets.length}</span>
                  </div>
                </Link>
              </li>
            )}

            {/* Closed Tickets link - Admin only */}
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin/closed-tickets"
                  className={`flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all ${
                    isActive("/admin/closed-tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <FaTimesCircle size={20} />{" "}
                  <div className="flex justify-between w-full">
                    <span className="hidden md:block">Closed Tickets</span>
                    <span>{closedTickets.length}</span>
                  </div>
                </Link>
              </li>
            )}

            {/* User-specific link */}
            {user?.role === "user" && (
              <li>
                <Link
                  to="/user/add-ticket"
                  className={`flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all ${
                    isActive("/user/add-ticket")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <IoMdAddCircle />{" "}
                  <span className="hidden md:block">Add new Tickets</span>
                </Link>
              </li>
            )}
            {user?.role === "user" && (
              <li>
                <Link
                  to="/user/tickets"
                  className={`flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all ${
                    isActive("/user/tickets")
                      ? "bg-white text-sky-600"
                      : "hover:bg-white hover:text-sky-600"
                  }`}
                >
                  <FaTicketAlt />{" "}
                  <span className="hidden md:block">My Tickets</span>
                </Link>
              </li>
            )}
            <li
              className={`flex items-center gap-2 text-base py-2 px-3 cursor-pointer rounded-md transition-all 
                  hover:bg-white hover:text-sky-600
              `}
              onClick={() => logout()}
            >
              <MdLogout /> <span className="hidden md:block">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
