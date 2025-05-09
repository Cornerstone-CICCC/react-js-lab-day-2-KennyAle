import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../types/todos.types";
import { useUser } from "../contexts/todos/useUser";
import { BeatLoader } from "react-spinners";
import autoAnimate from "@formkit/auto-animate";

function Todos() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const { user, setUser } = useUser();
  const parent = useRef<HTMLUListElement>(null);
  let navigate = useNavigate();
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask) {
      setTasks((prevState) => [
        ...prevState,
        { id: uuidv4(), name: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const handleLogout = () => {
    setUser([{ name: "", isLoggedIn: false }]);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleDelete = (id: string) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="bg-gray-900 h-screen w-screen flex justify-center items-center text-white">
      {user.length > 0 ? (
        <div className="flex flex-col justify-center bg-gray-600 rounded-lg p-4 gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg">Welcome, {user[0].name}</h1>
            <button
              className="bg-black p-2 rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
          <p>Have a great and productive day!</p>
          <ul ref={parent}>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="list-none mb-2 flex justify-between items-center bg-gray-700 p-2 rounded-lg"
              >
                {task.name}
                <button
                  className="bg-red-600 p-2 rounded-lg cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <form className="flex gap-2 pb-4" onSubmit={handleSubmit}>
            <input
              className="bg-gray-800 text-white p-2 rounded-lg"
              onChange={handleChange}
              value={newTask}
              type="text"
              placeholder="Enter a new task"
            />
            <button className="bg-black p-2 rounded-lg cursor-pointer">
              Add Task
            </button>
          </form>
        </div>
      ) : (
        (handleRedirect(),
        (
          <div className="flex flex-col justify-center items-center bg-gray-800 p-4 rounded-lg gap-3">
            <h1 className="text-lg">Please log in to see your tasks</h1>
            <h1 className="flex items-end text-lg gap-1">
              Redirecting to Login Page{" "}
              <BeatLoader className="pb-0.5" color="#ffffff" size={5} />
            </h1>
          </div>
        ))
      )}
    </div>
  );
}

export default Todos;
