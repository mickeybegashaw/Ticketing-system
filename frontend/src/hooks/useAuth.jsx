import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const UseUserContext=()=>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }
  return context;
}
export default UseUserContext;