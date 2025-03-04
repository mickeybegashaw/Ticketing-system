import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import DashboardLayout from "../../../layout/DashboardLayout";
import useTicket from "../../../hooks/useTicket";
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
import Skeleton from "../../../components/ui/Skeleton";

// Reusable TicketCard Component
const TicketCard = ({ title, count, color, link }) => (
  <div
    className={`${color} text-white flex flex-col gap-3 w-[90%] md:w-[25%] rounded-lg shadow-md`}
  >
    <div className="m-5 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{count}</h1>
      <h3>{title}</h3>
    </div>
    <Link to={link}>
      <div
        className={`${color.replace(
          "bg-",
          "bg-opacity-80 bg-"
        )} p-2 flex gap-2 items-center justify-center`}
      >
        more info <FaArrowCircleRight />
      </div>
    </Link>
  </div>
);

const AdminDashboard = () => {
  const location = useLocation();
  const { tickets, openTickets, closedTickets, inProgressTickets } =
    useTicket();
  const [loading, setLoading] = useState(tickets.length === 0);

  useEffect(() => {
    setLoading(tickets.length === 0);
  }, [tickets]);

  const isNestedRoute = location.pathname.startsWith("/admin/");

  const chartData = [
    { name: "Total", value: tickets.length, color: "#2563eb" }, 
    { name: "Open", value: openTickets.length, color: "#22c55e" }, 
    { name: "In Progress", value: inProgressTickets.length, color: "#facc15" }, 
    { name: "Closed", value: closedTickets.length, color: "#dc2626" }, 
  ];

  const renderChartCells = chartData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={entry.color} />
  ));

  return (
    <DashboardLayout>
      {!isNestedRoute && (
        <div className="flex flex-col mt-24 p-5 w-full m-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          {/* Analysis Section */}
          {loading ? (
            <Skeleton />
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-5 mt-5 w-full">
                <TicketCard
                  title="Total Tickets"
                  count={tickets.length}
                  color="bg-blue-600"
                  link="/admin/tickets"
                />
                <TicketCard
                  title="New Tickets"
                  count={openTickets.length}
                  color="bg-green-700"
                  link="/admin/opened-tickets"
                />
                <TicketCard
                  title="In Progress Tickets"
                  count={inProgressTickets.length}
                  color="bg-yellow-600"
                  link="/admin/in-progress-tickets"
                />
                <TicketCard
                  title="Closed Tickets"
                  count={closedTickets.length}
                  color="bg-red-800"
                  link="/admin/closed-tickets"
                />
              </div>

              {/*Dashboard analysis Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                {/* Bar Chart */}
                <div className="bg-white p-5 rounded-lg shadow-md w-full">
                  <h2 className="text-lg font-semibold mb-3">
                    Ticket Statistics
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">{renderChartCells}</Bar>
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
                        {renderChartCells}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;
