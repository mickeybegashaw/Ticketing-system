import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  );
};

export default App;
