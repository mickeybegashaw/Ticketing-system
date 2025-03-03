import DashboardHeader from "../components/dashbordComponents/DashboardHeader"

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader/>
      {children}
    </>
  );
};

export default DashboardLayout;
