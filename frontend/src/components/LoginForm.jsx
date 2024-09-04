import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth", {
        username,
        password,
      });
      if (response.status === 200) {
        alert("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed");
      alert("Login failed" + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-900">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <label
            htmlFor="username"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 h-12"
          >
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="peer border-none w-full bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12"
              required
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Username
            </span>
          </label>

          <label
            htmlFor="password"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 mt-4 h-12"
          >
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="peer border-none w-full bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12"
              required
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Password
            </span>
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="group relative inline-block w-full overflow-hidden border border-indigo-600 px-8 py-3 mt-6 focus:outline-none focus:ring"
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
            <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
              Login
            </span>
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
