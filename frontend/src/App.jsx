import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UseAuth from "./hooks/useAuth";

const App = () => {
  const { user } = UseAuth();
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route 
          path="/login" 
          element={user ? (user.role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/user" />) : <Login />} 
        />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/user" element={user && user.role === "user" ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
