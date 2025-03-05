import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import UseAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  tickets: [],
  error: null,
};

// Filter tickets by status
const filterTickets = (tickets) => ({
  openTickets: tickets.filter((ticket) => ticket.status === "Open"),
  closedTickets: tickets.filter((ticket) => ticket.status === "closed"),
  inProgressTickets: tickets.filter((ticket) => ticket.status === "InProgress"),
});

// Ticket Reducer
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
        tickets: state.tickets.filter((ticket) => ticket._id !== action.payload),
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

  const { openTickets, closedTickets, inProgressTickets } = useMemo(
    () => filterTickets(state.tickets),
    [state.tickets]
  );

  // Fetch all tickets
  const fetchTickets = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${baseUrl}/api/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "SET_TICKETS", payload: response.data });
    } catch (error) {
      console.error("Error fetching tickets:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch tickets. Please try again later.",
      });
    }
  }, [token]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Fetch user-specific only tickets
  const fetchUserTickets = useCallback(
    async (userId) => {
      if (!token) return [];
      try {
        const response = await axios.get(`${baseUrl}/api/tickets/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching user tickets:", error);
        toast.error("Failed to fetch user tickets. Please try again later.");
        return [];
      }
    },
    [token]
  );

  // Add a new ticket
  const addTicket = useCallback(
    async (newTicket) => {
      if (!token) return;
      try {
        const response = await axios.post(`${baseUrl}/api/tickets`, newTicket, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [token]
  );

  // Update a ticket
  const updateTicket = useCallback(
    async (updatedTicket, id) => {
      if (!token) return;
      try {
        const response = await axios.put(
          `${baseUrl}/api/tickets/${id}`,
          updatedTicket,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
    [token]
  );

  // Delete a ticket
  const deleteTicket = useCallback(
    async (ticketId) => {
      if (!token) return;
      try {
        await axios.delete(`${baseUrl}/api/tickets/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "DELETE_TICKET", payload: ticketId });
        toast.success("Ticket deleted successfully");
      } catch (error) {
        console.error("Error deleting ticket:", error);
        toast.error("Failed to delete ticket. Please try again later.");
      }
    },
    [token]
  );

  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        openTickets,
        closedTickets,
        inProgressTickets,
        error: state.error,
        addTicket,
        updateTicket,
        deleteTicket,
        fetchUserTickets,
        fetchTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
