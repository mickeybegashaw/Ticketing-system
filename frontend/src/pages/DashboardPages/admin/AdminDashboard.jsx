import DashboardLayout from "../../../layout/DashboardLayout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import UseTicket from "../../../hooks/useTicket";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const location = useLocation();
  const { tickets, openTickets, closedTickets, inProgressTickets } =
    UseTicket();
  const nestedRoutes = [
    "/admin/tickets",
    "/admin/closed-tickets",
    "/admin/in-progress-tickets",
    "/admin/opened-tickets",
  ];
  const isNestedRoute = nestedRoutes.includes(location.pathname);
  const chartData = [
    { name: "Total", value: tickets.length, color: "#2563eb" }, // Blue
    { name: "Open", value: openTickets.length, color: "#22c55e" }, // Green
    { name: "In Progress", value: inProgressTickets.length, color: "#facc15" }, // Yellow
    { name: "Closed", value: closedTickets.length, color: "#dc2626" }, // Red
  ];

  return (
    <DashboardLayout>
      {!isNestedRoute && (
        <div className="flex flex-col mt-24 p-5 w-full m-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          {/* analysis */}
          <div className="flex flex-col md:flex-row gap-5 mt-5 w-full">
            {/* all ticket */}
            <div className="bg-blue-600 text-white flex flex-col gap-3 w-[90%] md:w-[25%]">
              <div className="m-5 flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{tickets.length}</h1>
                <h3>Total Tickets</h3>
              </div>
              <Link to="/admin/tickets">
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
                <h1 className="text-2xl font-bold">{openTickets.length}</h1>
                <h3>New Tickets</h3>
              </div>
              <Link to="/admin/opened-tickets">
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
                  {inProgressTickets.length}
                </h1>
                <h3>In progress Tickets</h3>
              </div>
              <Link to="/admin/in-progress-tickets">
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
                <h1 className="text-2xl font-bold">{closedTickets.length}</h1>
                <h3>Closed Tickets</h3>
              </div>
              <Link to="/admin/closed-tickets">
                <div className="bg-red-600  bottom-0 p-2 flex gap-2 items-center justify-center">
                  more info{" "}
                  <span>
                    <FaArrowCircleRight />
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {/* Bar Chart */}
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
              <h2 className="text-lg font-semibold mb-3">Ticket Statistics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
              <h2 className="text-lg font-semibold mb-3">
                Ticket Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;
