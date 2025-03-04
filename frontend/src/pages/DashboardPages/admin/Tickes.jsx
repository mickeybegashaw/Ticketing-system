import UseTicket from "../../../hooks/useTicket";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import Skeleton from "../../../components/ui/Skeleton";

const Tickets = () => {
  const { tickets } = UseTicket();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tickets.length > 0) {
      setLoading(false); // Stop loading when tickets are fetched
    }
  }, [tickets]);

  console.log("Fetched tickets:", tickets);

  return (
    <div className="flex flex-col mt-24 p-5 w-full m-2">
      <h1 className="text-xl md:text-2xl font-semibold">All Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {loading ? (
          <Skeleton />
        ) : tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white mt-5 p-5 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-xl font-semibold">
                  {ticket.title}
                </h1>
                <span className="text-xs text-gray-400">
                  {ticket.createdAt
                    ? formatDistanceToNow(new Date(ticket.createdAt), {
                        addSuffix: true,
                      })
                    : "Unknown"}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700 line-clamp-1">{ticket.description}</p>
              </div>
              <div className="mt-5">
                <span
                  className={`text-sm text-white p-1 rounded ${
                    ticket.status === "Open"
                      ? "bg-red-900 animate-pulse"
                      : ticket.status === "InProgress"
                      ? "bg-yellow-600"
                      : "bg-green-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          // If no tickets exist after loading, show this message
          !loading && (
            <p className="text-gray-500 text-center">No tickets available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Tickets;
