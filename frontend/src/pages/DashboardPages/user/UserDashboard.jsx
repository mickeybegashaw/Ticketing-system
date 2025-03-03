import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Outlet, useLocation, Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const UserDashboard = () => {
  const location = useLocation();

  const nestedRoutes = ["/user/tickets", "/user/add-ticket"];
  const isNestedRoute = nestedRoutes.includes(location.pathname);
  return (
    <DashboardLayout>
      {!isNestedRoute && (
        <div className="flex flex-col mt-24 p-5 w-full h-screen m-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          {/* analysis */}
          <div className="flex flex-col md:flex-row gap-5 mt-5 w-full">
            {/* all ticket */}
            <div className="bg-blue-600 text-white flex flex-col gap-3 w-[90%] md:w-[25%]">
              <div className="m-5 flex flex-col gap-2">
                <h1 className="text-2xl font-bold">21</h1>
                <h3>My Total Tickets</h3>
              </div>
              <Link to="/user/tickets">
                <div className="bg-blue-500  bottom-0 p-2 flex gap-2 items-center justify-center">
                  more info{" "}
                  <span>
                    <FaArrowCircleRight />
                  </span>
                </div>
              </Link>
            </div>

            {/* new ticket */}
            <div className="bg-green-700 text-white flex flex-col gap-3 w-[90%] md:w-[25%]">
              <div className="m-5 flex flex-col gap-2">
                <h1 className="text-2xl font-bold">21</h1>
                <h3>My opened Tickets</h3>
              </div>
              <Link to="/user/tickets">
                <div className="bg-green-500  bottom-0 p-2 flex gap-2 items-center justify-center">
                  more info{" "}
                  <span>
                    <FaArrowCircleRight />
                  </span>
                </div>
              </Link>
            </div>

            <div className="bg-yellow-600 text-black flex flex-col gap-3 w-[90%] md:w-[25%]">
              <div className="m-5 flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                  {21}
                </h1>
                <h3>In progress Tickets</h3>
              </div>
              <Link to="/user/tickets">
                <div className="bg-yellow-400  bottom-0 p-2 flex gap-2 items-center justify-center">
                  more info{" "}
                  <span>
                    <FaArrowCircleRight />
                  </span>
                </div>
              </Link>
            </div>

            <div className="bg-red-800 text-white flex flex-col gap-3 w-[90%] md:w-[25%]">
              <div className="m-5 flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{21}</h1>
                <h3>Closed Tickets</h3>
              </div>
              <Link to="/user/tickets">
                <div className="bg-red-600  bottom-0 p-2 flex gap-2 items-center justify-center">
                  more info{" "}
                  <span>
                    <FaArrowCircleRight />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </DashboardLayout>
  );
};

export default UserDashboard;
