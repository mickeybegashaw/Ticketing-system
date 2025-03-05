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
        </div>
      )}

      <Outlet />
    </DashboardLayout>
  );
};

export default UserDashboard;
