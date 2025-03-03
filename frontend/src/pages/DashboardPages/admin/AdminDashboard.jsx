import DashboardLayout from "../../../layout/DashboardLayout";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-center items-center  h-screen">hello dashboard</div>
      <Outlet/>
    </DashboardLayout>
  );
};

export default AdminDashboard;
