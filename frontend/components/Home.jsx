import { useEffect, useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    API.get("home/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setData(res.data))
      .catch(() => navigate("/"));
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-2 sm:py-3 px-4 sm:px-10 fixed top-0 left-0 w-full shadow-md h-15 sm:h-20">
        <h2 className="text-sm sm:text-xl font-bold sm:block hidden">Authentication</h2>
        <h2 className="text-violet-800 text-xl sm:mtext-3xl font-bold">Charles.Dev</h2>
        <button
          onClick={logout}
          className="text-md sm:text-xl font-semibold bg-violet-800 text-white py-1 px-2 sm:px-3 rounded-md"
        >
          Logout
        </button>
      </nav>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl sm:text-4xl text-gray-700 font-semibold">Full Stack Web Developement </h2>
        <h1 className="text-5xl sm:text-7xl font-bold text-violet-800">Welcome, {data.user}!</h1>
        <h3 className="text-sm sm:text-xl mt-2 font-semibold text-gray-800">Follow my Github for more Projects!</h3>
        <div className="flex justify-center items-center gap-3 mt-3 sm:mt-8">
          <button className="bg-violet-800 text-white font-medium text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 rounded-md">Get Started</button>
          <button className="bg-black text-white font-medium text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 rounded-md">Github</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
