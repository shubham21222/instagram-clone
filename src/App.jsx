import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/login";
import Home from "./components/home";
import Registration from "./components/auth/register";
import Profile from "./components/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />{" "}
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
