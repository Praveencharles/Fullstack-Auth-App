import { useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true); // start loading

      const res = await API.post("login/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/home");
    } catch (err) {
      alert("User not found. Redirecting to Register page...");
      navigate("/register");
    } finally {
      setLoading(false); // stop loading (always runs)
    }
  };

  return (
    <div className="min-h-0 flex justify-center items-center flex-col">
      <div className="w-[90vw] sm:w-fit shadow-2xl p-7 rounded-xl ">
        {loading ? (
          <div className="sm:w-90 w-[90vw] text-5xl flex justify-center items-center h-60 flex-col gap-5">
            <div className="animate-spin h-15 w-15 border-5 border-violet-800 rounded-full"></div>
            <p className="text-lg text-violet-800 font-semibold">Loading...</p>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-4">
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
            <button
              onClick={() => navigate("/register")}
              className="mt-3 text-xs group"
            >
              Don't have an account?
              <span className="text-blue-500 group-hover:underline">
                {" "}
                Register
              </span>
            </button>
            <button
              onClick={handleLogin}
              className="bg-violet-800 text-white font-bold text-xl sm:text-2xl w-50 sm:w-70 rounded-lg p-2 sm:p-3 hover:bg-gray-300/15 hover:text-violet-800 transition duration-300 cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
