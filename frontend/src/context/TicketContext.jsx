import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  tickets: [],
};

// Reducer Function
const ticketReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return { ...state, tickets: action.payload };

    case "ADD_TICKET":
      return { ...state, tickets: [...state.tickets, action.payload] };

    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };

    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
      };

    default:
      return state;
  }
};

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${baseUrl}/api/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        dispatch({ type: "SET_TICKETS", payload: data });
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const addTicket = (newTicket) => {
    dispatch({ type: "ADD_TICKET", payload: newTicket });
  };

  const updateTicket = (updatedTicket) => {
    dispatch({ type: "UPDATE_TICKET", payload: updatedTicket });
  };

  const deleteTicket = (ticketId) => {
    dispatch({ type: "DELETE_TICKET", payload: ticketId });
  };

  return (
    <TicketContext.Provider
      value={{ tickets: state.tickets, addTicket, updateTicket, deleteTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};
