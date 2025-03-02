import { Link } from "react-router-dom";
import { useState } from "react";
import SignupImage from "../assets/login.svg";

const Signup = () => {
  const [role, setRole] = useState("");

  return (
    <div className="w-full flex h-screen">
      <img
        src={SignupImage}
        alt="log in image"
        className="w-[40%] hidden md:block"
      />
      <div className="flex flex-col justify-center items-center w-full md:w-[60%] bg-sky-100 px-10">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <form className="mt-6">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 my-2 border border-gray-300 rounded-md"
          />

          {/* Role Selection Dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 my-2 border border-gray-300 text-gray-600 outline-none rounded-md"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full p-2 my-2 bg-sky-600 text-white rounded-md">
            Sign up
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
