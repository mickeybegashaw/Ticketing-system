import { Link } from "react-router-dom";
import { useState } from "react";
import SignupImage from "../assets/login.svg";
import UseAuth from "../hooks/useAuth";
import axios from "axios";
const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Signup = () => {
  const { setUser } = UseAuth();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false); // Reset loading
      return;
    }

    try {
      setError(null);
      setLoading(true);
      setSuccess(false);

      const response = await axios.post(`${baseUrl}/api/auth/signup`, {
        name,
        email,
        password,
        role: role || "user",
      });

      if (response.status >= 200 && response.status < 300) {
        const { token, user } = response.data; // Extract token & user

        // Store token separately
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setSuccess(true);
      } else {
        setError(response.data.error || "An error occurred during signup.");
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
      <img src={SignupImage} alt="Sign up" className="w-[40%] hidden md:block" />
      <div className="flex flex-col justify-center items-center w-full md:w-[60%] bg-sky-100 px-10">
        <h1 className="text-2xl font-bold">Create Account</h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Role Selection Dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 my-2 border border-gray-300 text-gray-600 outline-none rounded-md"
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {success && <p className="text-green-500">Sign up successful!</p>}
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full p-2 my-2 bg-sky-600 text-white rounded-md disabled:bg-sky-300"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          <Link to="/login" className="text-sky-600 text-sm">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
