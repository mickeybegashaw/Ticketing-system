import DashboardHeader from "../components/dashbordComponents/DashboardHeader"
import SideBar from "../components/dashbordComponents/SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader/>
      <SideBar/>
      {children}
    </>
  );
};

export default DashboardLayout;
