import UseTicket from "../../../hooks/useTicket";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import Skeleton from "../../../components/ui/Skeleton";

const Closedtickets = () => {
  const { closedTickets } = UseTicket();

  return (
    <div className="flex flex-col mt-24 p-5 w-full m-2">
      <h1 className="text-xl md:text-2xl font-semibold">Closed Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
     
    { closedTickets.length > 0 ? (
          closedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white mt-5 p-5 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-xl font-semibold">
                  {ticket.title}
                </h1>
                <span className="text-xs text-gray-400">
                  {ticket.updatedAt
                    ? formatDistanceToNow(new Date(ticket.updatedAt), {
                        addSuffix: true,
                      })
                    : "Unknown"}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">{ticket.description}</p>
              </div>
              <div className="mt-3">
                <span className="text-sm text-gray-400">
                  Status: {ticket.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          (
            <p className="text-gray-500 mt-5">No Closed tickets available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Closedtickets;
