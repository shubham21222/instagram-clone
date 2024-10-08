import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/login";
import Home from "./components/home";
import Registration from "./components/auth/register";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />{" "}
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
