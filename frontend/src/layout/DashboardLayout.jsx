import DashboardHeader from "../components/dashbordComponents/DashboardHeader";
import SideBar from "../components/dashbordComponents/SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
