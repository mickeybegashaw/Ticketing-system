import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import axios from "axios";
import UseAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  tickets: [],
  error: null,
};

const filterTickets = (tickets) => ({
  openTickets: tickets.filter((ticket) => ticket.status === "Open"),
  closedTickets: tickets.filter((ticket) => ticket.status === "closed"),
  inProgressTickets: tickets.filter((ticket) => ticket.status === "InProgress"),
});

const ticketReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return { ...state, tickets: action.payload, error: null };
    case "ADD_TICKET":
      return { ...state, tickets: [...state.tickets, action.payload] };
    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        ),
      };
    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const { token } = UseAuth();
  const [authToken, setAuthToken] = useState(
    token || localStorage.getItem("token")
  );
  const { openTickets, closedTickets, inProgressTickets } = useMemo(
    () => filterTickets(state.tickets),
    [state.tickets]
  );

  // Fetch tickets on mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/tickets`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        dispatch({ type: "SET_TICKETS", payload: response.data });
      } catch (error) {
        console.error("Error fetching tickets:", error);
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch tickets. Please try again later.",
        });
      }
    };

    fetchTickets();
  }, [authToken]);

  // Fetch Tickets for a Single User
  const fetchUserTickets = useCallback(
    async (userId) => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/tickets/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        return response.data; // Return the fetched user-specific tickets
      } catch (error) {
        console.error("Error fetching user tickets:", error);
        toast.error("Failed to fetch user tickets. Please try again later.");
        return [];
      }
    },
    [authToken]
  );

  // Add Ticket
  const addTicket = useCallback(
    async (newTicket) => {
      try {
        const response = await axios.post(`${baseUrl}/api/tickets`, newTicket, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        dispatch({ type: "ADD_TICKET", payload: response.data });
        toast.success("Ticket added successfully");
      } catch (error) {
        console.error("Error adding ticket:", error);
        toast.error("Failed to add ticket. Please try again later.");
      }
    },
    [authToken]
  );

  // Update Ticket
  const updateTicket = useCallback(
    async (updatedTicket, id) => {
      try {
        const response = await axios.put(
          `${baseUrl}/api/tickets/${id}`,
          updatedTicket,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: "UPDATE_TICKET", payload: response.data });
        toast.success("Ticket updated successfully");
      } catch (error) {
        console.error("Error updating ticket:", error);
        toast.error("Failed to update ticket. Please try again later.");
      }
    },
    [authToken]
  );

  // Delete Ticket
  const deleteTicket = useCallback(
    async (ticketId) => {
      try {
        await axios.delete(`${baseUrl}/api/tickets/${ticketId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        dispatch({ type: "DELETE_TICKET", payload: ticketId });
        toast.success("Ticket deleted successfully");
      } catch (error) {
        console.error("Error deleting ticket:", error);
        toast.error("Failed to delete ticket. Please try again later.");
      }
    },
    [authToken]
  );

  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        openTickets,
        closedTickets,
        inProgressTickets,
        error: state.error, // Expose error in context
        addTicket,
        updateTicket,
        deleteTicket,
        fetchUserTickets
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
