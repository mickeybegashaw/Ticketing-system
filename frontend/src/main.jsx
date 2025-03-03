import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import { TicketProvider } from "./context/TicketContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <TicketProvider>
      <App />
    </TicketProvider>
  </AuthContextProvider>
);
