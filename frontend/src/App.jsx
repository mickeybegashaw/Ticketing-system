import Home from "./pages/RootPage/home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/RootPage/login";
import SignUp from "./pages/RootPage/signup";
import UserDashboard from "./pages/DashboardPages/user/UserDashboard";
import AdminDashboard from "./pages/DashboardPages/admin/AdminDashboard";
import UseAuth from "./hooks/useAuth";
import Tickets from "./pages/DashboardPages/admin/Tickes";
import Closedtickets from "./pages/DashboardPages/admin/Closedtickets";
import Inprogress from "./pages/DashboardPages/admin/Inprogress";

const App = () => {
  const { user } = UseAuth();
  console.log(user);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/user"
          element={
            user && user.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        {/* Admin route with nested routes */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {/* Nested routes for admin */}
          <Route path="tickets" element={<Tickets />} />
          <Route path="closed-tickets" element={<Closedtickets />} />
          <Route path="in-progress-tickets" element={<Inprogress />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
