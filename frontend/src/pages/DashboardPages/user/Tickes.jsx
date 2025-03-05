import UseTicket from "../../../hooks/useTicket";
import UseAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Skeleton from "../../../components/ui/Skeleton";
import toast from "react-hot-toast";
import { MdDelete  } from "react-icons/md";

const UserTickets = () => {
  const { fetchUserTickets , deleteTicket} = UseTicket();
  const { user } = UseAuth();
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user?.id) {
      try {
        fetchUserTickets(user.id).then((tickets) => setUserTickets(tickets));
        setLoading(false)
      } catch (error) {
        toast.error("Failed to fetch tickets");
      }
    }
  }, [user, fetchUserTickets]);
  return (
    <div className="flex flex-col mt-24 p-5 w-full h-screen m-2">
      <h1 className="text-2xl font-semibold">My tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {loading ? (
          <Skeleton />
        ) : userTickets.length > 0 ? (
          userTickets.map((ticket) => (
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
                <p className="text-sm text-gray-700 line-clamp-1">
                  {ticket.description}
                </p>
              </div>
              <div className="mt-5 flex justify-between">
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
                <MdDelete onClick={()=>deleteTicket(ticket._id)}  size={20}  color="#82181a"/>

              </div>
            </div>
          ))
        ) : (
          // If no tickets exist after loading, show this message
          !loading && (
            <p className="text-gray-500 mt-5">No tickets available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default UserTickets;
