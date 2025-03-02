import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const UseAuth=()=>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
}
export default UseAuth;