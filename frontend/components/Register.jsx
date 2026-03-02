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
    <div className="min-h-screen flex flex-col items-center gap-4 p-7">
      <h2>Register</h2>

      <div>
        <input
          placeholder="Username"
          className="border p-2 w-60"
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
          className="border p-2 w-60"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-60"
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
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}

export default Register;
