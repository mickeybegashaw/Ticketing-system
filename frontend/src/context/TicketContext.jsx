import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  tickets: [],
  openTickets: [],
  closedTickets: [],
  inProgressTickets: [],
};

// Reducer Function
const ticketReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS": {
      const allTickets = action.payload;
      return {
        ...state,
        tickets: allTickets,
        openTickets: allTickets.filter(ticket => ticket.status === "Open"),
        closedTickets: allTickets.filter(ticket => ticket.status === "closed"),
        inProgressTickets: allTickets.filter(ticket => ticket.status === "InProgress"),
      };
    }

    case "ADD_TICKET": {
      const newTickets = [...state.tickets, action.payload];
      return {
        ...state,
        tickets: newTickets,
        openTickets: newTickets.filter(ticket => ticket.status === "Open"),
        closedTickets: newTickets.filter(ticket => ticket.status === "closed"),
        inProgressTickets: newTickets.filter(ticket => ticket.status === "InProgress"),
      };
    }

    case "UPDATE_TICKET": {
      const updatedTickets = state.tickets.map(ticket =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
      return {
        ...state,
        tickets: updatedTickets,
        openTickets: updatedTickets.filter(ticket => ticket.status === "Open"),
        closedTickets: updatedTickets.filter(ticket => ticket.status === "closed"),
        inProgressTickets: updatedTickets.filter(ticket => ticket.status === "InProgress"),
      };
    }

    case "DELETE_TICKET": {
      const filteredTickets = state.tickets.filter(ticket => ticket.id !== action.payload);
      return {
        ...state,
        tickets: filteredTickets,
        openTickets: filteredTickets.filter(ticket => ticket.status === "Open"),
        closedTickets: filteredTickets.filter(ticket => ticket.status === "closed"),
        inProgressTickets: filteredTickets.filter(ticket => ticket.status === "InProgress"),
      };
    }

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
      value={{
        tickets: state.tickets,
        openTickets: state.openTickets,
        closedTickets: state.closedTickets,
        inProgressTickets: state.inProgressTickets,
        addTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
