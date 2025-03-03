import { Link } from "react-router-dom";
import { useState } from "react";
import UseAuth from "../hooks/useAuth";
import axios from "axios";
const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
import LoginImage from "../assets/login.svg";

const Login = () => {
  const { setUser } = UseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        email,
        password,
      });

      if (response.status >= 200 && response.status < 300) {
        const { user } = response.data; 

        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setSuccess(true);
      } else {
        setError(response.data.error || "An error occurred during login.");
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-[60%] bg-sky-100 px-10">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-2 my-2 bg-sky-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">Login successful!</p>
          )}
          <Link to="/signup" className="text-sky-600 text-sm">
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
      <img
        src={LoginImage}
        alt="log in image"
        className="w-[40%] hidden md:block"
      />
    </div>
  );
};

export default Login;
