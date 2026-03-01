import { useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("register/", {
        username,
        email,
        password,
      });

      // 🔥 Store tokens immediately
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Direct to home
      navigate("/home");
    } catch (err) {
      console.log(err.response.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-0 flex justify-center items-center flex-col">
      <div className="w-fit sm:w-90 shadow-2xl flex justify-center items-center flex-col p-7 rounded-xl  gap-4">
        <h2 className="text-black text-3xl sm:text-4xl font-extrabold mb-5">
          Register<span className="text-violet-800">.</span>
        </h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
        />

        <input
          type="password"
          placeholder="Password"
          className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-violet-800 text-white font-bold text-xl sm:text-2xl w-50 sm:w-70 rounded-lg sm:p-3 p-2 hover:bg-gray-300/15 hover:text-violet-800 transition duration-300 cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
