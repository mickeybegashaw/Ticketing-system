import UseTicket from "../../../hooks/useTicket";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import Skeleton from "../../../components/ui/Skeleton";

const OpenedTickets = () => {
  const { openTickets,updateTicket } = UseTicket();

 

  const handleUpdateInprogress = (id) => {
    const updatedTicket = {  status: "InProgress" };
    updateTicket(updatedTicket, id);
  };
 
  const handelUpdateClosed = (id) => {
    const updatedTicket = {  status: "closed" };
    updateTicket(updatedTicket, id);
  };
 

  return (
    <div className="flex flex-col mt-24 p-5 w-full m-2">
      <h1 className="text-xl md:text-2xl font-semibold">New Opened Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        { openTickets.length > 0 ? (
          openTickets.map((ticket) => (
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
                <p className="text-sm text-gray-700">{ticket.description}</p>
              </div>
              <div className="mt-7 flex gap-3 text-sm text-white ">
             <button className="bg-green-600/65 hover:bg-green-600 py-1 px-2 rounded-2xl" onClick={()=>handelUpdateClosed(ticket._id)}>Mark as Closed</button>
             <button className="bg-yellow-600/65 hover:bg-yellow-600 py-1 px-2 rounded-2xl" onClick={()=>handleUpdateInprogress(ticket._id)}>Mark as In progress</button>
              </div>
            </div>
          ))
        ) : (
           (
            <p className="text-gray-500 mt-5">No New tickets available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default OpenedTickets;
