import { Link } from "react-router-dom";
import LoginImage from "../assets/login.svg";
const Login = () => {
  return (
    <div className="w-full flex h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-[60%] bg-sky-100 px-10">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <form className="mt-6">
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
          <button className="w-full p-2 my-2 bg-sky-600 text-white rounded-md">
            Login
          </button>
          <Link to="/signup" className="text-sky-600 text-sm ">
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
