import React from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { Outlet, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();

  const nestedRoutes = [
    "/user/tickets"
  ];
  const isNestedRoute = nestedRoutes.includes(location.pathname);
  return (
    <DashboardLayout>
      {!isNestedRoute&& <div className="flex flex-col items-center mt-24">hello user dahs</div>}
      
      <Outlet/>
    </DashboardLayout>
  )
}

export default UserDashboard
