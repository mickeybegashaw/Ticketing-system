import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Outlet, useLocation, Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

const UserDashboard = () => {
  const location = useLocation();

  const nestedRoutes = ["/user/tickets", "/user/add-ticket"];
  const isNestedRoute = nestedRoutes.includes(location.pathname);
  return (
    <DashboardLayout>
      {!isNestedRoute && (
        <div className="flex flex-col mt-24 p-5 w-full h-screen m-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex flex-col md:flex-row gap-5 mt-5 w-full">
            <Link
              to="/user/tickets"
              className="bg-white w-full md:w-1/2 p-5 rounded-lg shadow-md"
            >
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  View all Tickets
                </h1>
                <div className="mt-5">
                  <FaExternalLinkAlt size={30} />
                </div>
                <div className="mt-5">
                  <span>All tickets</span>
                </div>
              </div>
            </Link>
            <Link
              to="/user/add-ticket"
              className="bg-white w-full md:w-1/2 p-5 rounded-lg shadow-md"
            >
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  Add New Tickets
                </h1>
                <div className="mt-5">
                  <IoMdAddCircle size={40} />
                </div>
                <div className="mt-5">
                  <span>Add new ticket</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      <Outlet />
    </DashboardLayout>
  );
};

export default UserDashboard;
