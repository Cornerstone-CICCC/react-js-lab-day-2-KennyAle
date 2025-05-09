import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/todos/useUser";
import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser([{ name: userName, isLoggedIn: true }]);
    if (userName === "") {
      toast.error("Please enter a valid name");
      return;
    }
    navigate("/todos");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (
    <div className="bg-gray-900 h-screen w-screen flex justify-center items-center text-white">
      <div className="flex flex-col justify-center bg-gray-600 rounded-lg p-4 gap-3">
        <h1 className="text-lg font-medium">Hi, What's your name?</h1>
        <form className="flex gap-2 pb-4" onSubmit={handleSubmit}>
          <input
            className="bg-gray-800 text-white p-2 rounded-lg"
            onChange={handleChange}
            type="text"
            placeholder="Enter your name"
          />
          <button className="bg-black p-2 rounded-lg cursor-pointer">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
