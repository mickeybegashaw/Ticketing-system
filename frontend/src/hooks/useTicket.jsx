import { TicketContext } from "../context/TicketContext";
import { useContext } from "react";

const UseAuth=()=>{
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("UseTicket must be used within a TicketContextProvider");
  }
  return context;
}
export default UseAuth;