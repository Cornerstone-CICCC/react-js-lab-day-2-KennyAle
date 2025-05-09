import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import { UserContextProvider } from "./contexts/todos/UserProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserContextProvider>
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
