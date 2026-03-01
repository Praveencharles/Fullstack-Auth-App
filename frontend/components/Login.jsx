import { useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("login/", { username, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/home");
    } catch (err) {
      alert("User not found. Redirecting to Register page...");
      navigate("/register");
    }
  };

  return (
    <div className="min-h-0 flex justify-center items-center flex-col">
      <div className="w-fit sm:w-90 shadow-2xl flex justify-center items-center flex-col p-7 rounded-xl  gap-4">
        <h2 className="text-black text-3xl sm:text-4xl font-extrabold mb-5">
          Login<span className="text-violet-800">.</span>
        </h2>
        <input
          placeholder="Username"
          className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => navigate("/register")} className="mt-3 text-xs">
          Don't have an account?<span className="text-blue-500"> Register</span>
        </button>
        <button
          onClick={handleLogin}
          className="bg-violet-800 text-white font-bold text-xl sm:text-2xl w-50 sm:w-70 rounded-lg p-2 sm:p-3 hover:bg-gray-300/15 hover:text-violet-800 transition duration-300 cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
