import DashboardLayout from "../../../layout/DashboardLayout";
import { Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();

  const nestedRoutes = [
    "/admin/tickets",
    "/admin/closed-tickets",
    "/admin/in-progress-tickets",
  ];
  const isNestedRoute = nestedRoutes.includes(location.pathname);

  return (
    <DashboardLayout>
      {!isNestedRoute && (
        <div className="flex flex-col items-center mt-24">
          hello dashboard
        </div>
      )}
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;
