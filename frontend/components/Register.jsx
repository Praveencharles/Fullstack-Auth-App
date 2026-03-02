import { useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrors({});

    try {
      await API.post("register/", formData);
      navigate("/");
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <div className="min-h-0 flex justify-center items-center flex-col ">
      <div className="flex justify-center items-center flex-col gap-4 w-[90vw] sm:w-fit shadow-2xl p-7 rounded-xl ">
        <h2 className="text-black text-3xl sm:text-4xl font-extrabold mb-5">
          Register<span className="text-violet-800">.</span>
        </h2>

        <div>
          <input
            placeholder="Username"
            className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            placeholder="Email"
            className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="px-2 sm:py-4 py-3 rounded-lg sm:w-70 bg-gray-400/20 text-gray-600 font-semibold"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          onClick={handleRegister}
          className="bg-violet-800 text-white font-bold text-xl sm:text-2xl w-50 sm:w-70 rounded-lg p-2 sm:p-3 hover:bg-gray-300/15 hover:text-violet-800 transition duration-300 cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
